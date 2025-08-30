<script lang="ts">
	interface Props {
		x?: number;
		y?: number;
		width: number;
		height: number;
		radius: number;
		fill: string;
		stroke: string;
		strokeWidth: number;

		topLeft?: boolean;
		topRight?: boolean;
		bottomLeft?: boolean;
		bottomRight?: boolean;

		type: 'rect' | 'path';
		correct?: boolean;
		[key: string]: any;
	}

	const { type, x = 0, y = 0, width, height, radius, fill, stroke, strokeWidth, topLeft = false, topRight = false, bottomLeft = false, bottomRight = false, correct = true, ...restProps }: Props = $props();

	const actualX = $derived(x + ((correct ? strokeWidth / 2 : 0)));
	const actualY = $derived(y + ((correct ? strokeWidth / 2 : 0)));
	const actualWidth = $derived(width - ((correct ? strokeWidth : 0)));
	const actualHeight = $derived(height - ((correct ? strokeWidth : 0)));

	const path = $derived.by(() => {
		const x0 = actualX;
		const y0 = actualY;
		const x1 = x0 + actualWidth;
		const y1 = y0 + actualHeight;
		const r = radius;

		const rTL = topLeft ? r : 0;
		const rTR = topRight ? r : 0;
		const rBR = bottomRight ? r : 0;
		const rBL = bottomLeft ? r : 0;

		const arc = (dx: number, dy: number) => `a${r},${r} 0 0 1 ${dx},${dy}`;

		const cmds = [
			`M${x0},${y0 + rTL}`, // move to left edge (down by r if TL rounded)
			...(rTL ? [arc(r, -r)] : []), // top-left corner
			`H${x1 - rTR}`, // top edge
			...(rTR ? [arc(r, r)] : []), // top-right corner
			`V${y1 - rBR}`, // right edge
			...(rBR ? [arc(-r, r)] : []), // bottom-right corner
			`H${x0 + rBL}`, // bottom edge
			...(rBL ? [arc(-r, -r)] : []), // bottom-left corner
			'Z'
		];

		return cmds.join(' ');
	});
</script>

{#if type === 'path'}
	<path d={path} {fill} {stroke} stroke-width={strokeWidth} {...restProps} />
{:else}
	<rect x={actualX} y={actualY} width={actualWidth} height={actualHeight} rx={radius} {fill} {stroke} stroke-width={strokeWidth} {...restProps} />
{/if}
