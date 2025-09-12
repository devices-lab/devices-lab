// src/lib/utils/customText.ts

/** AST nodes */
export type Node = TextNode | TagNode;

export interface TextNode {
	type: 'text';
	value: string;
}

export interface TagNode {
	type: 'tag';
	name: string;
	attrs: Record<string, string>;
	children: Node[];
}

/** Renderers turn a TagNode into HTML (string). */
export type TagRenderer = (ctx: { node: TagNode; renderChildren: () => string; escapeHtml: (s: string) => string; escapeAttr: (s: string) => string }) => string;

export type TagMap = Record<string, TagRenderer>;

/** Basic HTML escaping for text nodes */
export function escapeHtml(s: string): string {
	return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Escape attribute values */
export function escapeAttr(s: string): string {
	return escapeHtml(s).replace(/"/g, '&quot;');
}

/** Optional URL safety (allows http, https, mailto, / relative) */
export function safeUrl(u: string): string {
	if (/^(https?:|mailto:|\/)/i.test(u)) return u;
	return '#';
}

/** -------- Parser --------
 * Grammar (simplified):
 *   Document  := Nodes
 *   Nodes     := (Text | Tag)*
 *   Tag       := '${' Head '}' ('[' Nodes ']')?
 *   Head      := Name (WS Attr)*        // Attr := key[=value]
 *   Name      := bareword
 *   value     := quoted | bareword
 * Special chars can be escaped with backslash: \${ \} \[ \]
 */
export function parse(input: string): Node[] {
	let i = 0;
	const n = input.length;

	const peek = (k = 0) => input[i + k];
	const eat = () => input[i++];

	function parseNodes(endChar?: string): Node[] {
		const nodes: Node[] = [];
		let buf = '';

		const flush = () => {
			if (buf) {
				nodes.push({ type: 'text', value: buf });
				buf = '';
			}
		};

		while (i < n) {
			// End of this nesting level
			if (endChar && peek() === endChar) {
				flush();
				i++; // consume endChar
				return nodes;
			}

			// Escapes
			if (peek() === '\\') {
				if (i + 1 < n) {
					const next = input[i + 1];
					// Allow escaping of special delimiters and backslash itself
					if (next === '$' || next === '{' || next === '}' || next === '[' || next === ']' || next === '\\') {
						i += 2;
						buf += next;
						continue;
					}
				}
				// Lone backslash → treat as literal
				buf += eat();
				continue;
			}

			// Tag start
			if (peek() === '$' && peek(1) === '{') {
				flush();
				nodes.push(parseTag());
				continue;
			}

			// Normal text
			buf += eat();
		}

		// If endChar was expected but not found, we still flush what we have
		flush();
		return nodes;
	}

	function parseTag(): TagNode {
		// consume '${'
		i += 2;

		// read head until '}'
		const headStart = i;
		while (i < n && peek() !== '}') i++;
		if (peek() !== '}') throw new Error('Unclosed tag head, missing "}"');
		const head = input.slice(headStart, i);
		i++; // consume '}'

		const { name, attrs } = parseHead(head);

		// Required children: uncomment the following lines to force '[]'
		// Next must be '[' to start children
		// if (peek() !== '[') throw new Error('Tag must be followed by "[" content "]"');
		// i++; // consume '['
		// const children = parseNodes(']');

		// Optional children: only if '[' follows
		let children: Node[] = [];
		if (peek() === '[') {
			i++; // consume '['
			children = parseNodes(']'); // <-- IMPORTANT: pass the end-char
		} else if (peek() === ']') {
			// (optional) be forgiving: swallow a stray ']' right after a tag
			i++; // so it won't leak into output
		}

		return { type: 'tag', name, attrs, children };
	}

	function parseHead(head: string): { name: string; attrs: Record<string, string> } {
		// Tokenize: barewords, key=value, quoted values
		const tokens: string[] = [];
		let j = 0;

		const skipWS = () => {
			while (j < head.length && /\s/.test(head[j]!)) j++;
		};

		const readQuoted = (quote: '"' | "'") => {
			j++; // consume opening quote
			let out = '';
			while (j < head.length) {
				const ch = head[j]!;
				if (ch === '\\' && j + 1 < head.length) {
					// allow \" and \'
					const next = head[j + 1]!;
					if (next === quote || next === '\\') {
						out += next;
						j += 2;
						continue;
					}
				}
				if (ch === quote) {
					j++; // consume closing quote
					break;
				}
				out += ch;
				j++;
			}
			return out;
		};

		const readBare = () => {
			const start = j;
			while (j < head.length && !/\s/.test(head[j]!) && head[j] !== '=') j++;
			return head.slice(start, j);
		};

		while (j < head.length) {
			skipWS();
			if (j >= head.length) break;

			let tok = '';
			const ch = head[j]!;
			if (ch === '"' || ch === "'") tok = readQuoted(ch as '"' | "'");
			else tok = readBare();

			if (tok) tokens.push(tok);
			skipWS();

			if (head[j] === '=') {
				// key = value
				const key = tokens.pop();
				j++; // consume '='
				skipWS();

				let val = '';
				if (head[j] === '"' || head[j] === "'") val = readQuoted(head[j]! as '"' | "'");
				else val = readBare();

				if (key == null) throw new Error('Attribute value without key');
				tokens.push(`${key}=${val}`);
			}
		}

		if (tokens.length === 0) throw new Error('Empty tag head');

		const [name, ...rest] = tokens;
		const attrs: Record<string, string> = {};
		for (const t of rest) {
			const eq = t.indexOf('=');
			if (eq === -1) {
				// boolean attribute → "true"
				attrs[t] = 'true';
			} else {
				const k = t.slice(0, eq);
				const v = t.slice(eq + 1);
				attrs[k] = v;
			}
		}

		return { name, attrs };
	}

	return parseNodes();
}

/** Render the AST to HTML using a tag map. Unknown tags: render children only. */
export function render(nodes: Node[], map: TagMap = {}): string {
	const _render = (ns: Node[]): string =>
		ns
			.map((node) => {
				if (node.type === 'text') return escapeHtml(node.value);
				const renderer = map[node.name];
				const renderChildren = () => _render(node.children);
				if (renderer) {
					return renderer({ node, renderChildren, escapeHtml, escapeAttr });
				}
				// Fallback: drop the wrapper, keep content
				return renderChildren();
			})
			.join('');
	return _render(nodes);
}

/** Convenience: parse + render */
export function toHtml(input: string, map: TagMap): string {
	return render(parse(input), map);
}
