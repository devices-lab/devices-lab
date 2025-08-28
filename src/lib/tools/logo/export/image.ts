import { outlineAllText, downloadPNG } from '$lib/tools/logo/utils';

type PngOpts = {
	/** Target raster DPI. 600–1200 is typical for silkscreen. Default 1200. */
	dpi?: number;
	/** Extra padding (user units) added around the tight bounds. Default 0. */
	padding?: number;
	/** 'transparent' or any CSS color (e.g. '#fff'). Default 'transparent'. */
	background?: 'transparent' | string;
	/** If true, convert to 1-bit black/white (no antialiasing). Default false. */
	monochrome?: boolean;
	/** Invert black ⇄ white after rasterization. Default false. */
	invert?: boolean;
	/** Threshold [0..255] used when monochrome=true. Default 200. */
	threshold?: number;
};

/**
 * Export a high-resolution PNG suitable for Altium bitmap import.
 */
export async function exportPng(id: string, filename: string, opts: PngOpts = {}) {
	const {
		dpi = 1200,
		padding = 10,
		background = 'transparent',
		monochrome = false,
		invert = false,
		threshold = 200,
	} = opts;

	const CSS_DPI = 96; // 1 SVG/CSS px = 1/96"

	const node = document.getElementById(id) as SVGSVGElement | null; if (!node) return;
	const clone = node.cloneNode(true) as SVGSVGElement;
	clone.querySelectorAll('style').forEach(s => s.remove());

	await outlineAllText(clone);

	// Measure tight bounds using a hidden, attached copy (so getBBox() works)
	const wrapper = document.createElement('div');
	wrapper.style.position = 'fixed';
	wrapper.style.left = '-10000px';
	wrapper.style.top = '-10000px';
	wrapper.style.visibility = 'hidden';
	document.body.appendChild(wrapper);

	// Ensure the clone has a viewBox so it can be serialized cleanly
	if (!clone.hasAttribute('viewBox')) {
		const wAttr = clone.getAttribute('width');
		const hAttr = clone.getAttribute('height');
		if (wAttr && hAttr) clone.setAttribute('viewBox', `0 0 ${parseFloat(wAttr)} ${parseFloat(hAttr)}`);
	}
	wrapper.appendChild(clone);

	const bbox = clone.getBBox();
	const vbX = bbox.x - padding;
	const vbY = bbox.y - padding;
	const vbW = bbox.width + 2 * padding || 1; // avoid zero
	const vbH = bbox.height + 2 * padding || 1;

	// Build a minimal container SVG that translates content to (0,0)
	const SVG_NS = 'http://www.w3.org/2000/svg';
	const out = document.createElementNS(SVG_NS, 'svg');
	out.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
	out.setAttribute('version', '1.1');
	out.setAttribute('viewBox', `0 0 ${vbW} ${vbH}`);
	// optional background
	if (background !== 'transparent') {
		const bg = document.createElementNS(SVG_NS, 'rect');
		bg.setAttribute('x', '0'); bg.setAttribute('y', '0');
		bg.setAttribute('width', String(vbW)); bg.setAttribute('height', String(vbH));
		bg.setAttribute('fill', background);
		out.appendChild(bg);
	}
	const g = document.createElementNS(SVG_NS, 'g');
	g.setAttribute('transform', `translate(${-vbX}, ${-vbY})`);
	// move all normalized children under the translated <g>
	while (clone.firstChild) g.appendChild(clone.firstChild);
	out.appendChild(g);

	// No longer need the hidden DOM
	wrapper.remove();

	// Compute pixel size from DPI and viewBox
	const pxW = Math.max(1, Math.ceil(vbW * (dpi / CSS_DPI)));
	const pxH = Math.max(1, Math.ceil(vbH * (dpi / CSS_DPI)));

	// Serialize and render into a canvas
	const source = new XMLSerializer().serializeToString(out);
	const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
	const url = URL.createObjectURL(blob);

	const img = new Image();
	// If all content is same-origin vectors, no CORS needed
	const loadImage = () =>
		new Promise<HTMLImageElement>((resolve, reject) => {
			img.onload = () => resolve(img);
			img.onerror = (e) => reject(e);
			img.src = url;
		});

	const bitmap = await loadImage();
	const canvas = document.createElement('canvas');
	canvas.width = pxW;
	canvas.height = pxH;

	const ctx = canvas.getContext('2d')!;
	ctx.imageSmoothingEnabled = true;
	// fill background if transparent requested and you still want a color behind
	if (background !== 'transparent') {
		ctx.fillStyle = background;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	} else {
		// ensure fully transparent background
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
	ctx.drawImage(bitmap, 0, 0, pxW, pxH);

	// Optional post-processing: alpha-aware monochrome + invert
	if (monochrome || invert) {
		const imgData = ctx.getImageData(0, 0, pxW, pxH);
		const data = imgData.data;

		const bgIsTransparent = background === 'transparent';
		const alphaCutoff = 8; // ignore pixels with alpha <= 8 (fully transparent background)

		for (let i = 0; i < data.length; i += 4) {
			let r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];

			if (bgIsTransparent && a <= alphaCutoff) {
				// Leave truly transparent pixels alone
				r = g = b = 0; a = 0;
			} else if (monochrome) {
				// Luma-based 1-bit classification on visible pixels
				const luma = 0.299 * r + 0.587 * g + 0.114 * b;
				const inkOn = luma <= threshold;        // dark → ink
				if (inkOn) {
					r = g = b = 0; a = 255;               // opaque black
				} else {
					if (bgIsTransparent) { a = 0; }       // transparent background
					else { r = g = b = 255; a = 255; }    // solid white background
				}
			}

			if (invert) { r = 255 - r; g = 255 - g; b = 255 - b; } // keep alpha as set

			data[i] = r; data[i + 1] = g; data[i + 2] = b; data[i + 3] = a;
		}

		ctx.putImageData(imgData, 0, 0);
	}
	
	URL.revokeObjectURL(url);

	// Save PNG
	downloadPNG(canvas, filename);
}
