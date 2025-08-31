import * as Clippy from "js-angusj-clipper";

const FLATTEN_TOLERANCE = 0.01;

// Assumes:
//   type Point = { x: number; y: number };
//   type Path  = Point[];
//   const FLATTEN_TOLERANCE = ...;
//   flattenCubic(p0,p1,p2,p3,tol,out: Path): void
//   flattenQuad(p0,p1,p2,tol,out: Path): void
export function parseAndFlattenPathClippy(d: string, tol = FLATTEN_TOLERANCE): Clippy.Paths {
	// Now supports: M,L,H,V,C,Q,A,Z (absolute & relative)
	const tokens = Array.from(
		d.matchAll(/[MmLlHhVvCcQqAaZz]|-?\d*\.?\d+(?:e[-+]?\d+)?/g)
	).map(m => m[0]);

	let i = 0, cmd = '', cx = 0, cy = 0, sx = 0, sy = 0;
	const polys: Clippy.Paths = [];
	let poly: Clippy.Path | null = null;

	const read = () => parseFloat(tokens[i++]);
	const isCmd = (t: string) => /^[a-zA-Z]$/.test(t);

	while (i < tokens.length) {
		const t = tokens[i++];
		if (isCmd(t)) cmd = t;
		else { i--; } // number encountered; reuse last cmd

		switch (cmd) {
			case 'M': case 'm': {
				const rel = cmd === 'm';
				cx = (rel ? cx : 0) + read();
				cy = (rel ? cy : 0) + read();
				sx = cx; sy = cy;
				poly = [{ x: cx, y: cy }];
				polys.push(poly);
				// Subsequent pairs are implicit LineTos
				while (i < tokens.length && !isCmd(tokens[i])) {
					cx = (rel ? cx : 0) + read();
					cy = (rel ? cy : 0) + read();
					poly!.push({ x: cx, y: cy });
				}
				break;
			}

			case 'L': case 'l': {
				const rel = cmd === 'l';
				while (i < tokens.length && !isCmd(tokens[i])) {
					cx = (rel ? cx : 0) + read();
					cy = (rel ? cy : 0) + read();
					poly ??= [{ x: cx, y: cy }]; // start if missing
					poly.push({ x: cx, y: cy });
				}
				break;
			}

			case 'H': case 'h': {
				const rel = cmd === 'h';
				while (i < tokens.length && !isCmd(tokens[i])) {
					cx = (rel ? cx : 0) + read();
					poly ??= [{ x: cx, y: cy }];
					poly.push({ x: cx, y: cy });
				}
				break;
			}

			case 'V': case 'v': {
				const rel = cmd === 'v';
				while (i < tokens.length && !isCmd(tokens[i])) {
					cy = (rel ? cy : 0) + read();
					poly ??= [{ x: cx, y: cy }];
					poly.push({ x: cx, y: cy });
				}
				break;
			}

			case 'Q': case 'q': {
				const rel = cmd === 'q';
				while (i < tokens.length && !isCmd(tokens[i])) {
					const x1 = (rel ? cx : 0) + read(), y1 = (rel ? cy : 0) + read();
					const x = (rel ? cx : 0) + read(), y = (rel ? cy : 0) + read();
					const p0 = { x: cx, y: cy }, p1 = { x: x1, y: y1 }, p2 = { x, y };
					const out: Clippy.Path = [];
					flattenQuad(p0, p1, p2, tol, out);
					poly ??= [{ x: cx, y: cy }];
					out.forEach(p => poly!.push(p));
					cx = x; cy = y;
				}
				break;
			}

			case 'C': case 'c': {
				const rel = cmd === 'c';
				while (i < tokens.length && !isCmd(tokens[i])) {
					const x1 = (rel ? cx : 0) + read(), y1 = (rel ? cy : 0) + read();
					const x2 = (rel ? cx : 0) + read(), y2 = (rel ? cy : 0) + read();
					const x = (rel ? cx : 0) + read(), y = (rel ? cy : 0) + read();
					const p0 = { x: cx, y: cy }, p1 = { x: x1, y: y1 }, p2 = { x: x2, y: y2 }, p3 = { x, y };
					const out: Clippy.Path = [];
					flattenCubic(p0, p1, p2, p3, tol, out);
					poly ??= [{ x: cx, y: cy }];
					out.forEach(p => poly!.push(p));
					cx = x; cy = y;
				}
				break;
			}

			case 'A': case 'a': {
				const rel = cmd === 'a';
				while (i < tokens.length && !isCmd(tokens[i])) {
					const rx = Math.abs(read());
					const ry = Math.abs(read());
					const phiDeg = read();
					const largeArcFlag = read() !== 0;
					const sweepFlag = read() !== 0;
					const x = (rel ? cx : 0) + read();
					const y = (rel ? cy : 0) + read();

					// Degenerate radii ⇒ line-to
					if (rx === 0 || ry === 0) {
						poly ??= [{ x: cx, y: cy }];
						poly.push({ x, y });
						cx = x; cy = y;
						continue;
					}

					// Convert to cubic Béziers and flatten each
					const segs = arcToCubicSegments(
						cx, cy, x, y, rx, ry, phiDeg, largeArcFlag, sweepFlag
					);

					poly ??= [{ x: cx, y: cy }];
					let p0 = { x: cx, y: cy };
					for (const s of segs) {
						const out: Clippy.Path = [];
						flattenCubic(p0, s.c1, s.c2, s.p, tol, out);
						out.forEach(pt => poly!.push(pt));
						p0 = s.p;
					}
					cx = x; cy = y;
				}
				break;
			}

			case 'Z': case 'z': {
				if (poly && (poly[poly.length - 1].x !== sx || poly[poly.length - 1].y !== sy)) {
					poly.push({ x: sx, y: sy });
				}
				poly = null;
				cx = sx; cy = sy;
				break;
			}

			default: {
				// Unsupported command (S/T, etc.) — skip remaining numbers for this run
				while (i < tokens.length && !isCmd(tokens[i])) i++;
			}
		}
	}

	// Close any ring that appears open
	polys.forEach(p => {
		if (p.length > 2) {
			const a = p[0], b = p[p.length - 1];
			if (a.x !== b.x || a.y !== b.y) p.push({ x: a.x, y: a.y });
		}
	});

	// Drop tiny rings
	return polys.filter(p => p.length >= 3);
}

