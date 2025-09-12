<script lang="ts">
	import type { SVG_Role } from '$lib/workbench/logo/utils';
	import type { BorderData } from '$lib/workbench/logo/editor/BorderConfig.svelte';

	interface Props {
		role: SVG_Role;
		// positioning
		origin: { x: number; y: number };
		dx?: number;
		dy?: number;
		// dimensions
		width: number;
		height: number;
		// style
		border?: BorderData;
		fill?: string;
		// other
		props?: Record<string, any>;
	}

	const { role, origin, dx = 0, dy = 0, width, height, fill = 'none', border, ...props }: Props = $props();

	const actualOrigin: { x: number; y: number } = $derived({ x: origin.x + dx, y: origin.y + dy });
	const actualFill: string = $derived(role === 'frame' ? 'none' : fill);

	/*const path = $derived.by(() => {
		const x0 = actualOrigin.x;
		const y0 = actualOrigin.y;
		const xw = x0 + width;
		const yh = y0 + height;
		const r = border.radius;

		//const rTL = topLeft ? r : 0;
		//const rTR = topRight ? r : 0;
		//const rBR = bottomRight ? r : 0;
		//const rBL = bottomLeft ? r : 0;

		const rTL = border.radius + border.dr.tl;
		const rTR = border.radius + border.dr.tr;
		const rBR = border.radius + border.dr.br;
		const rBL = border.radius + border.dr.bl;

		//const arc = (dx: number, dy: number) => `a${r},${r} 0 0 1 ${dx},${dy}`;
		//const arc = (dx: number, dy: number) => `A ${r} ${r} 0 0 1 ${dx} ${dy}`;

		
		//const cmds = [
		//	`M${x0},${y + rTL}`, // move to left edge (down by r if TL rounded)
		//	...(rTL ? [arc(r, -r)] : []), // top-left corner
		//	`H${xw - rTR}`, // top edge
		//	...(rTR ? [arc(r, r)] : []), // top-right corner
		//	`V${yh - rBR}`, // right edge
		//	...(rBR ? [arc(-r, r)] : []), // bottom-right corner
		//	`H${x0 + rBL}`, // bottom edge
		//	...(rBL ? [arc(-r, -r)] : []), // bottom-left corner
		//	'Z'
		//];
		//return cmds.join(' ');

		//return [
		//	`M ${x0 + rTL} ${y}`,
		//	`H ${xw - rTR}`,
		//	...(rTR ? [arc(xw, y + r)] : []), // top-right corner
		//	`V ${yh - rBR}`,
		//	...(rBR ? [arc(xw - r, yh)] : []), // bottom-right corner
		//	`H ${x0 + rBL}`,
		//	...(rBL ? [arc(x0, yh - r)] : []), // bottom-left corner
		//	`V ${y + rTL}`,
		//	...(rTL ? [arc(x0 + r, y)] : []), // top-left corner
		//	`Z`
		//].join(' ');
		

		const KAPPA = 0.5522847498307936;

		const cx = r * KAPPA;
		const cy = r * KAPPA;
		const rx = r;
		const ry = r;

		// prettier-ignore
		return [
			`M ${x0 + rTL} ${y0}`, 
			`H ${xw - rTR}`, 
			rTR ? `C ${xw - rx + cx} ${y0} ${xw} ${y0 + ry - cy} ${xw} ${y0 + ry}` : ``, 
			`V ${yh - rBR}`, 
			rBR ? `C ${xw} ${yh - ry + cy} ${xw - rx + cx} ${yh} ${xw - rx} ${yh}` : ``, 
			`H ${x0 + rBL}`, 
			rBL ? `C ${x0 + rx - cx} ${yh} ${x0} ${yh - ry + cy} ${x0} ${yh - ry}` : ``, 
			`V ${y0 + rTL}`, 
			rTL ? `C ${x0} ${y0 + ry - cy} ${x0 + rx - cx} ${y0} ${x0 + rx} ${y0}` : ``, 
			`Z`
		].join(' ');
	});*/

	const path = $derived.by(() => {
		const x0 = actualOrigin.x;
		const y0 = actualOrigin.y;
		const xw = x0 + width;
		const yh = y0 + height;

		const rTL = border && border.topL.use ? border.radius + border.topL.dRadius : 0;
		const rTR = border && border.topR.use ? border.radius + border.topR.dRadius : 0;
		const rBR = border && border.bottomR.use ? border.radius + border.bottomR.dRadius : 0;
		const rBL = border && border.bottomL.use ? border.radius + border.bottomL.dRadius : 0;

		const KAPPA = 0.5522847498307936;

		// Calculate control point offsets for each corner
		const cxTL = rTL * KAPPA;
		const cyTL = rTL * KAPPA;
		const cxTR = rTR * KAPPA;
		const cyTR = rTR * KAPPA;
		const cxBR = rBR * KAPPA;
		const cyBR = rBR * KAPPA;
		const cxBL = rBL * KAPPA;
		const cyBL = rBL * KAPPA;

		// prettier-ignore
		return [
			`M ${x0 + rTL} ${y0}`, 
			`H ${xw - rTR}`, 
			rTR ? `C ${xw - rTR + cxTR} ${y0} ${xw} ${y0 + rTR - cyTR} ${xw} ${y0 + rTR}` : ``, 
			`V ${yh - rBR}`, 
			rBR ? `C ${xw} ${yh - rBR + cyBR} ${xw - rBR + cxBR} ${yh} ${xw - rBR} ${yh}` : ``, 
			`H ${x0 + rBL}`, 
			rBL ? `C ${x0 + rBL - cxBL} ${yh} ${x0} ${yh - rBL + cyBL} ${x0} ${yh - rBL}` : ``, 
			`V ${y0 + rTL}`, 
			rTL ? `C ${x0} ${y0 + rTL - cyTL} ${x0 + rTL - cxTL} ${y0} ${x0 + rTL} ${y0}` : ``, 
			`Z`
		].join(' ');
	});
</script>

<!-- prettier-ignore -->
<path 
	d={path} 
	fill={actualFill} 
	stroke={border?.color || 'none'} 
	stroke-width={border?.width || 0} 
	data-clippy-role={role} 
	{...props}
/>
