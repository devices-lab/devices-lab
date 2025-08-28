// Use Clipper for polygon offset/union
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as ClipperLib from 'clipper-lib';

import { ClippyOffset } from "$lib/tools/logo/clippy";


import { writable } from 'svelte/store';

export const svgBackground = writable('none');
export const svgBaselineSupported = writable(false);


type Pt = { x: number; y: number };
type Path = Pt[];

export const LOGO_ICON = "DL";
export const LOGO_NAME = 'devices-lab';
export const LOGO_DOMAIN = 'devices-lab.org';


export const STROKE = 10;
export const PAD = 20;
export const RADIUS = 40;
export const COLOR = '#000';
export const TEXT = '#fff';
//export const BACKGROUND = 'none';
//export const FONT_FAMILY = `'OCR A Extended', 'OCR A Std', 'OCR A', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`;
export const FONT_FAMILY = `'OCR A Extended', 'OCR A Std', 'OCR A'`;

export const charWidth = (size: number) => size * 0.62;
export const charHeight = (size: number) => size * 0.676;
export const textWidth = (text: string, size: number) => Math.max(charWidth(size) * text.length, size * 1.2);



export const FLATTEN_TOLERANCE = 0.01;
// todo remove
const CLIPPER_SCALE = 10000000;




/* ──────────────────────────────────────────────────────────────── */
/* ───────────────────────── Text -> Path ───────────────────────── */
/* ──────────────────────────────────────────────────────────────── */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ocrAUrl from '$lib/assets/OCRAEXT.TTF';
import * as opentype from 'opentype.js';

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


/* ──────────────────────────────────────────────────────────── */
/* ───────────────────────── Contours ───────────────────────── */
/* ──────────────────────────────────────────────────────────── */

export function evenOddHoles(rings: Path[]): boolean[] {
	const inside = (pt: Pt, poly: Path) => {
		let inn = false;
		for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
			const xi = poly[i].x, yi = poly[i].y, xj = poly[j].x, yj = poly[j].y;
			const hit = ((yi > pt.y) !== (yj > pt.y)) && (pt.x < (xj - xi) * (pt.y - yi) / ((yj - yi) || 1e-12) + xi);
			if (hit)
				inn = !inn;
		}
		return inn;
	};
	return rings.map((r, i) => {
		const p = r[0];
		let c = 0;
		for (let k = 0; k < rings.length; k++)
			if (k !== i && inside(p, rings[k]))
				c++;
		return (c % 2) === 1;
	});
}

export function orientCCW(r: Path) { // positive area
	let A = 0;
	for (let i = 0; i < r.length - 1; i++)
		A += r[i].x * r[i + 1].y - r[i + 1].x * r[i].y;
	if (A < 0)
		r.reverse();
	return r;
}

export function orientCW(r: Path) {
	let A = 0;
	for (let i = 0; i < r.length - 1; i++)
		A += r[i].x * r[i + 1].y - r[i + 1].x * r[i].y;
	if (A > 0)
		r.reverse();
	return r;
}


/* ─────────────────────────────────────────────────────────────── */
/* ───────────────────────── Cubic Paths ───────────────────────── */
/* ─────────────────────────────────────────────────────────────── */

const KAPPA = 0.5522847498307936;

function rectToCubicPathD(el: SVGRectElement) {
	const x = parseFloat(el.getAttribute('x') || '0');
	const y = parseFloat(el.getAttribute('y') || '0');
	const w = parseFloat(el.getAttribute('width') || '0');
	const h = parseFloat(el.getAttribute('height') || '0');
	let rx = el.hasAttribute('rx') ? parseFloat(el.getAttribute('rx')!) : 0;
	let ry = el.hasAttribute('ry') ? parseFloat(el.getAttribute('ry')!) : 0;

	if (!el.hasAttribute('ry'))
		ry = rx;
	if (!el.hasAttribute('rx'))
		rx = ry;
	rx = Math.min(Math.max(rx, 0), w / 2);
	ry = Math.min(Math.max(ry, 0), h / 2);

	if (!rx && !ry)
		return `M ${x} ${y} H ${x + w} V ${y + h} H ${x} Z`;

	const cx = rx * KAPPA, cy = ry * KAPPA, x1 = x + w, y1 = y + h;
	return [
		`M ${x + rx} ${y}`,
		`H ${x1 - rx}`,
		`C ${x1 - rx + cx} ${y} ${x1} ${y + ry - cy} ${x1} ${y + ry}`,
		`V ${y1 - ry}`,
		`C ${x1} ${y1 - ry + cy} ${x1 - rx + cx} ${y1} ${x1 - rx} ${y1}`,
		`H ${x + rx}`,
		`C ${x + rx - cx} ${y1} ${x} ${y1 - ry + cy} ${x} ${y1 - ry}`,
		`V ${y + ry}`,
		`C ${x} ${y + ry - cy} ${x + rx - cx} ${y} ${x + rx} ${y}`,
		`Z`
	].join(' ');
}