/** Convert an SVG elliptical arc to cubic Bézier segments (≤90° each). */
function arcToCubicSegments(x1: number, y1: number, x2: number, y2: number, rx: number, ry: number, phiDeg: number, largeArc: boolean, sweep: boolean): Array<{ c1: { x: number, y: number }, c2: { x: number, y: number }, p: { x: number, y: number } }> {
	const phi = (phiDeg * Math.PI) / 180;
	const cosφ = Math.cos(phi), sinφ = Math.sin(phi);

	// Step 1: Transform to the arc coordinate system (per SVG spec)
	const dx = (x1 - x2) / 2;
	const dy = (y1 - y2) / 2;
	const x1p = cosφ * dx + sinφ * dy;
	const y1p = -sinφ * dx + cosφ * dy;

	// Step 2: Ensure radii are large enough
	const rxs = rx * rx, rys = ry * ry;
	const λ = (x1p * x1p) / rxs + (y1p * y1p) / rys;
	if (λ > 1) {
		const s = Math.sqrt(λ);
		rx *= s; ry *= s;
	}

	// Recompute squares after potential scaling
	const rx2 = rx * rx, ry2 = ry * ry;

	// Step 3: Center calculation in the transformed space
	const sign = (largeArc === sweep) ? -1 : 1;
	const num = rx2 * ry2 - rx2 * (y1p * y1p) - ry2 * (x1p * x1p);
	const den = rx2 * (y1p * y1p) + ry2 * (x1p * x1p);
	const k = Math.max(0, num / den); // guard small negatives from fp error
	const coef = sign * Math.sqrt(k);

	const cxp = coef * (rx * y1p) / ry;
	const cyp = coef * (-ry * x1p) / rx;

	// Step 4: Transform center back to absolute
	const cx = cosφ * cxp - sinφ * cyp + (x1 + x2) / 2;
	const cy = sinφ * cxp + cosφ * cyp + (y1 + y2) / 2;

	// Step 5: Angles
	const v1x = (x1p - cxp) / rx, v1y = (y1p - cyp) / ry;
	const v2x = (-x1p - cxp) / rx, v2y = (-y1p - cyp) / ry;

	const θ1 = vectorAngle(1, 0, v1x, v1y);
	let Δθ = vectorAngle(v1x, v1y, v2x, v2y);

	// Enforce sweep direction
	if (!sweep && Δθ > 0) Δθ -= 2 * Math.PI;
	if (sweep && Δθ < 0) Δθ += 2 * Math.PI;

	// Subdivide into ≤90° segments
	const segments: Array<{ c1: { x: number, y: number }, c2: { x: number, y: number }, p: { x: number, y: number } }> = [];
	const n = Math.max(1, Math.ceil(Math.abs(Δθ) / (Math.PI / 2)));
	const δ = Δθ / n;

	for (let i = 0; i < n; i++) {
		const θA = θ1 + i * δ;
		const θB = θA + δ;
		segments.push(arcUnitSegmentToCubic(cx, cy, rx, ry, cosφ, sinφ, θA, θB));
	}
	return segments;
}

