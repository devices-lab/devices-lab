import { outlineAllText, downloadSVG, downloadSVGFont } from '$lib/tools/logo/utils';

/**
 * Export the SVG image
 * @param id The ID of the SVG element
 * @param filename The name of the file to save
 * @returns void
 */
export async function exportSvg(id: string, filename: string) {
	// Get the original SVG element
	const node = document.getElementById(id) as SVGSVGElement | null; 
	if (!node) {
		console.warn(`SVG with id ${id} not found`);
		return;
	};

    // Download the SVG image
	downloadSVG(node, filename);
}

/**
 * Export the SVG as a flat image
 * @param id The ID of the SVG element
 * @param filename The name of the file to save
 * @returns void
 */
export async function exportSvgFlat(id: string, filename: string) {
    // Get the original SVG element
    const node = document.getElementById(id) as SVGSVGElement | null; 
    if (!node) {
        console.warn(`SVG with id ${id} not found`);
        return;
    };

    // Clone the original SVG
    const clone = node.cloneNode(true) as SVGSVGElement;
    clone.querySelectorAll('style').forEach(s => s.remove());

    // Outline all text elements
    outlineAllText(clone).then(() => {
        downloadSVG(clone, filename);
    });
}

/**
 * Export the SVG with embedded font
 * @param id The ID of the SVG element
 * @param filename The name of the file to save
 * @returns void 
 */
export async function exportSvgFont(id: string, filename: string) {
    // Get the original SVG element
	const node = document.getElementById(id) as SVGSVGElement | null; 
	if (!node) {
		console.warn(`SVG with id ${id} not found`);
		return;
	};

    // Download the SVG image with embedded font
	downloadSVGFont(node, filename);
}