function circleOrEllipseToCubicPathD(el: SVGCircleElement | SVGEllipseElement) {
	const tag = el.tagName.toLowerCase();
	const cx = parseFloat(el.getAttribute('cx') || '0');
	const cy = parseFloat(el.getAttribute('cy') || '0');
	let rx: number, ry: number;
	if (tag === 'circle') {
		const r = parseFloat((el as SVGCircleElement).getAttribute('r') || '0');
		rx = r;
		ry = r;
	} else {
		rx = parseFloat((el as SVGEllipseElement).getAttribute('rx') || '0');
		ry = parseFloat((el as SVGEllipseElement).getAttribute('ry') || '0');
	}

	if (!(rx > 0 && ry > 0))
		return '';

	const ox = rx * KAPPA, oy = ry * KAPPA;
	return [
		`M ${cx + rx} ${cy}`,
		`C ${cx + rx} ${cy - oy} ${cx + ox} ${cy - ry} ${cx} ${cy - ry}`,
		`C ${cx - ox} ${cy - ry} ${cx - rx} ${cy - oy} ${cx - rx} ${cy}`,
		`C ${cx - rx} ${cy + oy} ${cx - ox} ${cy + ry} ${cx} ${cy + ry}`,
		`C ${cx + ox} ${cy + ry} ${cx + rx} ${cy + oy} ${cx + rx} ${cy}`,
		`Z`
	].join(' ');
}

function pointsToPathD(el: SVGPolygonElement | SVGPolylineElement) {
	const pts = (el.getAttribute('points') || '').trim().split(/[\s,]+/).map(parseFloat);
	if (pts.length < 4)
		return '';

	const segs = [`M ${pts[0]} ${pts[1]}`];
	for (let i = 2; i < pts.length; i += 2)
		segs.push(`L ${pts[i]} ${pts[i + 1]}`);
	if (el.tagName.toLowerCase() === 'polygon')
		segs.push('Z');
	return segs.join(' ');
}

function elToPathD(el: Element): string {
	const t = el.tagName.toLowerCase();
	if (t === 'path')
		return (el as SVGPathElement).getAttribute('d') || '';
	if (t === 'rect')
		return rectToCubicPathD(el as SVGRectElement);
	if (t === 'circle' || t === 'ellipse')
		return circleOrEllipseToCubicPathD(el as SVGCircleElement | SVGEllipseElement);
	if (t === 'polygon' || t === 'polyline')
		return pointsToPathD(el as SVGPolygonElement | SVGPolylineElement);
	return '';
}


/* ───────────────────────────────────────────────────────── */
/* ───────────────────────── Paths ───────────────────────── */
/* ───────────────────────────────────────────────────────── */

function rectToPathD(rect: SVGRectElement): string {
	const x = parseFloat(rect.getAttribute('x') || '0');
	const y = parseFloat(rect.getAttribute('y') || '0');
	const w = parseFloat(rect.getAttribute('width') || '0');
	const h = parseFloat(rect.getAttribute('height') || '0');
	let rx = rect.hasAttribute('rx') ? parseFloat(rect.getAttribute('rx')!) : 0;
	let ry = rect.hasAttribute('ry') ? parseFloat(rect.getAttribute('ry')!) : 0;

	if (!rect.hasAttribute('ry')) ry = rx;
	if (!rect.hasAttribute('rx')) rx = ry;
	rx = Math.max(0, Math.min(rx, w / 2));
	ry = Math.max(0, Math.min(ry, h / 2));

	if (rx === 0 && ry === 0) return `M ${x} ${y} H ${x + w} V ${y + h} H ${x} Z`;

	const xw = x + w, yh = y + h;
	return [
		`M ${x + rx} ${y}`,
		`H ${xw - rx}`,
		`A ${rx} ${ry} 0 0 1 ${xw} ${y + ry}`,
		`V ${yh - ry}`,
		`A ${rx} ${ry} 0 0 1 ${xw - rx} ${yh}`,
		`H ${x + rx}`,
		`A ${rx} ${ry} 0 0 1 ${x} ${yh - ry}`,
		`V ${y + ry}`,
		`A ${rx} ${ry} 0 0 1 ${x + rx} ${y}`,
		`Z`
	].join(' ');
}

