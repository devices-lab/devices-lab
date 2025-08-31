<script lang="ts">
	import { textWidth, LOGO_DOMAIN, GENERATOR_DELAY_MS } from '$lib/workbench/logo/utils';
	import { generateSvgFlat } from '$lib/workbench/logo/export/svg';

	import type { ClassValue } from 'svelte/elements';

	import Collapse from '$lib/components/Collapse.svelte';
	import NumberInput from '$lib/workbench/logo/editor/NumberInput.svelte';
	import ColorInput from '$lib/workbench/logo/editor/ColorInput.svelte';
	import Checkbox from '$lib/workbench/logo/editor/Checkbox.svelte';
	import SVG from '$lib/workbench/logo/components/SVG.svelte';
	import Rect from '$lib/workbench/logo/components/Rect3.svelte';
	import Text from '$lib/workbench/logo/components/Text2.svelte';

	import { Loader } from '@lucide/svelte';

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
		strokeWidth: 10,
		radius: 40,
		widthOffset: 40,
		borderColor: '#000000',
		dividerOffset: 0,
		// Top
		heightTop: 120,
		fontSizeTop: 84,
		offsetTopX: 0,
		offsetTopY: 0,
		textTop: '#ffffff',
		fillTop: '#000000',
		boldnessTop: 0,
		// Bottom
		heightBottom: 120,
		fontSizeBottom: 84,
		offsetBottomX: 0,
		offsetBottomY: 0,
		textBottom: '#000000',
		fillBottom: '#ffffff',
		boldnessBottom: 0
	};

	// Common
	let strokeWidth = $state(Defaults.strokeWidth);
	let radius = $state(Defaults.radius);
	let widthOffset = $state(Defaults.widthOffset);
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

	const W = $derived(textWidthMax + widthOffset);
	const H = $derived(heightTop + heightBottom);

	const xTop = $derived(W / 2 + offsetTopX);
	const yTop = $derived(heightTop / 2 + offsetTopY);
	const xBottom = $derived(W * 0.5 + offsetBottomX);
	const yBottom = $derived(H * 0.75 + offsetBottomY);

	$effect(() => {
		dividerOffset = Math.max(-heightTop, Math.min(heightBottom, dividerOffset));
	});

	let svg: Promise<SVGSVGElement | undefined> = $state(Promise.resolve(undefined));

	let timeout: number;

	$effect(() => {
		strokeWidth;
		radius;
		widthOffset;
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
				svg = generateSvgFlat(uid);
			}, GENERATOR_DELAY_MS);
		}
	});

	/*
		<Text x={STROKE / 2 + PAD} y={STROKE / 2 + Hh / 2} fontSize={headerSize} text={LOGO_DOMAIN} fill={fill} data-synthetic-bold="true" data-bold-strength="1.0"  />
		<Text x={STROKE / 2 + PAD} y={STROKE / 2 + Hh + Hb / 2} fontSize={bodySize} text={`/${projectName}`} />
	*/
	// todo generate unique id for each subject
</script>

