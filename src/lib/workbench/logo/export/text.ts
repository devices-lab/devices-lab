import { ClippyOffset } from '$lib/workbench/logo/clippy';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ocrAUrl from '$lib/assets/OCRAEXT.TTF';
import * as opentype from 'opentype.js';


// Convert all <text> to filled <path> (with optional dilation)
// Width fitting via `textWidth` (also accepts `text-width` and SVG's `textLength`)
// No CSS/SVG transforms are used for the width fit; coordinates are rewritten in the path data.
export async function outlineAllText(clone: SVGSVGElement) {
	const font = await loadFont();
	if (!font) return;

	const texts = Array.from(clone.querySelectorAll('text')) as SVGTextElement[];
	for (const t of texts) {
		const content = t.textContent || '';
		if (!content.trim()) {
			t.remove();
			continue;
		}

		const size = parseFloat(t.getAttribute('font-size') || '16');
		const letterSpacing = parseFloat(t.getAttribute('letter-spacing') || '0');
		const anchor = (t.getAttribute('text-anchor') || 'start').toLowerCase();
		const dominant = t.getAttribute('dominant-baseline') || t.getAttribute('alignment-baseline') || 'alphabetic';
		const fill = t.getAttribute('fill') || '#000';
		const x = parseFloat(t.getAttribute('x') || '0');
		const y = parseFloat(t.getAttribute('y') || '0');

		// Accept custom and common variants
		const textWidthAttr =
			t.getAttribute('textWidth') ??
			t.getAttribute('text-width') ??
			t.getAttribute('textLength');
		const requestedWidth = textWidthAttr ? parseFloat(textWidthAttr) : NaN;

		const glyphs = font.stringToGlyphs(content);
		const scale = size / font.unitsPerEm;

		// Measure natural advance width (unfitted)
		let adv = 0;
		glyphs.forEach((g, i) => {
			adv += (g.advanceWidth || 0) * scale;
			if (i < glyphs.length - 1 && (font as opentype.Font).getKerningValue)
				adv += (font as opentype.Font).getKerningValue(g, glyphs[i + 1]) * scale;
			if (letterSpacing) adv += letterSpacing;
		});

		// Horizontal scale to meet requested width (if any)
		const hasTarget = Number.isFinite(requestedWidth) && requestedWidth! > 0 && adv > 0;
		const sx = hasTarget ? requestedWidth! / adv : 1;

		// Anchor uses the final visual width (adv * sx)
		const finalWidth = adv * sx;
		let drawX = x;
		if (anchor === 'middle') drawX -= finalWidth / 2;
		else if (anchor === 'end') drawX -= finalWidth;

		const baselineY = y + baselineOffset(font, size, dominant);

		// Helper: scale an x about the left edge after anchoring
		const scaleX = (px: number | undefined) =>
			px == null ? px : (drawX + sx * (px - drawX));

		// Build the path with x-coordinates already fitted to `textWidth`
		let cursor = drawX;
		const segs: string[] = [];
		glyphs.forEach((g, i) => {
			const gp = g.getPath(cursor, baselineY, size);
			(gp.commands || []).forEach((cmd: {
				type: string; x?: number; y?: number; x1?: number; y1?: number; x2?: number; y2?: number
			}) => {
				if (cmd.type === 'M') {
					segs.push(`M${scaleX(cmd.x)} ${cmd.y}`);
				} else if (cmd.type === 'L') {
					segs.push(`L${scaleX(cmd.x)} ${cmd.y}`);
				} else if (cmd.type === 'C') {
					segs.push(`C${scaleX(cmd.x1)} ${cmd.y1} ${scaleX(cmd.x2)} ${cmd.y2} ${scaleX(cmd.x)} ${cmd.y}`);
				} else if (cmd.type === 'Q') {
					segs.push(`Q${scaleX(cmd.x1)} ${cmd.y1} ${scaleX(cmd.x)} ${cmd.y}`);
				} else if (cmd.type === 'Z') {
					segs.push('Z');
				}
			});

			// Advance cursor in natural units; the coordinate scaling above handles the fit.
			let gAdv = (g.advanceWidth || 0) * scale;
			if (i < glyphs.length - 1 && (font as opentype.Font).getKerningValue)
				gAdv += (font as opentype.Font).getKerningValue(g, glyphs[i + 1]) * scale;
			if (letterSpacing) gAdv += letterSpacing;
			cursor += gAdv;
		});

		// Optional synthetic bold (true dilation) operates on the fitted geometry
		let d = segs.join('');
		const { enabled, strengthEm } = wantsSyntheticBold(t);
		if (enabled) {
			try {
				d = await ClippyOffset(d, strengthEm);
			} catch (err) {
				console.warn('Dilation failed, using original outline', err);
			}
		}

		const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		pathEl.setAttribute('d', d);
		pathEl.setAttribute('fill', fill);
		pathEl.setAttribute('data-clippy-role', t.getAttribute('data-clippy-role') || '');

		// Note: we do not add any transform/translate to implement width fitting.
		// If the original <text> had a transform, copy it only if you explicitly want to preserve it:
		// const existing = t.getAttribute('transform');
		// if (existing) pathEl.setAttribute('transform', existing);

		t.replaceWith(pathEl);
	}
}

