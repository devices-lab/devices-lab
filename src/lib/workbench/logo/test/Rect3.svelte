<script lang="ts">
	import type { SVG_Role } from '$lib/workbench/logo/utils';

	interface Props {
		x?: number;
		y?: number;
		width: number;
		height: number;
		radius?: number;
		fill?: string;
		borderColor?: string;
		borderWidth?: number;

		topLeft?: boolean;
		topRight?: boolean;
		bottomLeft?: boolean;
		bottomRight?: boolean;

		type: 'rect' | 'path';
		role: SVG_Role;

		[key: string]: any;
	}

	const { type, role, x = 0, y = 0, width, height, radius = 10, fill = 'none', borderColor = 'none', borderWidth = 2, topLeft = false, topRight = false, bottomLeft = false, bottomRight = false, ...restProps }: Props = $props();

	const commonProps = $derived({
		fill: role === 'frame' ? 'none' : fill,
		stroke: borderColor,
		'stroke-width': borderWidth,
		'data-clippy-role': role,
		...restProps
	});

	const path = $derived.by(() => {
		const xw = x + width;
		const yh = y + height;
		const r = radius;

		const rTL = topLeft ? r : 0;
		const rTR = topRight ? r : 0;
		const rBR = bottomRight ? r : 0;
		const rBL = bottomLeft ? r : 0;

		//const arc = (dx: number, dy: number) => `a${r},${r} 0 0 1 ${dx},${dy}`;
		//const arc = (dx: number, dy: number) => `A ${r} ${r} 0 0 1 ${dx} ${dy}`;

		/*
		const cmds = [
			`M${x},${y + rTL}`, // move to left edge (down by r if TL rounded)
			...(rTL ? [arc(r, -r)] : []), // top-left corner
			`H${xw - rTR}`, // top edge
			...(rTR ? [arc(r, r)] : []), // top-right corner
			`V${yh - rBR}`, // right edge
			...(rBR ? [arc(-r, r)] : []), // bottom-right corner
			`H${x + rBL}`, // bottom edge
			...(rBL ? [arc(-r, -r)] : []), // bottom-left corner
			'Z'
		];
		return cmds.join(' ');
		*/

		/*
		return [
			`M ${x + rTL} ${y}`,
			`H ${xw - rTR}`,
			...(rTR ? [arc(xw, y + r)] : []), // top-right corner
			`V ${yh - rBR}`,
			...(rBR ? [arc(xw - r, yh)] : []), // bottom-right corner
			`H ${x + rBL}`,
			...(rBL ? [arc(x, yh - r)] : []), // bottom-left corner
			`V ${y + rTL}`,
			...(rTL ? [arc(x + r, y)] : []), // top-left corner
			`Z`
		].join(' ');
		*/

		const KAPPA = 0.5522847498307936;

		const cx = r * KAPPA,
			cy = r * KAPPA,
			rx = r,
			ry = r;
		return [`M ${x + rTL} ${y}`, `H ${xw - rTR}`, rTR ? `C ${xw - rx + cx} ${y} ${xw} ${y + ry - cy} ${xw} ${y + ry}` : ``, `V ${yh - rBR}`, rBR ? `C ${xw} ${yh - ry + cy} ${xw - rx + cx} ${yh} ${xw - rx} ${yh}` : ``, `H ${x + rBL}`, rBL ? `C ${x + rx - cx} ${yh} ${x} ${yh - ry + cy} ${x} ${yh - ry}` : ``, `V ${y + rTL}`, rTL ? `C ${x} ${y + ry - cy} ${x + rx - cx} ${y} ${x + rx} ${y}` : ``, `Z`].join(' ');
	});
</script>

{#if type === 'path'}
	<path d={path} {...commonProps} />
{:else}
	<rect {x} {y} {width} {height} rx={radius} {...commonProps} />
{/if}
