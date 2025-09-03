import * as Clippy from "js-angusj-clipper";
import { parseAndFlattenPathClippy } from '$lib/workbench/logo/export/flatten';

// https://github.com/xaviergonz/js-angusj-clipper/blob/master/docs/apiReference/shared/ClipperLibWrapper.md




const SVG_NS = 'http://www.w3.org/2000/svg';
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




// Find elements by role
function findElements(svgRoot: SVGSVGElement, role: string): PathElement[] {
	// Subjects can be either paths or rectangles
	const paths = svgRoot.querySelectorAll<SVGPathElement>(`path[data-clippy-role="${role}"]`);
	//const rects = svgRoot.querySelectorAll<SVGRectElement>(`rect[data-clippy-role="${role}"]`);
	//const circles = svgRoot.querySelectorAll<SVGCircleElement>(`circle[data-clippy-role="${role}"]`);
	const out = [
		...Array.from(paths).map(p => ({ element: p, path: p.getAttribute('d') || '' })),
		//...Array.from(rects).map(r => ({ element: r, path: rectToPathD(r) })),
		//...Array.from(circles).map(c => ({ element: c, path: circleOrEllipseToPathD(c) })),
	].filter(Boolean);

	if (!out.length) {
		console.warn(`No ${role} elements found`);
		return [];
	}
	return out;
}

// Flatten the provided SVG by converting strokes to paths.
export async function ClippyFlattenSVG(svgRoot: SVGSVGElement, scale: number = 1): Promise<SVGSVGElement | undefined> {
	const clips = findElements(svgRoot, 'clip');
	const frames = findElements(svgRoot, 'frame');
	const subjects = findElements(svgRoot, 'subject');

	// sanity check
	if (!subjects || subjects.length === 0) return;

	const path = await ClippyFlatten(subjects, clips, frames, 1);

	const newSvg = document.createElementNS(SVG_NS, 'svg');
	newSvg.setAttribute('viewBox', svgRoot.getAttribute('viewBox') || '0 0 100 100');
	newSvg.setAttribute('width', (parseFloat(svgRoot.getAttribute('width') || '100') * scale).toString());
	newSvg.setAttribute('height', (parseFloat(svgRoot.getAttribute('height') || '100') * scale).toString());
	//newSvg.setAttribute('class', svgRoot.getAttribute('class') || '');

	const pathEl = document.createElementNS(SVG_NS, 'path');
	pathEl.setAttribute('d', path);
	pathEl.setAttribute('fill', '#000000');
	pathEl.setAttribute('fill-rule', 'evenodd');

	newSvg.appendChild(pathEl);
	return newSvg;
}