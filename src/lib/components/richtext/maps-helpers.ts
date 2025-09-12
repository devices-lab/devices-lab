/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '$lib/utils/cn'; // clsx + tailwind-merge
import type { TagNode, TagMap } from '$lib/components/richtext/customText';
import type { Component } from 'svelte';

// Accept ANY props/events/slots
type AnyComponent = Component<any, any, any>;

// Extract props from any Svelte component type
export type ComponentProps<C extends AnyComponent> = C extends Component<infer P, any, any> ? P : never;

const DEV = !!import.meta.env?.DEV;

/** pick attributes by exact key or wildcard suffix like 'aria-*', 'data-*' */
function pickAttrs(attrs: Record<string, unknown>, allow: (string | `${string}-*`)[] = []) {
	const out: Record<string, unknown> = {};
	const allowExact = new Set(allow.filter((a) => !a.endsWith('*')));
	const allowPrefix = allow.filter((a) => a.endsWith('*')).map((a) => a.slice(0, -1));
	for (const k in attrs) {
		if (allowExact.has(k) || allowPrefix.some((p) => k.startsWith(p))) out[k] = attrs[k];
	}
	return out;
}

/** Spec for a Svelte-backed tag (generic over the component) */
export type SvelteTagSpec<C extends AnyComponent = AnyComponent> = {
	component: C;
	props?: (args: { node: TagNode }) => Partial<ComponentProps<C>>;
	ignoreChildren?: boolean;
};

type SvelteTagOpts<C extends AnyComponent> = {
	/** merge with node.attrs.class */
	baseClass?: Parameters<typeof cn>[0];
	/** pass-through attr names/prefixes (e.g., ['aria-*','data-*','rel','target']) */
	pass?: (string | `${string}-*`)[];
	/** derive extra component props from attributes (e.g., href coercion) */
	map?: (a: Record<string, unknown>, node: TagNode) => Partial<ComponentProps<C>>;
	requiredChildren?: boolean; // warn in dev if no children
	ignoreChildren?: boolean; // component will ignore children (like <hr/>)
};

/** SVELTE: define a tag that renders as a Svelte component */
export function svelteTag<C extends AnyComponent>(component: C, opts: SvelteTagOpts<C> = {}): SvelteTagSpec<C> {
	return {
		component,
		props: ({ node }: { node: TagNode }) => {
			if (DEV && opts.requiredChildren && node.children.length === 0) {
				console.warn(`[richtext] <${node.name}> expects children`);
			}
			const a = node.attrs ?? {};
			const derived = opts.map ? opts.map(a, node) : {};
			const passthrough = opts.pass ? pickAttrs(a, opts.pass) : {};
			const merged: Record<string, unknown> = { ...passthrough, ...derived };
			if (opts.baseClass || a.class) merged.class = cn(opts.baseClass, a.class);
			// Note: ignoreChildren is implemented by the renderer (skip slot)
			return merged as Partial<ComponentProps<C>>;
		},
		ignoreChildren: !!opts.ignoreChildren
	};
}

type HtmlTagOpts = {
	/** default classes */
	baseClass?: string;
	/** pass-through attr names/prefixes (e.g., ['aria-*','data-*','rel','target']) */
	pass?: (string | `${string}-*`)[];
	/** add/rename attributes: get a new attrs object to merge */
	map?: (a: Record<string, string>, node: TagNode) => Record<string, unknown>;
	requiredChildren?: boolean; // warn in dev if no children
	fallbackTextAttr?: string; // e.g., use href or text as inner content if no children
	void?: boolean; // void element: <br>, <hr>, <img>...
};

/** HTML: define a tag that renders as an HTML element string */
export function htmlTag(tagName: string, opts: HtmlTagOpts = {}): TagMap[string] {
	return ({ node, renderChildren, escapeAttr, escapeHtml }) => {
		const a = node.attrs ?? {};
		const pass = opts.pass ? pickAttrs(a, opts.pass) : {};
		const mapped = opts.map ? opts.map(a, node) : {};
		const cls = cn(opts.baseClass, a.class); // dedupe Tailwind utilities
		const attrs = { ...pass, ...mapped, ...(cls ? { class: cls } : {}) };

		const attrStr = Object.entries(attrs)
			.filter(([, v]) => v != null && v)
			.map(([k, v]) => ` ${k}="${escapeAttr(String(v))}"`)
			.join('');

		if (opts.void) {
			// ignore children for void tags
			if (DEV && node.children.length) {
				console.warn(`[richtext] <${tagName}> ignores children; got some for <${node.name}>`);
			}
			return `<${tagName}${attrStr} />`;
		}

		let body = renderChildren();
		if (!body && opts.fallbackTextAttr && mapped[opts.fallbackTextAttr] != null) {
			body = escapeHtml(String(mapped[opts.fallbackTextAttr]));
		}
		if (DEV && opts.requiredChildren && !body) {
			console.warn(`[richtext] <${tagName}> expects children; none provided for <${node.name}>`);
		}
		return `<${tagName}${attrStr}>${body}</${tagName}>`;
	};
}

/** HTML: void element (no children) */
export const htmlVoid = (t: string) => htmlTag(t, { void: true });
