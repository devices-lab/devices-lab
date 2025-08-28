<script lang="ts">
	import { STROKE, RADIUS, COLOR } from '$lib/tools/logo/utils';

	export interface Props {
		width: number;
		height: number;
		corners?: { topLeft?: boolean; topRight?: boolean; bottomLeft?: boolean; bottomRight?: boolean };
		radius?: number;
		fill?: string;
		stroke?: string;
		strokeWidth?: number;
	}

	const x = $derived(STROKE / 2);
	const y = $derived(STROKE / 2);

	const { width, height, corners, radius = RADIUS, fill = COLOR, stroke, strokeWidth }: Props = $props();

	const path = $derived.by(() => {
		const { topLeft, topRight, bottomLeft, bottomRight } = corners || {
			topLeft: true,
			topRight: true,
			bottomLeft: true,
			bottomRight: true
		};
		let path = `M${x}${topLeft ? `,${y + radius}` : `,${y}`}`;
		if (topLeft) path += ` a${radius},${radius} 0 0 1 ${radius},-${radius}`;
		path += ` H${x + width - (topRight ? radius : 0)}`;
		if (topRight) path += ` a${radius},${radius} 0 0 1 ${radius},${radius}`;
		path += ` V${y + height - (bottomRight ? radius : 0)}`;
		if (bottomRight) path += ` a${radius},${radius} 0 0 1 -${radius},${radius}`;
		path += ` H${x + (bottomLeft ? radius : 0)}`;
		if (bottomLeft) path += ` a${radius},${radius} 0 0 1 -${radius},-${radius}`;
		path += ` Z`;
		return path;
	});
</script>

<path d={path} {fill} {stroke} stroke-width={strokeWidth} />
