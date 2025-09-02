// Use Clipper for polygon offset/union
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as ClipperLib from 'clipper-lib';

import { downloadDXF } from '$lib/workbench/logo/utils';
import { outlineAllText } from '$lib/workbench/logo/export/text';

type Pt = { x: number; y: number };


type Path = Pt[];

// todo remove
const CLIPPER_SCALE = 10000000;
 const FLATTEN_TOLERANCE = 0.01;



// R2000-ish header with mm units and extents
function dxfHeaderMM(minX: number, minY: number, maxX: number, maxY: number, layers: string[]) {
	const layerTable = layers.map((name, i) => [
		'0', 'LAYER', '2', name, '70', '0', '62', String(i ? 1 : 7), '6', 'CONTINUOUS'
	].join('\n')).join('\n');
	return [
		'0', 'SECTION', '2', 'HEADER',
		'9', '$INSUNITS', '70', '4',          // 4 = millimeters
		'9', '$EXTMIN', '10', String(minX), '20', String(minY),
		'9', '$EXTMAX', '10', String(maxX), '20', String(maxY),
		'0', 'ENDSEC',
		'0', 'SECTION', '2', 'TABLES',
		'0', 'TABLE', '2', 'LAYER', '70', String(layers.length),
		layerTable,
		'0', 'ENDTAB',
		'0', 'ENDSEC',
		'0', 'SECTION', '2', 'ENTITIES'
	].join('\n');
}

function dxfLwPolyline(ring: Pt[], layer: string) {
	// ensure closed and dedup
	const pts: Pt[] = [];
	for (let i = 0; i < ring.length; i++) {
		const a = ring[i];
		if (!pts.length || Math.hypot(a.x - pts[pts.length - 1].x, a.y - pts[pts.length - 1].y) > 1e-9)
			pts.push(a);
		if (i === ring.length - 1 && (a.x !== ring[0].x || a.y !== ring[0].y))
			pts.push({ x: ring[0].x, y: ring[0].y });
	}
	const n = pts.length;
	const head = [
		'0', 'LWPOLYLINE',
		'8', layer,       // layer name
		'90', String(n),  // vertex count
		'70', '1'          // closed flag
	].join('\n');
	const coords = pts.map(p => ['10', String(p.x), '20', String(p.y)].join('\n')).join('\n');
	return head + '\n' + coords + '\n';
}

function dxfFooter() { 
	return '0\nENDSEC\n0\nEOF\n'; 
}

/* ------------------------------ MAIN EXPORT ------------------------------ */

export async function exportDxfForAltium(id: string, filename: string) {
	const svg = document.getElementById(id) as SVGSVGElement | null; 
	if (!svg) 
		return;
	const clone = svg.cloneNode(true) as SVGSVGElement;
	clone.querySelectorAll('style').forEach(s => s.remove());

	// Convert text to paths (with optional synthetic bold)
	await outlineAllText(clone);

	// Boolean: (union of black) – (union of white)
	let rings = booleanBlackMinusWhite(clone, 0.05);
	if (!rings.length)
		rings = unionBlack(clone, 0.05);
	if (!rings.length) {
		console.warn('No exportable geometry.');
		return;
	}

	// Translate to 0,0 and compute bounds
	let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
	rings.forEach(r => r.forEach(p => {
		minX = Math.min(minX, p.x);
		minY = Math.min(minY, p.y);
		maxX = Math.max(maxX, p.x);
		maxY = Math.max(maxY, p.y);
	}));
	const dx = isFinite(minX) ? -minX : 0, dy = isFinite(minY) ? -minY : 0;
	const tr = rings.map(r => r.map(p => ({ x: +(p.x + dx), y: +(p.y + dy) })));
	const ext = { minX: 0, minY: 0, maxX: Math.max(1e-6, maxX - minX), maxY: Math.max(1e-6, maxY - minY) };

	// Classify holes (even-odd), orient, and emit on OUTER/CUTOUT layers
	const hole = evenOddHoles(tr);
	const outers: Pt[][] = [], holes: Pt[][] = [];
	for (let i = 0; i < tr.length; i++)
		(hole[i] ? holes : outers).push(tr[i]);
	outers.forEach(orientCCW);
	holes.forEach(orientCW);

	const header = dxfHeaderMM(ext.minX, ext.minY, ext.maxX, ext.maxY, ['OUTER', 'CUTOUT']);
	const body = [
		...outers.map(r => dxfLwPolyline(r, 'OUTER')),
		...holes.map(r => dxfLwPolyline(r, 'CUTOUT')),
	].join('');
	const dxf = header + '\n' + body + dxfFooter();

	downloadDXF(dxf, filename);
}










const BLACK = ['[fill="#000"]', '[fill="#000000"]', '[fill="black"]', '[fill="rgb(0,0,0)"]'].join(',');
const WHITE = ['[fill="#fff"]', '[fill="#ffffff"]', '[fill="white"]', '[fill="rgb(255,255,255)"]'].join(',');


function intify2(polys: Path[]): Path[] {
	return polys.map(p => p.map(pt => ({ x: Math.round(pt.x * CLIPPER_SCALE), y: Math.round(pt.y * CLIPPER_SCALE) })));
}

function deintify2(paths: Path[]): Path[] {
	return paths.map((p) => p.map(({ x, y }) => ({ x: x / CLIPPER_SCALE, y: y / CLIPPER_SCALE })));
}


function unionBlack(svg: SVGSVGElement, tol = FLATTEN_TOLERANCE): Path[] {
	const blacks = Array.from(svg.querySelectorAll<SVGSVGElement>(`path${BLACK},rect${BLACK},circle${BLACK},ellipse${BLACK},polygon${BLACK}`));
	const polys = blacks.map(elToPathD).filter(Boolean).flatMap(d => parseAndFlattenPath(d, tol));

	const u = new ClipperLib.Clipper();
	u.AddPaths(intify2(polys), ClipperLib.PolyType.ptSubject, true);

	const sol: Path[] = [];
	u.Execute(ClipperLib.ClipType.ctUnion, sol, ClipperLib.PolyFillType.pftNonZero, ClipperLib.PolyFillType.pftNonZero);

	return deintify2(sol);
}

function booleanBlackMinusWhite(svg: SVGSVGElement, tol = FLATTEN_TOLERANCE): Path[] {
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


/* ──────────────────────────────────────────────────────────── */
/* ───────────────────────── Contours ───────────────────────── */
/* ──────────────────────────────────────────────────────────── */

function evenOddHoles(rings: Path[]): boolean[] {
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

function orientCCW(r: Path) { // positive area
	let A = 0;
	for (let i = 0; i < r.length - 1; i++)
		A += r[i].x * r[i + 1].y - r[i + 1].x * r[i].y;
	if (A < 0)
		r.reverse();
	return r;
}

function orientCW(r: Path) {
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

function parseAndFlattenPath(d: string, tol = FLATTEN_TOLERANCE): Path[] {
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
				cx = (rel ? cx : 0) + read();
				cy = (rel ? cy : 0) + read();
				sx = cx; sy = cy;
				poly = [{ x: cx, y: cy }];
				polys.push(poly);
				// Subsequent pairs are implicit LineTos
				while (i < tokens.length && !isCmd(tokens[i])) {
					cx = (rel ? cx : 0) + read();
					cy = (rel ? cy : 0) + read();
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
					cx = x;
					cy = y;
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
					cx = x;
					cy = y;
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

