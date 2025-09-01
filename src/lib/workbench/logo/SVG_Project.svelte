<script lang="ts">
	
	import { LOGO_DOMAIN, GENERATOR_DELAY_MS } from '$lib/workbench/logo/utils';
	import { generateSvgTextFlat } from '$lib/workbench/logo/export/svg';
	import { generateSvgForKiCad } from '$lib/workbench/logo/export/kicad';

	import { Loader } from '@lucide/svelte';
	import { untrack, type Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	import NumberInput, { type InputType } from '$lib/workbench/logo/editor/NumberInput.svelte';
	import ColorInput from '$lib/workbench/logo/editor/ColorInput.svelte';
	import Checkbox from '$lib/workbench/logo/editor/Checkbox.svelte';
	import SVG from '$lib/workbench/logo/components/SVG.svelte';
	import Rect from '$lib/workbench/logo/components/Rect4.svelte';
	import InputGroup from '$lib/workbench/logo/editor/InputGroup.svelte';


	import Shape, { type ShapeSettings } from './components/Shape.svelte';
	
	interface Props {
		uid: string;
		projectName: string;
		class?: ClassValue;
		props?: Record<string, any>;
	}

	const clamp = (v: number, lo = -Infinity, hi = Infinity) => Math.min(hi, Math.max(lo, v));

	const { uid, projectName, class: className = '', props = {} }: Props = $props();

	let showPreview = $state(true);

	const Defaults = {
		heightTop: 120,
		heightBottom: 120,
		borderWidth: 10,
		radius: 40,
		paddingX: 0,
		borderColor: '#000000',
		dividerOffset: 0
	};

	// Common
	let heightTop = $state(Defaults.heightTop);
	let heightBottom = $state(Defaults.heightBottom);
	let borderWidth = $state(Defaults.borderWidth);
	let radius = $state(Defaults.radius);
	let paddingX = $state(Defaults.paddingX);
	let borderColor = $state(Defaults.borderColor);

	// Bound
	let textWidthTop = $state(0);
	let textWidthBottom = $state(0);

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

	let svg: Promise<SVGSVGElement | undefined> = $state(Promise.resolve(undefined));
	let svgKicad: Promise<SVGSVGElement | undefined> = $state(Promise.resolve(undefined));

	let timeout: number;
	let timeout2: number;



	$effect(() => {
		width;
		height;
		borderWidth;
		radius;
		paddingX;
		borderColor;

		projectName;

		if (showPreview) {
			svg = new Promise(() => {}); // Keep promise pending

			clearTimeout(timeout);
			timeout = setTimeout(() => {
				svg = generateSvgTextFlat(uid);
			}, GENERATOR_DELAY_MS);

			svgKicad = new Promise(() => {}); // Keep promise pending

			clearTimeout(timeout2);
			timeout2 = setTimeout(() => {
				svgKicad = generateSvgForKiCad(uid);
			}, GENERATOR_DELAY_MS);
		}
	});

	const DefaultsTop: ShapeSettings = {
	
		fontSize: 84,
		color: '#000000',
		fill: '#ff00ff',
		boldness: 1,
		rounded: {
			topLeft: true,
			topRight: true
		}
	};

	const DefaultsBottom: ShapeSettings = {
		fontSize: 84,
		color: '#000000',
		fill: '#ffff00',
		rounded: {
			bottomLeft: true,
			bottomRight: true
		}
	};

	let settingsTop: Snippet<[string, (Boolean | undefined)?]> | undefined = $state();
	let settingsBottom: Snippet<[string, (Boolean | undefined)?]> | undefined = $state();

	// prettier-ignore
	const Params: Record<string, InputType> = $derived({
		heightTop: 		{ initial: Defaults.heightTop, 		min: 0, 		max: 1000 },
		heightBottom: 	{ initial: Defaults.heightBottom, 	min: 0, 		max: 1000 },
		paddingX: 		{ initial: Defaults.paddingX, 		min: 0, 		max: 500 },
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

<div class="gap-x-8 md:flex">
	<div class="flex-1/5 rounded-lg border-2 border-primary-500 bg-white p-4 shadow-sm sm:p-6 dark:border-primary-700 dark:bg-gray-800">
		<div class="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">Parameters</div>

		<!-- prettier-ignore -->
		<InputGroup label="Common">
			<NumberInput label="Height Top" 	bind:value={heightTop}		params={Params.heightTop} />
			<NumberInput label="Height Bottom" 	bind:value={heightBottom} 	params={Params.heightBottom} />
			<NumberInput label="Padding (X)" 	bind:value={paddingX} 		params={Params.paddingX} />
			<NumberInput label="Radius" 		bind:value={radius} 		params={Params.radius} />
			<NumberInput label="Border width" 	bind:value={borderWidth} 	params={Params.borderWidth} />
			<ColorInput label="Border color" 	bind:value={() => borderColor, updateBorderColor} initial={Defaults.borderColor} />
		</InputGroup>

		{@render settingsTop?.('Top section', false)}
		{@render settingsBottom?.('Bottom section', false)}
	</div>

	<div class="flex-1">
		<div class="flex gap-x-4">
			<div class="flex flex-col md:w-full">
				<h3 class="mb-2 font-semibold text-gray-900 dark:text-gray-100">Preview:</h3>
				<SVG {uid} width={width + borderWidth} height={height + borderWidth} class={className}>
					<!-- Top section -->
					<Shape roleShape={'subject'} roleText={'clip'} {origin} {width} height={heightTop} {radius} dx={0} dy={0} text={LOGO_DOMAIN} settings={DefaultsTop} bind:config={settingsTop} bind:textWidth={textWidthTop} />
					<!-- Bottom section -->
					<Shape roleShape={'ignore'} roleText={'clip'} {origin} {width} height={heightBottom} {radius} dx={0} dy={heightTop} text={`/${projectName}`} settings={DefaultsBottom} bind:config={settingsBottom} bind:textWidth={textWidthBottom} />
					<!-- Border -->
					<Rect type="path" role="frame" {origin} {width} {height} {radius} {borderColor} {borderWidth} topLeft topRight bottomLeft bottomRight />
				</SVG>
			</div>
		</div>

		<Checkbox bind:checked={showPreview} class=" my-6 rounded-lg bg-gray-100 p-2">
			<span class="text-sm font-medium text-primary-600 dark:text-primary-100">Render SVG?</span>
		</Checkbox>

		{#snippet SVGPreview(svg: Promise<SVGSVGElement | undefined>, title: string)}
			<div class="mt-4 flex flex-col">
				<h3 class="mt-6 mb-2 font-semibold text-gray-900 md:mt-0 dark:text-gray-100">{title}:</h3>
				<div class="flex size-full items-center justify-center">
					{#await svg}
						<Loader class="size-10 animate-spin text-blue-500" />
					{:then value}
						{@html value?.outerHTML ?? '<p class="text-gray-500 italic">No SVG generated</p>'}
					{:catch error}
						<p class="text-red-500 italic">Something went wrong: {error.message}</p>
					{/await}
				</div>
			</div>
		{/snippet}

		{#if showPreview}
			<div class="h-full gap-4">
				{@render SVGPreview(svg, 'Flat SVG')}
				{@render SVGPreview(svgKicad, 'KiCad')}
			</div>
		{/if}
	</div>
</div>