// Convert all <text> to filled <path> (with optional dilation)
// Supports width fitting via `textWidth` (also accepts `text-width` or `textLength`)
export async function outlineAllText2(clone: SVGSVGElement) {
	const font = await loadFont();
	if (!font) return;

	const texts = Array.from(clone.querySelectorAll('text')) as SVGTextElement[];
	for (const t of texts) {
		const content = t.textContent || '';
		if (!content.trim()) {
			t.remove();
			continue;
		}

		const size = parseFloat(t.getAttribute('font-size') || '16');
		const letterSpacing = parseFloat(t.getAttribute('letter-spacing') || '0');
		const anchor = (t.getAttribute('text-anchor') || 'start').toLowerCase();
		const dominant = t.getAttribute('dominant-baseline') || t.getAttribute('alignment-baseline') || 'alphabetic';
		const fill = t.getAttribute('fill') || '#000';
		const x = parseFloat(t.getAttribute('x') || '0');
		const y = parseFloat(t.getAttribute('y') || '0');

		// Preferred custom attribute, then common variants
		const textWidthAttr =
			t.getAttribute('textWidth') ??
			t.getAttribute('text-width') ??
			t.getAttribute('textLength'); // SVG attribute
		const requestedWidth = textWidthAttr ? parseFloat(textWidthAttr) : NaN;

		const glyphs = font.stringToGlyphs(content);
		const scale = size / font.unitsPerEm;

		// Measure advance (unscaled horizontally)
		let adv = 0;
		glyphs.forEach((g, i) => {
			adv += (g.advanceWidth || 0) * scale;
			if (i < glyphs.length - 1 && (font as opentype.Font).getKerningValue)
				adv += (font as opentype.Font).getKerningValue(g, glyphs[i + 1]) * scale;
			if (letterSpacing) adv += letterSpacing;
		});

		// Compute horizontal scale to fit requested width (if provided and valid)
		// When not provided or invalid, fall back to 1 (no stretch).
		const hasTarget = Number.isFinite(requestedWidth) && requestedWidth! > 0 && adv > 0;
		const sx = hasTarget ? requestedWidth! / adv : 1;

		// Anchor uses the *final* visual width (adv * sx)
		let drawX = x;
		const finalWidth = adv * sx;
		if (anchor === 'middle') drawX -= finalWidth / 2;
		else if (anchor === 'end') drawX -= finalWidth;

		const baselineY = y + baselineOffset(font, size, dominant);

		// Generate glyph outlines at natural spacing; we apply sx via a transform around drawX
		let cursor = drawX;
		const pathData: string[] = [];
		glyphs.forEach((g, i) => {
			const gp = g.getPath(cursor, baselineY, size);
			(gp.commands || []).forEach((cmd: { type: string; x?: number; y?: number; x1?: number; y1?: number; x2?: number; y2?: number }) => {
				if (cmd.type === 'M') pathData.push(`M${cmd.x} ${cmd.y}`);
				else if (cmd.type === 'L') pathData.push(`L${cmd.x} ${cmd.y}`);
				else if (cmd.type === 'C') pathData.push(`C${cmd.x1} ${cmd.y1} ${cmd.x2} ${cmd.y2} ${cmd.x} ${cmd.y}`);
				else if (cmd.type === 'Q') pathData.push(`Q${cmd.x1} ${cmd.y1} ${cmd.x} ${cmd.y}`);
				else if (cmd.type === 'Z') pathData.push('Z');
			});
			let gAdv = (g.advanceWidth || 0) * scale;
			if (i < glyphs.length - 1 && (font as opentype.Font).getKerningValue)
				gAdv += (font as opentype.Font).getKerningValue(g, glyphs[i + 1]) * scale;
			if (letterSpacing) gAdv += letterSpacing;
			cursor += gAdv; // unscaled; we scale the entire geometry later
		});

		// Optional synthetic bold as true dilation
		const { enabled, strengthEm } = wantsSyntheticBold(t);
		let d = pathData.join('');
		if (enabled) {
			try {
				d = await ClippyOffset(d, strengthEm);
			} catch (err) {
				console.warn('Dilation failed, using original outline', err);
			}
		}

		const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		pathEl.setAttribute('d', d);
		pathEl.setAttribute('fill', fill);
		pathEl.setAttribute('data-clippy-role', t.getAttribute('data-clippy-role') || '');

		// If width fitting is requested, scale X around drawX to preserve anchoring
		if (sx !== 1) {
			// pivot at (drawX, 0)
			const transform = `translate(${drawX},0) scale(${sx},1) translate(${-drawX},0)`;
			const existing = t.getAttribute('transform');
			// Respect any transform already on the <text>
			if (existing) {
				pathEl.setAttribute('transform', `${existing} ${transform}`);
			} else {
				pathEl.setAttribute('transform', transform);
			}
		} else {
			// carry over any existing transform from <text>, if present
			const existing = t.getAttribute('transform');
			if (existing) pathEl.setAttribute('transform', existing);
		}

		t.replaceWith(pathEl);
	}
}