function circleOrEllipseToPathD(el: SVGCircleElement | SVGEllipseElement): string {
	const tag = el.tagName.toLowerCase();
	const cx = parseFloat(el.getAttribute('cx') || '0');
	const cy = parseFloat(el.getAttribute('cy') || '0');
	let rx: number, ry: number;
	if (tag === 'circle') {
		const r = parseFloat((el as SVGCircleElement).getAttribute('r') || '0');
		rx = r;
		ry = r;
	} else {
		rx = parseFloat((el as SVGEllipseElement).getAttribute('rx') || '0');
		ry = parseFloat((el as SVGEllipseElement).getAttribute('ry') || '0');
	}
	if (!(isFinite(cx) && isFinite(cy) && isFinite(rx) && isFinite(ry)))
		return '';
	if (rx <= 0 || ry <= 0) return '';
	return [
		`M ${cx + rx} ${cy}`,
		`A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy}`,
		`A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy}`,
		`Z`
	].join(' ');
}


/* ────────────────────────────────────────────────────────────── */
/* ───────────────────────── Operations ───────────────────────── */
/* ────────────────────────────────────────────────────────────── */

function selectBlack(type: string) {
	return `${type}[fill="#000"], ${type}[fill="#000000"], ${type}[fill="black"], ${type}[fill="rgb(0,0,0)"]`;
}
function selectWhite(type: string) {
	return `${type}[fill="#fff"], ${type}[fill="#ffffff"], ${type}[fill="white"], ${type}[fill="rgb(255,255,255)"]`;
}

// set all not-none and not black colors to white
export function subtractWhiteFromBlack(svgRoot: SVGSVGElement): SVGElement | null {
	const SVG_NS = 'http://www.w3.org/2000/svg';

	// Make sure all elements are either black or white
	//svgRoot.querySelectorAll<SVGElement>('*:not([fill="none"]):not([fill="black"]):not([fill="#000"]):not([fill="#000000"]):not([fill="rgb(0,0,0)"])').forEach(el => el.setAttribute('fill', '#ffffff'));

	svgRoot.querySelectorAll<SVGElement>('*').forEach(el => {
		const fill = el.getAttribute('fill') || el.style.fill || '';
		if (fill && fill.toLowerCase() !== 'none' && fill !== '#000' && fill !== '#000000' && fill.toLowerCase() !== 'black' && fill.toLowerCase() !== 'rgb(0,0,0)')
			el.setAttribute('fill', '#ffffff');
	});

	// Find all black base elements
	const baseRect = svgRoot.querySelector<SVGRectElement>(selectBlack('rect'));
	const basePath = svgRoot.querySelector<SVGPathElement>(selectBlack('path'));
	const baseCircle = svgRoot.querySelector<SVGCircleElement>(selectBlack('circle'));
	const baseEllipse = svgRoot.querySelector<SVGEllipseElement>(selectBlack('ellipse'));
	const baseEl = baseRect || basePath || baseCircle || baseEllipse;
	if (!baseEl) {
		console.warn('No black base element found');
		return null;
	}

	// Convert the base element to path data
	let baseD = '';
	if (baseRect) baseD = rectToPathD(baseRect);
	else if (basePath) baseD = basePath.getAttribute('d') || '';
	else if (baseCircle) baseD = circleOrEllipseToPathD(baseCircle);
	else if (baseEllipse) baseD = circleOrEllipseToPathD(baseEllipse);
	if (!baseD) {
		console.warn('No base path data found');
		return null;
	}

	// Find all white cutters
	const pathCutters = svgRoot.querySelectorAll<SVGPathElement>(selectWhite('path'));
	const circleCutters = svgRoot.querySelectorAll<SVGCircleElement>(selectWhite('circle'));
	const ellipseCutters = svgRoot.querySelectorAll<SVGEllipseElement>(selectWhite('ellipse'));

	const cutters = [
		...Array.from(pathCutters).map(p => p.getAttribute('d') || ''),
		...Array.from(circleCutters).map(c => circleOrEllipseToPathD(c)),
		...Array.from(ellipseCutters).map(e => circleOrEllipseToPathD(e)),
	].filter(Boolean);

	if (!cutters.length) {
		console.warn('No white cutter paths found');
		return null;
	}

	// Create the compound path
	const compound = document.createElementNS(SVG_NS, 'path');
	compound.setAttribute('d', `${baseD} ${cutters.join(' ')}`);
	compound.setAttribute('fill', '#000');
	compound.setAttribute('fill-rule', 'evenodd');
	baseEl.parentNode?.insertBefore(compound, baseEl);
	baseEl.remove();

	// Remove original cutters
	pathCutters.forEach(el => el.remove());
	circleCutters.forEach(el => el.remove());
	ellipseCutters.forEach(el => el.remove());

	// Make sure the subject is transparent
	svgRoot.querySelectorAll('#subject').forEach(el => el.setAttribute('fill', 'none'));
	return compound;
}

