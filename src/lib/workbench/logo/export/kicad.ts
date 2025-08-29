import { subtractWhiteFromBlack, outlineAllText, downloadSVG } from '$lib/workbench/logo/utils';

export async function exportSvgForKiCad(id: string, filename: string) {
	// Get the original SVG element
	const node = document.getElementById(id) as SVGSVGElement | null; 
	if (!node) {
		console.warn(`SVG with id ${id} not found`);
		return;
	};

	// Clone the original SVG
	const clone = node.cloneNode(true) as SVGSVGElement;
	// Outline all text elements
	await outlineAllText(clone);

	// Subtract white from black
	try { 
		subtractWhiteFromBlack(clone); 
	} catch (e) { 
		console.warn('Subtract skipped:', e); 
	}

	// Serialize the modified SVG for download
	downloadSVG(clone, filename);
};

