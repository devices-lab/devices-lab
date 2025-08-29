import * as Clippy from "js-angusj-clipper";

import { parseAndFlattenPath } from "$lib/workbench/logo/utils";


const CLIPPER_SCALE = 10000000;
const CLIPPER_CLEAN = 0.001;


const intify = (paths: Clippy.Paths): Clippy.Paths => {
	return paths.map(p => p.map(pt => ({ x: Math.round(pt.x * CLIPPER_SCALE), y: Math.round(pt.y * CLIPPER_SCALE) })));
};

const deintify = (paths: Clippy.Paths): Clippy.Paths => {
	return paths.map((p) => p.map(({ x, y }) => ({ x: x / CLIPPER_SCALE, y: y / CLIPPER_SCALE })));
};

const polysToPathD = (paths: Clippy.Paths): string => {
	if (!paths.length)
		return '';
	return paths.map(p => `M ${p[0].x} ${p[0].y} ` + p.slice(1).map(pt => `L ${pt.x} ${pt.y}`).join(' ') + ' Z').join(' ');
};


/**
 * Offsets an SVG path using the Clippy library.
 * @param d The SVG path data to offset.
 * @param delta The offset distance.
 * @param tolerance The tolerance for flattening the path.
 * @returns The offset SVG path data.
 */
export async function ClippyOffset(d: string, delta: number): Promise<string> {
	// Parse and flatten the path
	let poly: Clippy.Paths | undefined = parseAndFlattenPath(d);
	if (!poly || !poly.length) {
		console.error('No valid polygons found');
		return d;
	}

	//==== CLIPPER ====//

	// create an instance of the library (usually only do this once in your app)
	const clipp = await Clippy.loadNativeClipperLibInstanceAsync(Clippy.NativeClipperLibRequestedFormat.WasmWithAsmJsFallback);

	// Intify the polygons
	poly = intify(poly);
	poly = clipp.cleanPolygons(poly);

	// Set the orientation of the polygons (holes)
	poly = clipp.clipToPaths({
		clipType: Clippy.ClipType.Xor,
		subjectFillType: Clippy.PolyFillType.EvenOdd,
		subjectInputs: [{ data: poly, closed: true }]
	});

	// Offset the oriented polygons
	poly = clipp.offsetToPaths({
		offsetInputs: [{ data: poly, joinType: Clippy.JoinType.Round, endType: Clippy.EndType.ClosedPolygon }],
		delta: Math.round(delta * CLIPPER_SCALE),
	});
	if (!poly) {
		console.error('Clippy offset failed');
		return '';
	}

	// Clean polygons and deintify
	poly = clipp.cleanPolygons(poly, Math.round(CLIPPER_SCALE * CLIPPER_CLEAN));
	poly = clipp.simplifyPolygons(poly, Clippy.PolyFillType.EvenOdd);
	poly = deintify(poly);

	// Convert the polygons back to path data
	return polysToPathD(poly);
}