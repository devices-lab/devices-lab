<script lang="ts">
	import { STROKE, COLOR, FONT_FAMILY, charHeight, textWidth } from '$lib/workbench/logo/utils';

	import { svgBaselineSupported } from '$lib/workbench/logo/utils';

	interface Props {
		x: number;
		y: number;
		text: string;
		fontSize: number;
		fill: string;
		width: number;
		[key: string]: any;
	}

	const { x, y, text, fontSize, fill, width, ...props }: Props = $props();

	const textX = $derived(x - Math.round(width / 2));
	const textY = $derived(y + Math.round(charHeight(fontSize) / 2));
</script>

<text x={textX} y={textY} font-size={fontSize} textLength={width} lengthAdjust="spacingAndGlyphs" font-family={FONT_FAMILY} {fill} letter-spacing={1} {...props}>
	{text}
</text>