/* ────────────────────────────────────────────────────────────── */
/* ────────────────────────────────────────────────────────────── */


const BLACK = ['[fill="#000"]', '[fill="#000000"]', '[fill="black"]', '[fill="rgb(0,0,0)"]'].join(',');
const WHITE = ['[fill="#fff"]', '[fill="#ffffff"]', '[fill="white"]', '[fill="rgb(255,255,255)"]'].join(',');


function intify2(polys: Path[]): Path[] {
	return polys.map(p => p.map(pt => ({ x: Math.round(pt.x * CLIPPER_SCALE), y: Math.round(pt.y * CLIPPER_SCALE) })));
}

function deintify2(paths: Path[]): Path[] {
	return paths.map((p) => p.map(({ x, y }) => ({ x: x / CLIPPER_SCALE, y: y / CLIPPER_SCALE })));
}


export function unionBlack(svg: SVGSVGElement, tol = FLATTEN_TOLERANCE): Path[] {
	const blacks = Array.from(svg.querySelectorAll<SVGSVGElement>(`path${BLACK},rect${BLACK},circle${BLACK},ellipse${BLACK},polygon${BLACK}`));
	const polys = blacks.map(elToPathD).filter(Boolean).flatMap(d => parseAndFlattenPath(d, tol));

	const u = new ClipperLib.Clipper();
	u.AddPaths(intify2(polys), ClipperLib.PolyType.ptSubject, true);

	const sol: Path[] = [];
	u.Execute(ClipperLib.ClipType.ctUnion, sol, ClipperLib.PolyFillType.pftNonZero, ClipperLib.PolyFillType.pftNonZero);

	return deintify2(sol);
}

