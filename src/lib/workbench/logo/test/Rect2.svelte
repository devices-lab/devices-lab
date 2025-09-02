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
	}

	const { x = 0, y = 0, width, height, radius, fill, stroke, strokeWidth }: Props = $props();
</script>

<rect id="subject" x={x + strokeWidth / 2} y={y + strokeWidth / 2} width={width - strokeWidth} height={height - strokeWidth} rx={radius} ry={radius} {fill} {stroke} stroke-width={strokeWidth} />