// Angle between vectors (ux,uy) → (vx,vy), signed in [-π, π]
function vectorAngle(ux: number, uy: number, vx: number, vy: number): number {
	const dot = ux * vx + uy * vy;
	const det = ux * vy - uy * vx;
	return Math.atan2(det, dot);
}

/** Convert a single ellipse arc segment [θA, θB] to a cubic Bézier in absolute coords. */
function arcUnitSegmentToCubic(cx: number, cy: number, rx: number, ry: number, cosφ: number, sinφ: number, θA: number, θB: number) {
	// Circular-form control point factor
	const Δ = θB - θA;
	const t = (4 / 3) * Math.tan(Δ / 4);

	// Points on the unit circle for start/end
	const cosA = Math.cos(θA), sinA = Math.sin(θA);
	const cosB = Math.cos(θB), sinB = Math.sin(θB);

	// Unit circle → ellipse (scale) → rotate → translate
	const map = (x: number, y: number) => ({
		x: cx + (rx * (x * cosφ - y * sinφ)),
		y: cy + (ry * (x * sinφ + y * cosφ))
	});

	// Start/end points (already known globally, but we compute locally for control math)
	//const p0u = { x: cosA, y: sinA };
	const p3u = { x: cosB, y: sinB };

	// Unit control points before transform
	const p1u = { x: cosA - t * sinA, y: sinA + t * cosA };
	const p2u = { x: cosB + t * sinB, y: sinB - t * cosB };

	const c1 = map(p1u.x, p1u.y);
	const c2 = map(p2u.x, p2u.y);
	const p = map(p3u.x, p3u.y);

	return { c1, c2, p };
}







function distancePointToLine(p: Clippy.IntPoint, a: Clippy.IntPoint, b: Clippy.IntPoint): number {
	const dx = b.x - a.x, dy = b.y - a.y;
	if (dx === 0 && dy === 0) return Math.hypot(p.x - a.x, p.y - a.y);
	const t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy);
	const proj = { x: a.x + t * dx, y: a.y + t * dy };
	return Math.hypot(p.x - proj.x, p.y - proj.y);
}

function flattenQuad(p0: Clippy.IntPoint, p1: Clippy.IntPoint, p2: Clippy.IntPoint, tol: number, out: Clippy.Path) {
	const mid = (a: Clippy.IntPoint, b: Clippy.IntPoint) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
	const d = distancePointToLine(p1, p0, p2);
	if (d <= tol) {
		out.push(p2);
		return;
	}
	const p01 = mid(p0, p1), p12 = mid(p1, p2), p012 = mid(p01, p12);
	flattenQuad(p0, p01, p012, tol, out);
	flattenQuad(p012, p12, p2, tol, out);
}

function flattenCubic(p0: Clippy.IntPoint, p1: Clippy.IntPoint, p2: Clippy.IntPoint, p3: Clippy.IntPoint, tol: number, out: Clippy.Path) {
	// Use control points’ max distance to baseline as flatness test
	const d1 = distancePointToLine(p1, p0, p3);
	const d2 = distancePointToLine(p2, p0, p3);
	if (Math.max(d1, d2) <= tol) { out.push(p3); return; }
	// de Casteljau split at t = 0.5
	const m = (a: Clippy.IntPoint, b: Clippy.IntPoint) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
	const p01 = m(p0, p1), p12 = m(p1, p2), p23 = m(p2, p3);
	const p012 = m(p01, p12), p123 = m(p12, p23);
	const p0123 = m(p012, p123);
	flattenCubic(p0, p01, p012, p0123, tol, out);
	flattenCubic(p0123, p123, p23, p3, tol, out);
}
