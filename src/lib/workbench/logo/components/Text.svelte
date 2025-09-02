<script lang="ts">
	import type { SVG_Role } from '$lib/workbench/logo/utils';
	import { FONT_FAMILY, calculateTextWidth, charHeight } from '$lib/workbench/logo/utils';

	interface Props {
		role: SVG_Role;
		// positioning
		origin: { x: number; y: number };
		dx?: number;
		dy?: number;
		// text
		text: string;
		fontSize: number;
		color: string;
		// other
		props?: Record<string, any>;
	}

	const { role, origin, dx = 0, dy = 0, text, fontSize, color, ...props }: Props = $props();

	const textLength = $derived(calculateTextWidth(text, fontSize));
	const textX = $derived(dx - Math.round(textLength / 2));
	const textY = $derived(dy + Math.round(charHeight(fontSize) / 2));
</script>

<!-- prettier-ignore -->
<text 
	x={textX + origin.x} 
	y={textY + origin.y} 
	font-size={fontSize} 
	textLength={textLength} 
	lengthAdjust="spacingAndGlyphs" 
	font-family={FONT_FAMILY} 
	fill={color} 
	letter-spacing={1} 
	data-clippy-role={role} 
	{...props}
>
	{text}
</text>
