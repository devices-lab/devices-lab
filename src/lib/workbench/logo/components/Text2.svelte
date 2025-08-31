<script lang="ts">
	import type { SVG_Role } from "$lib/workbench/logo/utils";
	import { FONT_FAMILY, charHeight } from '$lib/workbench/logo/utils';

	interface Props {
		x: number;
		y: number;
		text: string;
		fontSize: number;
		fill: string;
		width: number;
		role: SVG_Role;

		[key: string]: any;
	}

	const { role, x, y, text, fontSize, fill, width, ...props }: Props = $props();

	const textX = $derived(x - Math.round(width / 2));
	const textY = $derived(y + Math.round(charHeight(fontSize) / 2));
</script>

<text x={textX} y={textY} font-size={fontSize} textLength={width} lengthAdjust="spacingAndGlyphs" font-family={FONT_FAMILY} {fill} letter-spacing={1} data-clippy-role={role} {...props}>
	{text}
</text>