export function booleanBlackMinusWhite(svg: SVGSVGElement, tol = FLATTEN_TOLERANCE): Path[] {
	const blacks = Array.from(svg.querySelectorAll<SVGSVGElement>(`path${BLACK},rect${BLACK},circle${BLACK},ellipse${BLACK},polygon${BLACK}`));
	const whites = Array.from(svg.querySelectorAll<SVGSVGElement>(`path${WHITE},rect${WHITE},circle${WHITE},ellipse${WHITE},polygon${WHITE}`));
	if (!blacks.length)
		return [];

	const blackPolys = blacks.map(elToPathD).filter(Boolean).flatMap(d => parseAndFlattenPath(d, tol));
	const whitePolys = whites.map(elToPathD).filter(Boolean).flatMap(d => parseAndFlattenPath(d, tol));

	const subj = intify2(blackPolys);
	const clip = intify2(whitePolys);


	const u1 = new ClipperLib.Clipper();
	u1.AddPaths(subj, ClipperLib.PolyType.ptSubject, true);
	const ub: Path[] = [];
	u1.Execute(ClipperLib.ClipType.ctUnion, ub, ClipperLib.PolyFillType.pftNonZero, ClipperLib.PolyFillType.pftNonZero);

	const uw: Path[] = [];
	if (clip.length) {
		const u2 = new ClipperLib.Clipper();
		u2.AddPaths(clip, ClipperLib.PolyType.ptSubject, true);
		u2.Execute(ClipperLib.ClipType.ctUnion, uw, ClipperLib.PolyFillType.pftNonZero, ClipperLib.PolyFillType.pftNonZero);
	}

	const c = new ClipperLib.Clipper();
	c.AddPaths(ub, ClipperLib.PolyType.ptSubject, true);
	if (uw.length)
		c.AddPaths(uw, ClipperLib.PolyType.ptClip, true);
	const out: Path[] = [];
	c.Execute(ClipperLib.ClipType.ctDifference, out, ClipperLib.PolyFillType.pftNonZero, ClipperLib.PolyFillType.pftNonZero);

	const rings = deintify2(out);

	// clean: drop duplicate consecutive points and ensure closure
	const cleaned = rings.map(r => {
		const out: Path = []; for (let i = 0; i < r.length; i++) {
			const a = r[i];
			if (i === 0 || Math.hypot(a.x - out[out.length - 1].x, a.y - out[out.length - 1].y) > 1e-6)
				out.push(a);
			if (i === r.length - 1 && (out[0].x !== out[out.length - 1].x || out[0].y !== out[out.length - 1].y))
				out.push({ x: out[0].x, y: out[0].y });
		}
		return out;
	}).filter(r => r.length >= 4);

	// orient: outers CCW, holes CW
	const hole = evenOddHoles(cleaned);
	for (let i = 0; i < cleaned.length; i++) {
		if (hole[i])
			orientCW(cleaned[i]);
		else
			orientCCW(cleaned[i]);
	}
	return cleaned;
}


/* ───────────────────────────────────────────────────────────────────── */
/* ───────────────────────── Bézier → polyline ───────────────────────── */
/* ───────────────────────────────────────────────────────────────────── */

/* ------------------------------------------------------------------
   Path dilation: flatten to polylines → offset with Clipper → rebuild
   Assumptions: input path uses M,L,H,V,C,Q,Z (opentype.js glyphs do).
-------------------------------------------------------------------*/

function distancePointToLine(p: Pt, a: Pt, b: Pt): number {
	const dx = b.x - a.x, dy = b.y - a.y;
	if (dx === 0 && dy === 0) return Math.hypot(p.x - a.x, p.y - a.y);
	const t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy);
	const proj = { x: a.x + t * dx, y: a.y + t * dy };
	return Math.hypot(p.x - proj.x, p.y - proj.y);
}

function flattenQuad(p0: Pt, p1: Pt, p2: Pt, tol: number, out: Path) {
	const mid = (a: Pt, b: Pt) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
	const d = distancePointToLine(p1, p0, p2);
	if (d <= tol) {
		out.push(p2);
		return;
	}
	const p01 = mid(p0, p1), p12 = mid(p1, p2), p012 = mid(p01, p12);
	flattenQuad(p0, p01, p012, tol, out);
	flattenQuad(p012, p12, p2, tol, out);
}

function flattenCubic(p0: Pt, p1: Pt, p2: Pt, p3: Pt, tol: number, out: Path) {
	// Use control points’ max distance to baseline as flatness test
	const d1 = distancePointToLine(p1, p0, p3);
	const d2 = distancePointToLine(p2, p0, p3);
	if (Math.max(d1, d2) <= tol) { out.push(p3); return; }
	// de Casteljau split at t = 0.5
	const m = (a: Pt, b: Pt) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
	const p01 = m(p0, p1), p12 = m(p1, p2), p23 = m(p2, p3);
	const p012 = m(p01, p12), p123 = m(p12, p23);
	const p0123 = m(p012, p123);
	flattenCubic(p0, p01, p012, p0123, tol, out);
	flattenCubic(p0123, p123, p23, p3, tol, out);
}

