

import { type PathElement, ClippyFlatten } from "$lib/workbench/logo/clippy";


import { writable } from 'svelte/store';

export const svgBackground = writable('none');
export const svgBaselineSupported = writable(false);

// Number of milliseconds to wait before generating the SVG
export const GENERATOR_DELAY_MS = 1000;

export type SVG_Role = 'subject' | 'clip' | 'frame' | 'ignore';


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

export const charWidth = (size: number) => size * 0.607;
//export const charWidth = (size: number) => size * 0.62;
export const charHeight = (size: number) => Math.round(size * 0.676);

export const calculateTextWidth = (text: string, size: number) => {
	const temp = Math.round(Math.max(charWidth(size) * text.length, size * 1.2));
	return temp % 2 === 0 ? temp : temp + 1;
};

export const FLATTEN_TOLERANCE = 0.01;








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



const SVG_NS = 'http://www.w3.org/2000/svg';

function findElements(svgRoot: SVGSVGElement, role: string): PathElement[] {
	// Subjects can be either paths or rectangles
	const paths = svgRoot.querySelectorAll<SVGPathElement>(`path[data-clippy-role="${role}"]`);
	const rects = svgRoot.querySelectorAll<SVGRectElement>(`rect[data-clippy-role="${role}"]`);
	const circles = svgRoot.querySelectorAll<SVGCircleElement>(`circle[data-clippy-role="${role}"]`);
	const out = [
		...Array.from(paths).map(p => ({ element: p, path: p.getAttribute('d') || '' })),
		...Array.from(rects).map(r => ({ element: r, path: rectToPathD(r) })),
		...Array.from(circles).map(c => ({ element: c, path: circleOrEllipseToPathD(c) })),
	].filter(Boolean);

	if (!out.length) {
		console.warn(`No ${role} elements found`);
		return [];
	}
	return out;
}

// set all not-none and not black colors to white
export async function subtractWhiteFromBlack(svgRoot: SVGSVGElement, scale: number = 1): Promise<SVGSVGElement | undefined> {
	const subjects = findElements(svgRoot, 'subject');
	const clips = findElements(svgRoot, 'clip');
	const frames = findElements(svgRoot, 'frame');

	// sanity check
	if (!subjects || subjects.length === 0) return;


	const path = await ClippyFlatten(subjects, clips, frames, scale);

	const newSvg = document.createElementNS(SVG_NS, 'svg');
	newSvg.setAttribute('viewBox', svgRoot.getAttribute('viewBox') || '0 0 100 100');
	newSvg.setAttribute('width', svgRoot.getAttribute('width') || '100');
	newSvg.setAttribute('height', svgRoot.getAttribute('height') || '100');
	newSvg.setAttribute('class', svgRoot.getAttribute('class') || '');

	const pathEl = document.createElementNS(SVG_NS, 'path');
	pathEl.setAttribute('d', path);
	pathEl.setAttribute('fill', '#000000');
	pathEl.setAttribute('fill-rule', 'evenodd');

	newSvg.appendChild(pathEl);
	return newSvg;
}


/*
function selectBlack(type: string) {
	return `${type}[fill="#000"], ${type}[fill="#000000"], ${type}[fill="black"], ${type}[fill="rgb(0,0,0)"]`;
}
function selectWhite(type: string) {
	return `${type}[fill="#fff"], ${type}[fill="#ffffff"], ${type}[fill="white"], ${type}[fill="rgb(255,255,255)"]`;
}


// set all not-none and not black colors to white
export function subtractWhiteFromBlackOld(svgRoot: SVGSVGElement): SVGElement | null {
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
*/






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