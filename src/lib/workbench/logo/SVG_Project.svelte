<script lang="ts">
	import { svgBackground, textWidth, STROKE, PAD, TEXT, LOGO_DOMAIN, RADIUS, COLOR } from '$lib/workbench/logo/utils';
	import SVG from '$lib/workbench/logo/components/SVG.svelte';
	import Rect from '$lib/workbench/logo/components/Rect3.svelte';
	import Text from '$lib/workbench/logo/components/Text2.svelte';

	import Collapse from '$lib/components/Collapse.svelte';

	import type { ClassValue } from 'svelte/elements';

	import Input from '$lib/workbench/logo/editor/NumberInput.svelte';
	import InputGroup from '$lib/workbench/logo/editor/InputGroup.svelte';
	import NumberInput from '$lib/workbench/logo/editor/NumberInput.svelte';
	import ColorInput from './editor/ColorInput.svelte';

	interface Props {
		uid: string;
		projectName: string;
		class?: ClassValue;
		props?: Record<string, any>;
	}

	const { uid, projectName, class: className = '', props = {} }: Props = $props();

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
		strokeWidth: 10,
		radius: 40,
		widthOffset: 40,
		backgroundColor: '#ffffff',
		foregroundColor: '#000000',
		borderColor: '#000000',
		textColorTop: '#ffffff',
		textColorBottom: '#000000',
		dividerOffset: 0,
		heightTop: 120,
		fontSizeTop: 84,
		offsetTopX: 0,
		offsetTopY: 0,
		heightBottom: 120,
		fontSizeBottom: 84,
		offsetBottomX: 0,
		offsetBottomY: 0
	};

	let strokeWidth = $state(Defaults.strokeWidth);
	let radius = $state(Defaults.radius);
	let widthOffset = $state(Defaults.widthOffset);
	let backgroundColor = $state(Defaults.backgroundColor);
	let foregroundColor = $state(Defaults.foregroundColor);
	let borderColor = $state(Defaults.borderColor);
	let textColorTop = $state(Defaults.textColorTop);
	let textColorBottom = $state(Defaults.textColorBottom);
	let dividerOffset = $state(Defaults.dividerOffset);

	let heightTop = $state(Defaults.heightTop);
	let fontSizeTop = $state(Defaults.fontSizeTop);
	let offsetTopX = $state(Defaults.offsetTopX);
	let offsetTopY = $state(Defaults.offsetTopY);

	let heightBottom = $state(Defaults.heightBottom);
	let fontSizeBottom = $state(Defaults.fontSizeBottom);
	let offsetBottomX = $state(Defaults.offsetBottomX);
	let offsetBottomY = $state(Defaults.offsetBottomY);


	const textWidthTop = $derived(textWidth(LOGO_DOMAIN, fontSizeTop));
	const textWidthBottom = $derived(textWidth(`/${projectName}`, fontSizeBottom));
	const textWidthMax = $derived(Math.max(textWidthTop, textWidthBottom));

	const W = $derived(textWidthMax + widthOffset);
	const H = $derived(heightTop + heightBottom);

	const xTop = $derived(W / 2 + offsetTopX);
	const yTop = $derived(heightTop / 2 + offsetTopY);
	const xBottom = $derived((W) * 0.5 + offsetBottomX);
	const yBottom = $derived((H) * 0.75 + offsetBottomY);

	$effect(() => {
		dividerOffset = Math.max(-heightTop, Math.min(heightBottom, dividerOffset));
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

		<Collapse label="Common" class="underline underline-offset-2">
			<div class="grid gap-x-8 gap-y-2 md:grid-cols-2">
				<NumberInput label="Stroke width" bind:value={strokeWidth} default={Defaults.strokeWidth} max={200} />
				<ColorInput label="Foreground" bind:value={foregroundColor} default={Defaults.foregroundColor} />
				<NumberInput label="Radius" bind:value={radius} default={Defaults.radius} max={H / 2} />
				<ColorInput label="Background" bind:value={backgroundColor} default={Defaults.backgroundColor} />
				<NumberInput label="Padding (X)" bind:value={widthOffset} default={Defaults.widthOffset} min={0} max={500} />
				<ColorInput label="Border" bind:value={borderColor} default={Defaults.borderColor} />
				<NumberInput label="Vertical divider offset" bind:value={dividerOffset} default={Defaults.dividerOffset} min={-heightTop} max={heightBottom} />
			</div>
		</Collapse>

		<Collapse label="Top section" class="underline underline-offset-2" hidden>
			<div class="grid gap-x-8 gap-y-2 md:grid-cols-2">
				<NumberInput label="Height" bind:value={heightTop} default={Defaults.heightTop} min={10} max={500}/>
				<NumberInput label="Font-size" bind:value={fontSizeTop} default={Defaults.fontSizeTop} min={10} max={500}/>
				<NumberInput label="Offset (X)" bind:value={offsetTopX} default={Defaults.offsetTopX} min={-100}/>
				<NumberInput label="Offset (Y)" bind:value={offsetTopY} default={Defaults.offsetTopY} min={-100}/>
				<ColorInput label="Text color" bind:value={textColorTop} default={Defaults.textColorTop} />
			</div>
		</Collapse>

		<Collapse label="Bottom section" class="underline underline-offset-2" hidden>
			<div class="grid gap-x-8 gap-y-2 md:grid-cols-2">
				<NumberInput label="Height" bind:value={heightBottom} default={Defaults.heightBottom} min={10} max={500}/>
				<NumberInput label="Font-size" bind:value={fontSizeBottom} default={Defaults.fontSizeBottom} min={10} max={500}/>
				<NumberInput label="Offset (X)" bind:value={offsetBottomX} default={Defaults.offsetBottomX} min={-100}/>
				<NumberInput label="Offset (Y)" bind:value={offsetBottomY} default={Defaults.offsetBottomY} min={-100}/>
				<ColorInput label="Text color" bind:value={textColorBottom} default={Defaults.textColorBottom} />
			</div>
		</Collapse>
		<!--<InputGroup title="Common" inputs={topInputs} />
		<InputGroup title="Top Part" inputs={topInputs} />
		<InputGroup title="Bottom part" inputs={bottomInputs} />-->
	</div>
</div>

<SVG {uid} width={W} height={H} class={className}>
	<!-- Background -->
	<Rect type="path" width={W} height={H} {radius} fill={backgroundColor} stroke={"none"} {strokeWidth} topLeft topRight bottomLeft bottomRight id="background" />
	<!-- Foreground fill -->
	<Rect type="path" width={W} height={heightTop + dividerOffset} {radius} fill={foregroundColor} stroke={"none"} {strokeWidth} topLeft topRight correctY={false}/>
	<!-- Border -->
	<Rect type="path" width={W} height={H} {radius} fill={"none"} stroke={borderColor} {strokeWidth} topLeft topRight bottomLeft bottomRight id="subject" />

	<Text x={xTop} y={yTop} fontSize={fontSizeTop} text={LOGO_DOMAIN} width={textWidthTop} fill={textColorTop} data-synthetic-bold="true" data-bold-strength="1.0" {...props} />
	<Text x={xBottom} y={yBottom} fontSize={fontSizeBottom} text={`/${projectName}`} width={textWidthBottom} fill={textColorBottom} />
</SVG>