export function parseAndFlattenPath(d: string, tol = FLATTEN_TOLERANCE): Path[] {
	// Minimal parser for M,L,H,V,C,Q,Z (absolute & relative)
	const tokens = Array.from(d.matchAll(/[MmLlHhVvCcQqZz]|-?\d*\.?\d+(?:e[-+]?\d+)?/g)).map(m => m[0]);
	let i = 0, cmd = '', cx = 0, cy = 0, sx = 0, sy = 0;
	const polys: Path[] = [];
	let poly: Path | null = null;

	const read = () => parseFloat(tokens[i++]);
	const isCmd = (t: string) => /^[a-zA-Z]$/.test(t);

	while (i < tokens.length) {
		const t = tokens[i++];
		if (isCmd(t)) cmd = t;
		else { i--; } // number encountered; reuse last cmd

		switch (cmd) {
			case 'M': case 'm': {
				const rel = cmd === 'm';
				cx = (rel ? cx : 0) + read(); cy = (rel ? cy : 0) + read();
				sx = cx; sy = cy; poly = [{ x: cx, y: cy }]; polys.push(poly);
				// Subsequent pairs are implicit LineTos
				while (i < tokens.length && !isCmd(tokens[i])) {
					cx = (rel ? cx : 0) + read(); cy = (rel ? cy : 0) + read();
					poly!.push({ x: cx, y: cy });
				}
				break;
			}
			case 'L': case 'l': {
				const rel = cmd === 'l';
				while (i < tokens.length && !isCmd(tokens[i])) {
					cx = (rel ? cx : 0) + read(); cy = (rel ? cy : 0) + read();
					poly ??= [{ x: cx, y: cy }]; // start if missing
					poly.push({ x: cx, y: cy });
				}
				break;
			}
			case 'H': case 'h': {
				const rel = cmd === 'h';
				while (i < tokens.length && !isCmd(tokens[i])) {
					cx = (rel ? cx : 0) + read();
					poly ??= [{ x: cx, y: cy }];
					poly.push({ x: cx, y: cy });
				}
				break;
			}
			case 'V': case 'v': {
				const rel = cmd === 'v';
				while (i < tokens.length && !isCmd(tokens[i])) {
					cy = (rel ? cy : 0) + read();
					poly ??= [{ x: cx, y: cy }];
					poly.push({ x: cx, y: cy });
				}
				break;
			}
			case 'Q': case 'q': {
				const rel = cmd === 'q';
				while (i < tokens.length && !isCmd(tokens[i])) {
					const x1 = (rel ? cx : 0) + read(), y1 = (rel ? cy : 0) + read();
					const x = (rel ? cx : 0) + read(), y = (rel ? cy : 0) + read();
					const p0 = { x: cx, y: cy }, p1 = { x: x1, y: y1 }, p2 = { x, y };
					const out: Path = [];
					flattenQuad(p0, p1, p2, tol, out);
					poly ??= [{ x: cx, y: cy }];
					out.forEach(p => poly!.push(p));
					cx = x; cy = y;
				}
				break;
			}
			case 'C': case 'c': {
				const rel = cmd === 'c';
				while (i < tokens.length && !isCmd(tokens[i])) {
					const x1 = (rel ? cx : 0) + read(), y1 = (rel ? cy : 0) + read();
					const x2 = (rel ? cx : 0) + read(), y2 = (rel ? cy : 0) + read();
					const x = (rel ? cx : 0) + read(), y = (rel ? cy : 0) + read();
					const p0 = { x: cx, y: cy }, p1 = { x: x1, y: y1 }, p2 = { x: x2, y: y2 }, p3 = { x, y };
					const out: Path = [];
					flattenCubic(p0, p1, p2, p3, tol, out);
					poly ??= [{ x: cx, y: cy }];
					out.forEach(p => poly!.push(p));
					cx = x; cy = y;
				}
				break;
			}
			case 'Z': case 'z': {
				if (poly && (poly[poly.length - 1].x !== sx || poly[poly.length - 1].y !== sy)) {
					poly.push({ x: sx, y: sy });
				}
				poly = null;
				cx = sx;
				cy = sy;
				break;
			}
			default: {
				// Unsupported command (A/S/T, etc.) — skip numbers if present
				while (i < tokens.length && !isCmd(tokens[i]))
					i++;
			}
		}
	}
	// Close any open polygon if it looks closed already
	polys.forEach(p => {
		if (p.length > 2) {
			const a = p[0], b = p[p.length - 1];
			if (a.x !== b.x || a.y !== b.y)
				p.push({ x: a.x, y: a.y });
		}
	});
	// Drop tiny rings
	return polys.filter(p => p.length >= 3);
	//return polys.filter(p => p.length >= 4);
}