let cachedFont: opentype.Font | null = null;
async function loadFont(): Promise<opentype.Font | null> {
	if (cachedFont) return cachedFont;
	try {
		const res = await fetch(ocrAUrl);
		const buf = await res.arrayBuffer();
		cachedFont = opentype.parse(buf);
		return cachedFont;
	} catch (e) {
		console.error('Failed to load font for outlining', e);
		return null;
	}
};

function baselineOffset(font: opentype.Font, size: number, dominant: string) {
	const asc = (font as opentype.Font).ascender || font.unitsPerEm * 0.8;
	const desc = (font as opentype.Font).descender || -font.unitsPerEm * 0.2;
	switch ((dominant || '').toLowerCase()) {
		case 'central':
		case 'middle': return ((asc + desc) / 2) * (size / font.unitsPerEm);
		case 'text-before-edge': return asc * (size / font.unitsPerEm);
		case 'text-after-edge': return -desc * (size / font.unitsPerEm);
		default: return 0;
	}
};

function parseFontWeight(t: SVGTextElement): number | 'bold' | null {
	const attr = (t.getAttribute('font-weight') || t.style.fontWeight || '').trim().toLowerCase();
	if (!attr)
		return null;
	if (attr === 'bold' || attr === 'bolder')
		return 'bold';
	const n = parseInt(attr, 10);
	return isFinite(n) ? n : null;
}

function wantsSyntheticBold(t: SVGTextElement): { enabled: boolean, strengthEm: number } {
	const force = (t.getAttribute('data-synthetic-bold') || '').toLowerCase();
	const strengthAttr = t.getAttribute('data-bold-strength');
	const strengthEm = isFinite(parseFloat(strengthAttr || '')) ? Math.max(0, parseFloat(strengthAttr!)) : 0.06;
	if (force === 'true')
		return { enabled: true, strengthEm };
	const w = parseFontWeight(t);
	if (w === 'bold' || (typeof w === 'number' && w >= 600))
		return { enabled: true, strengthEm };
	return { enabled: false, strengthEm };
}