<div class="mb-6 rounded-lg border-2 border-primary-200 bg-white shadow-sm dark:border-primary-700 dark:bg-gray-800">
	<div class="px-4 py-5 sm:p-6">
		<div class="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">Parameters</div>

		<Collapse label="Common" class="underline underline-offset-2" hidden>
			<div class="grid gap-x-8 gap-y-2 md:grid-cols-2">
				<NumberInput label="Stroke width" bind:value={strokeWidth} default={Defaults.strokeWidth} max={200} />

				<NumberInput label="Radius" bind:value={radius} default={Defaults.radius} max={H / 2} />

				<NumberInput label="Padding (X)" bind:value={widthOffset} default={Defaults.widthOffset} min={0} max={500} />
				<ColorInput label="Border" bind:value={borderColor} default={Defaults.borderColor} />
				<NumberInput label="Vertical divider offset" bind:value={dividerOffset} default={Defaults.dividerOffset} min={-heightTop} max={heightBottom} />
			</div>
		</Collapse>

		<Collapse label="Top section" class="underline underline-offset-2" hidden>
			<div class="grid gap-x-8 gap-y-2 md:grid-cols-2">
				<NumberInput label="Height" bind:value={heightTop} default={Defaults.heightTop} min={10} max={500} />
				<ColorInput label="Fill color" bind:value={fillTop} default={Defaults.fillTop} />
				<NumberInput label="Font size" bind:value={fontSizeTop} default={Defaults.fontSizeTop} min={10} max={500} />
				<ColorInput label="Text color" bind:value={textTop} default={Defaults.textTop} />
				<NumberInput label="Offset (X)" bind:value={offsetTopX} default={Defaults.offsetTopX} min={-100} />
				<NumberInput label="Offset (Y)" bind:value={offsetTopY} default={Defaults.offsetTopY} min={-100} />
				<NumberInput label="Boldness" bind:value={boldnessTop} default={Defaults.boldnessTop} min={0} max={20} step={0.01} />
			</div>
		</Collapse>

		<Collapse label="Bottom section" class="underline underline-offset-2" hidden>
			<div class="grid gap-x-8 gap-y-2 md:grid-cols-2">
				<NumberInput label="Height" bind:value={heightBottom} default={Defaults.heightBottom} min={10} max={500} />
				<ColorInput label="Text color" bind:value={textBottom} default={Defaults.textBottom} />
				<NumberInput label="Font size" bind:value={fontSizeBottom} default={Defaults.fontSizeBottom} min={10} max={500} />
				<ColorInput label="Fill color" bind:value={fillBottom} default={Defaults.fillBottom} />
				<NumberInput label="Offset (X)" bind:value={offsetBottomX} default={Defaults.offsetBottomX} min={-100} />
				<NumberInput label="Offset (Y)" bind:value={offsetBottomY} default={Defaults.offsetBottomY} min={-100} />
				<NumberInput label="Boldness" bind:value={boldnessBottom} default={Defaults.boldnessBottom} min={0} max={20} step={0.01} />
			</div>
		</Collapse>
		<!--<InputGroup title="Common" inputs={topInputs} />
		<InputGroup title="Top Part" inputs={topInputs} />
		<InputGroup title="Bottom part" inputs={bottomInputs} />-->
	</div>
</div>

<Checkbox bind:checked={showPreview} class="my-6 rounded-lg bg-gray-100 p-2">
	<span class="font-medium text-primary-600 dark:text-primary-100">Render SVG?</span>
</Checkbox>

<div class="gap-x-4 md:flex md:max-h-60">
	<div class="flex flex-col {showPreview ? 'md:w-1/2' : 'md:w-full'}">
		<h3 class="mb-2 font-semibold text-gray-900 dark:text-gray-100">Preview:</h3>

		<SVG {uid} width={W} height={H} class={className}>
			<!-- Background 
			<Rect type="path" width={W} height={H} {radius} fill={backgroundColor} stroke={"none"} {strokeWidth} topLeft topRight bottomLeft bottomRight id="background" />-->
			<!-- Foreground fill -->
			<Rect type="path" width={W} height={heightTop + dividerOffset} {radius} fill={fillTop} stroke={'none'} {strokeWidth} topLeft topRight correctY={false} />

			<Rect type="path" y={heightTop + dividerOffset} width={W} height={H - (heightTop + dividerOffset)} {radius} fill={fillBottom} stroke={'none'} {strokeWidth} bottomLeft bottomRight correctY={false} />
			<!-- Border -->
			<Rect type="path" width={W} height={H} {radius} fill={'none'} stroke={borderColor} {strokeWidth} topLeft topRight bottomLeft bottomRight id="subject" />

			<Text x={xTop} y={yTop} fontSize={fontSizeTop} text={LOGO_DOMAIN} width={textWidthTop} fill={textTop} data-synthetic-bold={boldnessTop !== 0 ? 'true' : 'false'} data-bold-strength={boldnessTop} {...props} />
			<Text x={xBottom} y={yBottom} fontSize={fontSizeBottom} text={`/${projectName}`} width={textWidthBottom} fill={textBottom} data-synthetic-bold={boldnessBottom !== 0 ? 'true' : 'false'} data-bold-strength={boldnessBottom} />
		</SVG>
	</div>
	{#if showPreview}
		<div class="flex w-full flex-col md:w-1/2">
			<h3 class="mt-6 mb-2 font-semibold text-gray-900 md:mt-0 dark:text-gray-100">Rendered:</h3>
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
	{/if}
</div>
