<script lang="ts">
	import { STROKE, COLOR, FONT_FAMILY, charHeight } from '$lib/tools/logo/utils';

	import { svgBaselineSupported } from '$lib/tools/logo/utils';

	interface Props {
		x: number;
		y: number;
		text: string;
		fontSize: number;
		[key: string]: any;
	}

	const { x, y, text, fontSize, ...props }: Props = $props();
</script>

<text {x} y={y + ($svgBaselineSupported ? 0 : charHeight(fontSize) / 2)} font-size={fontSize} font-family={FONT_FAMILY} fill={COLOR} dominant-baseline={$svgBaselineSupported ? 'central' : 'none'} letter-spacing={1} {...props}>
	{text}
</text>
