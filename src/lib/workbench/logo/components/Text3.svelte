<script lang="ts">
	import type { SVG_Role } from "$lib/workbench/logo/utils";
	import { FONT_FAMILY, charHeight } from '$lib/workbench/logo/utils';

	interface Props {
		origin: { x: number; y: number };
		dx: number;
		dy: number;
		text: string;
		fontSize: number;
		color: string;
		width: number;
		role: SVG_Role;

		[key: string]: any;
	}

	const { origin, role, dx, dy, text, fontSize, color, width, ...props }: Props = $props();

	const textX = $derived(dx - Math.round(width / 2));
	const textY = $derived(dy + Math.round(charHeight(fontSize) / 2));
</script>

<text x={textX + origin.x} y={textY + origin.y} font-size={fontSize} textLength={width} lengthAdjust="spacingAndGlyphs" font-family={FONT_FAMILY} fill={color} letter-spacing={1} data-clippy-role={role} {...props}>
	{text}
</text>
