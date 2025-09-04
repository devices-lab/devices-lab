import { downloadSVG, KICAD_SCALE } from '$lib/workbench/logo/utils';
import { ClippyFlattenSVG } from '$lib/workbench/logo/export/clippy';
import { generateSvgTextFlat } from '$lib/workbench/logo/export/svg';
import { assert } from '$lib/utils';

export async function exportSvgForKiCad(id: string, filename: string) {
	// Get the original SVG element
	const clone = await generateSvgForKiCad(id, KICAD_SCALE);
	if (!clone) {
		console.warn(`Failed to generate SVG for ${id}`);
		return;
	}

	// Serialize the modified SVG for download
	downloadSVG(clone, filename);
};



export async function generateSvgForKiCad(id: string, scale: number = 1): Promise<SVGSVGElement | undefined> {
	let clone;
	
	try {
		// First, generate an SVG with all text flattened into paths
		clone = await generateSvgTextFlat(id);
		clone = assert(clone, `Failed to generate SVG for ${id}`);

		// Then, apply the Clippy flattening to merge all paths
		clone = await ClippyFlattenSVG(clone, scale);
		clone = assert(clone, `Failed to flatten SVG for ${id}`);

	} catch (e) {
		console.error(`Error generating SVG for KiCad:`, e);
		return;
	}

	return clone;
};
