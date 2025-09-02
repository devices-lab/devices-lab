import { subtractWhiteFromBlack, downloadSVG } from '$lib/workbench/logo/utils';
import { generateSvgTextFlat } from './svg';

export async function exportSvgForKiCad(id: string, filename: string) {
	// Get the original SVG element
	const clone = await generateSvgForKiCad(id, 0.2);
	if (!clone) {
		console.warn(`Failed to generate SVG for ${id}`);
		return;
	}

	// Serialize the modified SVG for download
	downloadSVG(clone, filename);
};



export async function generateSvgForKiCad(id: string, scale: number = 1): Promise<SVGSVGElement | undefined> {
	let clone = await generateSvgTextFlat(id);
	if (!clone) {
		console.warn(`Failed to generate SVG for ${id}`);
		return;
	}

	// Subtract white from black
	try {
		clone = await subtractWhiteFromBlack(clone, scale);
		if (!clone) {
			console.warn(`Failed to generate SVG for ${id}`);
			return;
		}
	} catch (e) {
		console.warn('Subtract skipped:', e);
		return;
	}

	// Serialize the modified SVG for download
	return clone;
};
