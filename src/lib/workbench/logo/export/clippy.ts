import * as Clippy from "js-angusj-clipper";

import { parseAndFlattenPathClippy } from '$lib/workbench/logo/export/flatten';

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



function xor(clipp: Clippy.ClipperLibWrapper, paths: Clippy.Paths[], type: Clippy.PolyFillType = Clippy.PolyFillType.EvenOdd): Clippy.Paths {
	return clipp.clipToPaths({
		clipType: Clippy.ClipType.Xor,
		subjectFillType: type,
		subjectInputs: paths.map(p => ({ data: p, closed: true })),
	});
}

function union(clipp: Clippy.ClipperLibWrapper, paths: Clippy.Paths[], type: Clippy.PolyFillType = Clippy.PolyFillType.EvenOdd): Clippy.Paths {
	return clipp.clipToPaths({
		clipType: Clippy.ClipType.Union,
		subjectFillType: type,
		subjectInputs: paths.map(p => ({ data: p, closed: true })),
	});
}

function offset(clipp: Clippy.ClipperLibWrapper, paths: Clippy.Paths, delta: number): Clippy.Paths {
	return clipp.offsetToPaths({
		offsetInputs: [{ data: paths, joinType: Clippy.JoinType.Round, endType: Clippy.EndType.ClosedPolygon }],
		delta: Math.round(delta * CLIPPER_SCALE),
	}) || [];
}




/**
 * Starts the path processing for a given SVG path string.
 * @param clipp The Clippy library instance.
 * @param path The SVG path string.
 * @returns The processed Clippy paths.
 */
function startPaths(clipp: Clippy.ClipperLibWrapper, path: string): Clippy.Paths {
	const paths: Clippy.Paths = parseAndFlattenPathClippy(path);
	return intify(paths);
}

/**
 * Ends the path processing and converts the Clippy paths back to an SVG path string.
 * @param clipp The Clippy library instance.
 * @param paths The processed Clippy paths.
 * @returns The SVG path string.
 */
function endPaths(clipp: Clippy.ClipperLibWrapper, paths: Clippy.Paths): string {
	let out = paths;
	//out = clipp.simplifyPolygons(paths, Clippy.PolyFillType.EvenOdd);
	out = clipp.cleanPolygons(out, Math.round(CLIPPER_SCALE * CLIPPER_CLEAN));
	out = deintify(out);
	return polysToPathD(out);
}




function processFramePath(clipp: Clippy.ClipperLibWrapper, frame: PathElement): Clippy.Paths {
	const strokeWidth = parseFloat(frame.element.getAttribute('stroke-width') || '2');

	const paths = startPaths(clipp, frame.path);
	const inner = offset(clipp, paths, (-(strokeWidth / 2)));
	const outer = offset(clipp, paths, ((strokeWidth / 2)));

	// Clip the paths
	return union(clipp, [inner, outer], Clippy.PolyFillType.EvenOdd);
}

function processFramePaths(clipp: Clippy.ClipperLibWrapper, frames: PathElement[]): Clippy.Paths {
	return frames.map(f => processFramePath(clipp, f)).flat();
}


function processPaths(clipp: Clippy.ClipperLibWrapper, paths: PathElement[]): Clippy.Paths {
	return paths.map(p => startPaths(clipp, p.path)).flat();
}




export interface PathElement {
	path: string;
	element: SVGPathElement | SVGRectElement;
}

export async function ClippyFlatten(subjects: PathElement[], clips: PathElement[], frames: PathElement[], scale: number = 1): Promise<string> {
	let paths: Clippy.Paths = [];

	//==== CLIPPER ====//

	// Create an instance of the library (usually only do this once in your app)
	const clipp: Clippy.ClipperLibWrapper = await Clippy.loadNativeClipperLibInstanceAsync(Clippy.NativeClipperLibRequestedFormat.WasmWithAsmJsFallback);

	// Cut the clips from the subjects
	const subjectPaths: Clippy.Paths = processPaths(clipp, subjects);
	const clipPaths: Clippy.Paths = processPaths(clipp, clips);
	paths = xor(clipp, [subjectPaths, clipPaths]);

	// Add the frames
	const framePaths: Clippy.Paths = processFramePaths(clipp, frames);
	paths = union(clipp, [paths, framePaths], Clippy.PolyFillType.Positive);

	// Scale the paths
	if (scale !== 1) {
		paths = clipp.scalePaths(paths, scale);
	}

	// Convert the paths back to string
	return endPaths(clipp, paths);
}


/**
 * Offsets an SVG path using the Clippy library.
 * @param d The SVG path data to offset.
 * @param delta The offset distance.
 * @param tolerance The tolerance for flattening the path.
 * @returns The offset SVG path data.
 */
export async function ClippyOffset(subject: string, delta: number): Promise<string> {
	//==== CLIPPER ====//

	// Create an instance of the library (usually only do this once in your app)
	const clipp: Clippy.ClipperLibWrapper = await Clippy.loadNativeClipperLibInstanceAsync(Clippy.NativeClipperLibRequestedFormat.WasmWithAsmJsFallback);

	// Parse and flatten the path
	let paths: Clippy.Paths = startPaths(clipp, subject);
	// Set the orientation of the polygons (holes)
	// paths = xor(clipp, [paths]);
	// Offset the oriented polygons
	paths = offset(clipp, paths, delta);

	// Convert the paths back to string
	return endPaths(clipp, paths);
}

