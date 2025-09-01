<script lang="ts">
	import { textWidth, LOGO_DOMAIN, GENERATOR_DELAY_MS } from '$lib/workbench/logo/utils';
	import { generateSvgTextFlat } from '$lib/workbench/logo/export/svg';
	import { generateSvgForKiCad } from '$lib/workbench/logo/export/kicad';

	import type { ClassValue } from 'svelte/elements';

	import Collapse from '$lib/components/Collapse.svelte';
	import NumberInput from '$lib/workbench/logo/editor/NumberInput.svelte';
	import ColorInput from '$lib/workbench/logo/editor/ColorInput.svelte';
	import Checkbox from '$lib/workbench/logo/editor/Checkbox.svelte';
	import SVG from '$lib/workbench/logo/components/SVG.svelte';
	import Rect from '$lib/workbench/logo/components/Rect4.svelte';
	import Text from '$lib/workbench/logo/components/Text2.svelte';
	import InputGroup from '$lib/workbench/logo/editor/InputGroup.svelte';

	import { Loader } from '@lucide/svelte';
	import { untrack, type Snippet } from 'svelte';
	import Shape from '../components/Shape.svelte';
	import { modulesToFeaturedItems } from '$lib/data/item';

	interface Props {
		uid: string;
		projectName: string;
		class?: ClassValue;
		props?: Record<string, any>;
	}

	const { uid, projectName, class: className = '', props = {} }: Props = $props();

	let showPreview = $state(false);

	/*
	const Hh = 120;
	const Hb = 120;
	const headerSize = 84;
	const bodySize = 84;

	const headerW = $derived(textWidth(LOGO_DOMAIN, headerSize));
	const projectW = $derived(textWidth(`/${projectName}`, bodySize));
	const contentW = $derived(Math.max(headerW, projectW));

	const innerW = $derived(contentW + PAD * 2);
	const W = $derived(innerW + PAD * 2);
	const H = $derived(Hh + Hb);

	const fill = $derived($svgBackground === 'none' ? TEXT : $svgBackground);

	const xHeader = $derived((contentW - headerW) / 2 + PAD * 2);
	const yHeader = $derived(Hh / 2);
	const xProject = $derived((contentW - projectW) / 2 + PAD * 2);
	const yProject = $derived(Hh + (Hb - STROKE) / 2);
	*/

	const Defaults = {
		// Common
		borderWidth: 30,
		radius: 40,
		paddingX: 0,
		borderColor: '#000000',
		dividerOffset: 0,
		// Top
		heightTop: 120,
		fontSizeTop: 84,
		offsetTopX: 0,
		offsetTopY: 0,
		textTop: '#ffffff',
		fillTop: '#00ff00',
		boldnessTop: 1,
		// Bottom
		heightBottom: 120,
		fontSizeBottom: 84,
		offsetBottomX: 0,
		offsetBottomY: 0,
		textBottom: '#000000',
		fillBottom: '#ff00ff',
		boldnessBottom: 0
	};

	// Common
	let borderWidth = $state(Defaults.borderWidth);
	let radius = $state(Defaults.radius);
	let paddingX = $state(Defaults.paddingX);
	let borderColor = $state(Defaults.borderColor);
	let dividerOffset = $state(Defaults.dividerOffset);
	// Top
	let heightTop = $state(Defaults.heightTop);
	let fontSizeTop = $state(Defaults.fontSizeTop);
	let offsetTopX = $state(Defaults.offsetTopX);
	let offsetTopY = $state(Defaults.offsetTopY);
	let textTop = $state(Defaults.textTop);
	let fillTop = $state(Defaults.fillTop);
	let boldnessTop = $state(Defaults.boldnessTop);
	// Bottom
	let heightBottom = $state(Defaults.heightBottom);
	let fontSizeBottom = $state(Defaults.fontSizeBottom);
	let offsetBottomX = $state(Defaults.offsetBottomX);
	let offsetBottomY = $state(Defaults.offsetBottomY);
	let textBottom = $state(Defaults.textBottom);
	let fillBottom = $state(Defaults.fillBottom);
	let boldnessBottom = $state(Defaults.boldnessBottom);

	const textWidthTop = $derived(textWidth(LOGO_DOMAIN, fontSizeTop));
	const textWidthBottom = $derived(textWidth(`/${projectName}`, fontSizeBottom));
	const textWidthMax = $derived(Math.max(textWidthTop, textWidthBottom));

	const W = $derived(textWidthMax + paddingX);
	const H = $derived(heightTop + heightBottom);
	const origin = $derived({ x: borderWidth / 2, y: borderWidth / 2 });

	// Recalculate variables in relation to each other
	const actualWidth = $derived(W - borderWidth);
	const actualHeight = $derived(H - borderWidth);
	const actualRadius = $derived(Math.max(0, Math.min(radius, actualHeight / 2)));

	const actualDividerOffset = $derived(Math.max(-heightTop + actualRadius, Math.min(heightBottom - actualRadius, dividerOffset)));
	const actualHeightTop = $derived(heightTop + actualDividerOffset - origin.y);
	const actualHeightBottom = $derived(heightBottom - actualDividerOffset - origin.y);



	const bold = (value: number) => ({ 'data-synthetic-bold': value !== 0 ? 'true' : 'false', 'data-bold-strength': value.toString() });

	const propsTextTop = $derived({
		text: LOGO_DOMAIN,
		// position
		x: W * 0.5 + offsetTopX,
		y: H * 0.25 + offsetTopY + origin.y / 2,
		// font
		fontSize: fontSizeTop,
		width: textWidthTop,
		fill: textTop,
		...bold(boldnessTop)
	});

	const propsTextBottom = $derived({
		text: `/${projectName}`,
		// position
		x: W * 0.5 + offsetBottomX,
		y: H * 0.75 + offsetBottomY - origin.y / 2,
		// font
		fontSize: fontSizeBottom,
		width: textWidthBottom,
		fill: textBottom,
		...bold(boldnessBottom)
	});

	// Save and restore the border width when toggling wether the border is enabled
	let prevBorderWidth = Defaults.borderWidth;
	function updateBorderColor(color: string | 'none') {
		untrack(() => {
			borderColor = color;
			if (borderColor === 'none') {
				prevBorderWidth = borderWidth;
				borderWidth = 0;
			} else {
				borderWidth = prevBorderWidth;
			}
		});
	}

	let svg: Promise<SVGSVGElement | undefined> = $state(Promise.resolve(undefined));
	let svgKicad: Promise<SVGSVGElement | undefined> = $state(Promise.resolve(undefined));

	let timeout: number;
	let timeout2: number;

	$effect(() => {
		borderWidth;
		radius;
		paddingX;
		borderColor;
		dividerOffset;
		heightTop;
		fontSizeTop;
		offsetTopX;
		offsetTopY;
		textTop;
		fillTop;
		boldnessTop;
		heightBottom;
		fontSizeBottom;
		offsetBottomX;
		offsetBottomY;
		textBottom;
		fillBottom;
		boldnessBottom;
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

	const DefaultsTop = {
		offsetWidth: 0,
		offsetHeight: 0,
		fontSize: 84,
		offsetX: 0,
		offsetY: 0,
		color: '#000000',
		fill: '#ff00ff',
		boldness: 0,
		// Corners
		topLeft: true,
		topRight: true
	};

	const DefaultsBottom = {
		offsetWidth: 0,
		offsetHeight: 0,
		fontSize: 84,
		offsetX: 0,
		offsetY: 0,
		color: '#000000',
		fill: '#ffff00',
		boldness: 0,
		// Corners
		bottomLeft: true,
		bottomRight: true
	};

	let settingsTop: Snippet<[string, (Boolean | undefined)?]> | undefined = $state();
	let settingsBottom: Snippet<[string, (Boolean | undefined)?]> | undefined = $state();
</script>

<div class="gap-x-8 md:flex">
	<div class="flex-1/5 rounded-lg border-2 border-primary-500 bg-white p-4 shadow-sm sm:p-6 dark:border-primary-700 dark:bg-gray-800">
		<div class="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">Parameters</div>

		<InputGroup label="Common">
			<NumberInput label="Padding (X)" bind:value={paddingX} default={Defaults.paddingX} max={500} />
			<NumberInput label="Radius" bind:value={radius} default={Defaults.radius} max={actualHeight / 2} />
			<NumberInput label="Border width" bind:value={borderWidth} default={Defaults.borderWidth} max={borderColor === 'none' ? 0 : actualHeight} />
			<NumberInput label="Vertical divider offset" bind:value={dividerOffset} default={Defaults.dividerOffset} min={-heightTop + actualRadius} max={heightBottom - actualRadius} />
			<ColorInput label="Border color" bind:value={() => borderColor, updateBorderColor} default={Defaults.borderColor} />
		</InputGroup>

		<InputGroup label="Top section" hidden>
			<NumberInput label="Height" bind:value={heightTop} default={Defaults.heightTop} min={10} max={500} />
			<NumberInput label="Font size" bind:value={fontSizeTop} default={Defaults.fontSizeTop} min={10} max={500} />
			<NumberInput label="Offset (X)" bind:value={offsetTopX} default={Defaults.offsetTopX} min={-100} />
			<NumberInput label="Offset (Y)" bind:value={offsetTopY} default={Defaults.offsetTopY} min={-100} />
			<NumberInput label="Boldness" bind:value={boldnessTop} default={Defaults.boldnessTop} max={20} step={0.01} />
			<ColorInput label="Fill color" bind:value={fillTop} default={Defaults.fillTop} />
			<ColorInput label="Text color" bind:value={textTop} default={Defaults.textTop} />
		</InputGroup>

		<InputGroup label="Bottom section" hidden>
			<NumberInput label="Height" bind:value={heightBottom} default={Defaults.heightBottom} min={10} max={500} />
			<NumberInput label="Font size" bind:value={fontSizeBottom} default={Defaults.fontSizeBottom} min={10} max={500} />
			<NumberInput label="Offset (X)" bind:value={offsetBottomX} default={Defaults.offsetBottomX} min={-100} />
			<NumberInput label="Offset (Y)" bind:value={offsetBottomY} default={Defaults.offsetBottomY} min={-100} />
			<NumberInput label="Boldness" bind:value={boldnessBottom} default={Defaults.boldnessBottom} min={0} max={20} step={0.01} />
			<ColorInput label="Fill color" bind:value={fillBottom} default={Defaults.fillBottom} />
			<ColorInput label="Text color" bind:value={textBottom} default={Defaults.textBottom} />
		</InputGroup>

		{@render settingsTop?.("Top section", false)}
		{@render settingsBottom?.("Bottom section", false)}

	</div>

	<div class="flex-1">
		<div class="flex gap-x-4">
			<div class="flex flex-col md:w-full">
				<h3 class="mb-2 font-semibold text-gray-900 dark:text-gray-100">Preview:</h3>
				<SVG {uid} width={W} height={H} class={className}>

					
					<!-- Top section fill 
					<Rect type="path" role="subject" {origin} width={actualWidth} height={actualHeightTop} radius={actualRadius} fill={fillTop} {borderWidth} topLeft topRight />
					<Text role="clip" {...propsTextTop} />-->

					<!-- Bottom section fill 
					<Rect type="path" role="ignore" {origin} width={actualWidth} height={actualHeightBottom} radius={actualRadius} fill={fillBottom} dy={actualHeightTop} bottomLeft bottomRight />
					<Text role="subject" {...propsTextBottom} />
					-->
					<Shape
						roleShape={'subject'}
						roleText={'clip'}
						{origin}
						width={actualWidth}
						height={actualHeightTop}
						radius={actualRadius}
						dx={0}
						dy={0}
						text={LOGO_DOMAIN}
						defaults={DefaultsTop}
						bind:settings={settingsTop}
					/>

					<Shape
						roleShape={'ignore'}
						roleText={'clip'}
						{origin}
						width={actualWidth}
						height={actualHeightBottom}
						radius={actualRadius}
						dx={0}
						dy={actualHeightTop}
						text={`/${projectName}`}
						defaults={DefaultsBottom}
						bind:settings={settingsBottom}
					/>

										<!-- Border -->
					<Rect type="path" role="frame" {origin} width={actualWidth} height={actualHeight} radius={actualRadius} {borderColor} {borderWidth} topLeft topRight bottomLeft bottomRight />
					

					<!-- Top text -->
					
					<!-- Bottom text -->
					
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
