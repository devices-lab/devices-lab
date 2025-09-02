<script lang="ts">
	import { Triangle, SquareArrowUpLeft, SquareArrowUpRight, SquareArrowDownLeft, SquareArrowDownRight } from '@lucide/svelte';
	import ColorInput from './ColorInput.svelte';
	import InputGroup from './InputGroup.svelte';
	import NumberInput from './NumberInput.svelte';
	import type { BorderData } from '../components/Rect4.svelte';
	import { untrack } from 'svelte';
	import { clamp } from '$lib/utils';

	type Props = {
		border: BorderData;
		defaults: BorderData;
		heightTop: number;
		heightBottom: number;
		widthLeft: number;
		widthRight: number;
	};
	let { border = $bindable(), defaults, heightTop, heightBottom, widthLeft, widthRight }: Props = $props();

	const maxRadius = $derived(Math.min(heightTop, heightBottom, widthLeft, widthRight));
	const maxRadiusTopLeft = $derived(Math.min(heightTop, widthLeft));
	const maxRadiusTopRight = $derived(Math.min(heightTop, widthRight));
	const maxRadiusBottomLeft = $derived(Math.min(heightBottom, widthLeft));
	const maxRadiusBottomRight = $derived(Math.min(heightBottom, widthRight));

	const maxBorderWidth = $derived(border.color !== 'none' ? Math.min(heightTop + heightBottom, widthLeft + widthRight) : 0);

	// Save and restore the border width when toggling wether the border is enabled
	let prevBorderWidth = defaults.width;
	function updateBorderColor(color: string | 'none') {
		untrack(() => {
			if (color === 'none') {
				prevBorderWidth = border.width;
				border.width = 0;
			} else if (border.color === 'none') {
				border.width = prevBorderWidth;
			}
			border.color = color;
		});
	}

	// Clamp the border radius to the maximum radius
	$effect(() => {
		border.radius = clamp(border.radius, 0, maxRadius);
		border.dr.tl = clamp(border.dr.tl, -border.radius, maxRadiusTopLeft - border.radius);
		border.dr.tr = clamp(border.dr.tr, -border.radius, maxRadiusTopRight - border.radius);
		border.dr.bl = clamp(border.dr.bl, -border.radius, maxRadiusBottomLeft - border.radius);
		border.dr.br = clamp(border.dr.br, -border.radius, maxRadiusBottomRight - border.radius);
	});
</script>

<!-- prettier-ignore -->
<InputGroup label="Border">
	<NumberInput 	label="Width" 									bind:value={border.width} 		initial={defaults.width} 	min={0} 				max={maxBorderWidth} />
	<NumberInput 	label="Radius" 									bind:value={border.radius} 		initial={defaults.radius} 	min={0} 				max={maxRadius} />
	<NumberInput 	label={{label: "Radius", pre: Triangle, post: SquareArrowUpLeft, postClass: 'size-4.5 ms-1 text-primary-600'}} 	
																	bind:value={border.dr.tl} 		initial={defaults.dr.tl} 	min={-border.radius} 	max={maxRadiusTopLeft - border.radius} />
	<NumberInput 	label={{label: "Radius", pre: Triangle, post: SquareArrowUpRight, postClass: 'size-4.5 ms-1 text-primary-600'}} 	
																	bind:value={border.dr.tr} 		initial={defaults.dr.tr} 	min={-border.radius} 	max={maxRadiusTopRight - border.radius} />
	<NumberInput 	label={{label: "Radius", pre: Triangle, post: SquareArrowDownLeft, postClass: 'size-4.5 ms-1 text-primary-600'}} 	
																	bind:value={border.dr.bl} 		initial={defaults.dr.bl} 	min={-border.radius} 	max={maxRadiusBottomLeft - border.radius} />
	<NumberInput 	label={{label: "Radius", pre: Triangle, post: SquareArrowDownRight, postClass: 'size-4.5 ms-1 text-primary-600'}} 	
																	bind:value={border.dr.br} 		initial={defaults.dr.br} 	min={-border.radius} 	max={maxRadiusBottomRight - border.radius} />
	<ColorInput 	label="Color" 									bind:value={() => border.color, updateBorderColor} initial={defaults.color} />
</InputGroup>
