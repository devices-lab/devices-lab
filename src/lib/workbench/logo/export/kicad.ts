import { subtractWhiteFromBlack, outlineAllText, downloadSVG } from '$lib/workbench/logo/utils';

export async function exportSvgForKiCad(id: string, filename: string) {
	// Get the original SVG element
	const clone = await generateSvgForKiCad(id);
	if (!clone) {
		console.warn(`Failed to generate SVG for ${id}`);
		return;
	}

	// Serialize the modified SVG for download
	downloadSVG(clone, filename);
};



export async function generateSvgForKiCad(id: string): Promise<SVGSVGElement | undefined> {
	// Get the original SVG element
	const node = document.getElementById(id) as SVGSVGElement | null;
	if (!node) {
		console.warn(`SVG with id ${id} not found`);
		return;
	};

	// Clone the original SVG
	let clone = node.cloneNode(true) as SVGSVGElement;
	// Outline all text elements
	await outlineAllText(clone);

	// Subtract white from black
	try {
		const result = await subtractWhiteFromBlack(clone);
		if (result) {
			clone = result;
		}
	} catch (e) {
		console.warn('Subtract skipped:', e);
	}

	// Serialize the modified SVG for download
	return clone;
};
