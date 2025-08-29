

import { outlineAllText, booleanBlackMinusWhite, evenOddHoles, orientCCW, orientCW, unionBlack, downloadDXF } from '$lib/workbench/logo/utils';

type Pt = { x: number; y: number };

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