// Convert all <text> to filled <path> (with optional dilation)
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

		const glyphs = font.stringToGlyphs(content);
		const scale = size / font.unitsPerEm;

		// measure advance for anchor
		let adv = 0;
		glyphs.forEach((g, i) => {
			adv += (g.advanceWidth || 0) * scale;
			if (i < glyphs.length - 1 && (font as opentype.Font).getKerningValue)
				adv += (font as opentype.Font).getKerningValue(g, glyphs[i + 1]) * scale;
			if (letterSpacing) adv += letterSpacing;
		});

		let drawX = x;
		if (anchor === 'middle') drawX -= adv / 2;
		else if (anchor === 'end') drawX -= adv;

		const baselineY = y + baselineOffset(font, size, dominant);
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
			cursor += gAdv;
		});

		// optional synthetic bold as true dilation
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
		t.replaceWith(pathEl);
	}
	// remove strokes globally
	//clone.querySelectorAll<SVGSVGElement>('*').forEach(el => { el.removeAttribute('stroke'); el.removeAttribute('stroke-width'); });
}


/* ─────────────────────────────────────────────────────────────── */
/* ───────────────────────── Downloaders ───────────────────────── */
/* ─────────────────────────────────────────────────────────────── */

export function downloadSVG(element: SVGSVGElement, filename: string) {
	// Serialize the modified SVG for download
	const source = new XMLSerializer().serializeToString(element);
	const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = filename.endsWith('.svg') ? filename : `${filename}.svg`;
	a.click();
	URL.revokeObjectURL(url);
}

export function downloadSVGFont(element: SVGSVGElement, filename: string) {
	// Load the OCR A font if not already loaded
	/*fetch(ocrAUrl)
		.then(r => r.blob())
		.then(b => new Promise<string>((res, rej) => {
			const reader = new FileReader();
			reader.onerror = () => rej(reader.error);
			reader.onload = () => res(reader.result as string);
			reader.readAsDataURL(b);
		}))
		.then(dataUri => {
			// Register the font CSS
			const clone = element.cloneNode(true) as SVGSVGElement;
			const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
			style.setAttribute('type', 'text/css');
			style.textContent = `@font-face{font-family:"OCR A Extended";src:url('${dataUri}') format('opentype');font-display:swap}`;
			clone.insertBefore(style, clone.firstChild);
			// Download the modified SVG
			downloadSVG(clone, filename);
		})
		.catch(err => console.error('Font load failed', err));*/

	// Register the font CSS
	const clone = element.cloneNode(true) as SVGSVGElement;
	const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
	style.setAttribute('type', 'text/css');
	style.textContent = `
		@font-face {
			font-family: "OCR A Extended";
			src: url("https://db.onlinewebfonts.com/t/fd6fa80f1e3345834599de891cca3f4c.eot");
			src: url("https://db.onlinewebfonts.com/t/fd6fa80f1e3345834599de891cca3f4c.eot?#iefix")format("embedded-opentype"),
			url("https://db.onlinewebfonts.com/t/fd6fa80f1e3345834599de891cca3f4c.woff2")format("woff2"),
			url("https://db.onlinewebfonts.com/t/fd6fa80f1e3345834599de891cca3f4c.woff")format("woff"),
			url("https://db.onlinewebfonts.com/t/fd6fa80f1e3345834599de891cca3f4c.ttf")format("truetype"),
			url("https://db.onlinewebfonts.com/t/fd6fa80f1e3345834599de891cca3f4c.svg#OCR A Extended")format("svg");
		}`;

	clone.insertBefore(style, clone.firstChild);
	// Download the modified SVG
	downloadSVG(clone, filename);
}


export function downloadDXF(dxf: string, filename: string) {
	const blob = new Blob([dxf], { type: 'application/dxf' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = filename.endsWith('.dxf') ? filename : `${filename}.dxf`;
	a.click();
	URL.revokeObjectURL(url);
}

export async function downloadPNG(canvas: HTMLCanvasElement, filename: string) {
	const save = (blob: Blob) => {
		const u = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = u;
		a.download = filename.endsWith('.png') ? filename : `${filename}.png`;
		a.click();
		URL.revokeObjectURL(u);
	};
	if (canvas.toBlob) {
		canvas.toBlob((b) => b && save(b), 'image/png');
	} else {
		// fallback
		const b64 = canvas.toDataURL('image/png');
		const b = await (await fetch(b64)).blob();
		save(b);
	}
}