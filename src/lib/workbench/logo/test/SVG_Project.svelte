<script lang="ts">
	import { LOGO_DOMAIN, GENERATOR_DELAY_MS } from '$lib/workbench/logo/utils';
	import { generateSvgTextFlat } from '$lib/workbench/logo/export/svg';
	import { generateSvgForKiCad } from '$lib/workbench/logo/export/kicad';

	import { Loader } from '@lucide/svelte';
	import { untrack, type Component, type Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	import NumberInput, { type InputType } from '$lib/workbench/logo/inputs/NumberInput.svelte';
	import ColorInput from '$lib/workbench/logo/inputs/ColorInput.svelte';
	import Checkbox from '$lib/workbench/logo/inputs/Checkbox.svelte';
	import SVG from '$lib/workbench/logo/components/SVG.svelte';
	import Rect from '$lib/workbench/logo/components/Rect.svelte';
	import InputGroup from '$lib/workbench/logo/inputs/InputGroup.svelte';

	import Preview from './Preview.svelte';

	import Shape, { type ShapeSettings } from './components/Shape.svelte';
	import { clamp } from '$lib/utils';

	interface Props {
		uid: string;
		projectName: string;
		class?: ClassValue;
		props?: Record<string, any>;
	}

	const { uid, projectName, class: className = '', props = {} }: Props = $props();

	const Defaults = {
		heightTop: 120,
		heightBottom: 120,
		borderWidth: 10,
		radius: 40,
		paddingX: 80,
		borderColor: '#000000',
		dividerOffset: 0
	};

	const DefaultsTop: ShapeSettings = {
		fontSize: 84,
		color: '#ffffff',
		fill: '#000000',
		boldness: 1,
		rounded: {
			topLeft: true,
			topRight: true
		}
	};

	const DefaultsBottom: ShapeSettings = {
		fontSize: 84,
		color: '#000000',
		fill: '#ffffff',
		rounded: {
			bottomLeft: true,
			bottomRight: true
		}
	};

	// Common
	let heightTop = $state(Defaults.heightTop);
	let heightBottom = $state(Defaults.heightBottom);
	let borderWidth = $state(Defaults.borderWidth);
	let radius = $state(Defaults.radius);
	let paddingX = $state(Defaults.paddingX);
	let borderColor = $state(Defaults.borderColor);

	// Bound
	let textWidthTop = $state(800);
	let textWidthBottom = $state(800);

	const origin = $derived({ x: borderWidth / 2, y: borderWidth / 2 });
	const height = $derived(heightTop + heightBottom);
	const width = $derived(Math.max(textWidthTop, textWidthBottom) + paddingX);

	// Calculated
	const hasBorder = $derived(borderColor !== 'none');

	// Save and restore the border width when toggling wether the border is enabled
	let prevBorderWidth = Defaults.borderWidth;
	function updateBorderColor(color: string | 'none') {
		untrack(() => {
			if (color === 'none') {
				prevBorderWidth = borderWidth;
				borderWidth = 0;
			} else if (borderColor === 'none') {
				borderWidth = prevBorderWidth;
			}
			borderColor = color;
		});
	}

	let preview: Preview | undefined = $state();
	let settingsTop: Shape | undefined = $state();
	let settingsBottom: Shape | undefined = $state();

	$effect(() => {
		width;
		height;
		borderWidth;
		radius;
		paddingX;
		borderColor;
		projectName;

		updatePreview();
	});

	function updatePreview() {
		preview?.updatePreview();
	}

	// prettier-ignore
	const Params: Record<string, InputType> = $derived({
		heightTop: 		{ initial: Defaults.heightTop, 		min: 0, 		max: 1000 },
		heightBottom: 	{ initial: Defaults.heightBottom, 	min: 0, 		max: 1000 },
		paddingX: 		{ initial: Defaults.paddingX, 		min: 0, 		max: 1000 },
		radius: 		{ initial: Defaults.radius, 		min: 0, 		max: Math.min(height / 2, (width / 2) || height, heightTop, heightBottom),
			onchange: () => (radius = clamp(radius, Params.radius.min, Params.radius.max))
		},
		borderWidth: 	{ initial: Defaults.borderWidth, 	min: 0, 		max: hasBorder ? height : 0 },
	});

	$effect(() => {
		Object.entries(Params).forEach(([key, { onchange }]) => {
			onchange?.();
		});
	});
</script>

<Preview {uid} bind:this={preview}>
	{#snippet config()}
		<!-- prettier-ignore -->
		<InputGroup label="Common">
			<NumberInput label="Height Top" 	bind:value={heightTop}		params={Params.heightTop} />
			<NumberInput label="Height Bottom" 	bind:value={heightBottom} 	params={Params.heightBottom} />
			<NumberInput label="Padding (X)" 	bind:value={paddingX} 		params={Params.paddingX} />
			<NumberInput label="Radius" 		bind:value={radius} 		params={Params.radius} />
			<NumberInput label="Border width" 	bind:value={borderWidth} 	params={Params.borderWidth} />
			<ColorInput label="Border color" 	bind:value={() => borderColor, updateBorderColor} initial={Defaults.borderColor} />
		</InputGroup>

		{@render settingsTop?.configView('Top section', false)}
		{@render settingsBottom?.configView('Bottom section', false)}
	{/snippet}

	<SVG {uid} width={width + borderWidth} height={height + borderWidth} class={className}>
		<!-- Top section -->
		<Shape roleShape={'subject'} roleText={'clip'} {origin} {width} height={heightTop} {radius} dx={0} dy={0} text={LOGO_DOMAIN} settings={DefaultsTop} bind:textWidth={textWidthTop} bind:this={settingsTop} onchange={updatePreview} />
		<!-- Bottom section -->
		<Shape roleShape={'ignore'} roleText={'clip'} {origin} {width} height={heightBottom} {radius} dx={0} dy={heightTop} text={`/${projectName}`} settings={DefaultsBottom} bind:textWidth={textWidthBottom} bind:this={settingsBottom} onchange={updatePreview} />
		<!-- Border -->
		<Rect type="path" role="frame" {origin} {width} {height} {radius} {borderColor} {borderWidth} topLeft topRight bottomLeft bottomRight />
	</SVG>
</Preview>
