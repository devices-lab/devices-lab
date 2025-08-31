<script lang="ts">
	import type { SVG_Role } from "$lib/workbench/logo/utils";

	interface Props {
		x?: number;
		y?: number;
		width: number;
		height: number;
		radius: number;
		fill?: string;
		borderColor?: string;
		borderWidth: number;

		topLeft?: boolean;
		topRight?: boolean;
		bottomLeft?: boolean;
		bottomRight?: boolean;

		type: 'rect' | 'path';
		role: SVG_Role;
		correctX?: boolean;
		correctY?: boolean;

		[key: string]: any;
	}

	const { type, role, x = 0, y = 0, width, height, radius, fill = 'none', borderColor = 'none', borderWidth, topLeft = false, topRight = false, bottomLeft = false, bottomRight = false, correctX = true, correctY = true, ...restProps }: Props = $props();

	const actualX = $derived(x + (correctX ? borderWidth / 2 : 0));
	const actualY = $derived(y + (correctY ? borderWidth / 2 : 0));
	const actualWidth = $derived(width - (correctX ? borderWidth : 0));
	const actualHeight = $derived(height - (correctY ? borderWidth : 0));

	const actualFill = $derived(role === 'frame' ? 'none' : fill);


	const path = $derived.by(() => {
		const x0 = actualX;
		const y0 = actualY;
		const xw = x0 + actualWidth;
		const yh = y0 + actualHeight;
		const r = radius;

		const rTL = topLeft ? r : 0;
		const rTR = topRight ? r : 0;
		const rBR = bottomRight ? r : 0;
		const rBL = bottomLeft ? r : 0;

		//const arc = (dx: number, dy: number) => `a${r},${r} 0 0 1 ${dx},${dy}`;
		//const arc = (dx: number, dy: number) => `A ${r} ${r} 0 0 1 ${dx} ${dy}`;

		/*
		const cmds = [
			`M${x0},${y0 + rTL}`, // move to left edge (down by r if TL rounded)
			...(rTL ? [arc(r, -r)] : []), // top-left corner
			`H${xw - rTR}`, // top edge
			...(rTR ? [arc(r, r)] : []), // top-right corner
			`V${yh - rBR}`, // right edge
			...(rBR ? [arc(-r, r)] : []), // bottom-right corner
			`H${x0 + rBL}`, // bottom edge
			...(rBL ? [arc(-r, -r)] : []), // bottom-left corner
			'Z'
		];
		return cmds.join(' ');
	*/

		/*return [
			`M ${x0 + rTL} ${y0}`,
			`H ${xw - rTR}`,
			...(rTR ? [arc(xw, y0 + r)] : []), // top-right corner
			`V ${yh - rBR}`,
			...(rBR ? [arc(xw - r, yh)] : []), // bottom-right corner
			`H ${x0 + rBL}`,
			...(rBL ? [arc(x0, yh - r)] : []), // bottom-left corner
			`V ${y0 + rTL}`,
			...(rTL ? [arc(x0 + r, y0)] : []), // top-left corner
			`Z`
		].join(' ');*/

		const KAPPA = 0.5522847498307936;

		
		const cx = r * KAPPA, cy = r * KAPPA, rx = r, ry = r;
		return [
			`M ${x0 + rTL} ${y0}`,
			`H ${xw - rTR}`,
			rTR? `C ${xw - rx + cx} ${y0} ${xw} ${y0 + ry - cy} ${xw} ${y0 + ry}` : ``,
			`V ${yh - rBR}`,
			rBR? `C ${xw} ${yh - ry + cy} ${xw - rx + cx} ${yh} ${xw - rx} ${yh}` : ``,
			`H ${x0 + rBL}`,
			rBL? `C ${x0 + rx - cx} ${yh} ${x0} ${yh - ry + cy} ${x0} ${yh - ry}` : ``,
			`V ${y0 + rTL}`,
			rTL? `C ${x0} ${y0 + ry - cy} ${x0 + rx - cx} ${y0} ${x0 + rx} ${y0}` : ``,
			`Z`
		].join(' ');
	
		
	});
</script>

{#if type === 'path'}
	<path d={path} fill={actualFill} stroke={borderColor} stroke-width={borderWidth} data-clippy-role={role} {...restProps} />
{:else}
	<rect x={actualX} y={actualY} width={actualWidth} height={actualHeight} rx={radius} fill={actualFill} stroke={borderColor} stroke-width={borderWidth} data-clippy-role={role} {...restProps} />
{/if}
