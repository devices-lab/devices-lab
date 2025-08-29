<script lang="ts">
	import { svgBackground, STROKE, RADIUS, COLOR } from '$lib/workbench/logo/utils';

	interface Props {
		width: number;
		height: number;
		[key: string]: any;
	}

	const { width, height, ...props }: Props = $props();
</script>

<rect id="subject" x={STROKE / 2} y={STROKE/2} width={width - STROKE} height={height - STROKE} rx={RADIUS} ry={RADIUS} fill={$svgBackground} stroke={COLOR} stroke-width={STROKE} {...props} />
