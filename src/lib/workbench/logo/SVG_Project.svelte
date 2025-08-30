<script lang="ts">
	import { svgBackground, textWidth, STROKE, PAD, TEXT, LOGO_DOMAIN, RADIUS, COLOR } from '$lib/workbench/logo/utils';
	import SVG from '$lib/workbench/logo/components/SVG.svelte';
	import Rect from '$lib/workbench/logo/components/Rect3.svelte';
	import Text from '$lib/workbench/logo/components/Text2.svelte';

	import type { ClassValue } from 'svelte/elements';

	import Input from '$lib/workbench/logo/components/NumberInput.svelte';
	import InputGroup from '$lib/workbench/logo/components/InputGroup.svelte';

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
		backgroundColor: 'red',
		foregroundColor: 'blue',
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
	const yBottom = $derived((H - strokeWidth * 2) * 0.75 + offsetBottomY);



	/*
		<Text x={STROKE / 2 + PAD} y={STROKE / 2 + Hh / 2} fontSize={headerSize} text={LOGO_DOMAIN} fill={fill} data-synthetic-bold="true" data-bold-strength="1.0"  />
		<Text x={STROKE / 2 + PAD} y={STROKE / 2 + Hh + Hb / 2} fontSize={bodySize} text={`/${projectName}`} />
	*/


	// tiny helpers
	const val = <T>(get: () => T, set: (v: T) => void) => ({ get, set });
	const num = (
		label: string,
		value: { get: () => number; set: (v: number) => void },
		defaultValue: number,
		opts: { min: number; max: number; step?: number }
	) => ({ type: 'number' as const, label, value, defaultValue, step: 1, ...opts });
	const col = (
		label: string,
		foreground: { get: () => string; set: (v: string) => void },
		background: { get: () => string; set: (v: string) => void },
		defaultForeground: string,
		defaultBackground: string
	) => ({ type: 'color' as const, label, foreground, background, defaultForeground, defaultBackground });

	// common ranges to avoid repetition
	const RANGE = {
		stroke: { min: 0, max: 100, step: 1 },
		large:  { min: 0, max: 5000, step: 1 },
		size:   { min: 10, max: 500, step: 1 },
		offset: { min: -200, max: 200, step: 1 }
	} as const;

	// groups
	const commonInputs = $derived.by(() => [
		num('Stroke width',			val(() => strokeWidth,		v => (strokeWidth  = v)),		Defaults.strokeWidth, RANGE.stroke),
		num('Radius',				val(() => radius,			v => (radius       = v)),		Defaults.radius,      { min: 0, max: H / 2, step: 1 }),
		num('Width (increment)',	val(() => widthOffset,		v => (widthOffset  = v)),		Defaults.widthOffset, RANGE.large),
		col('Foreground - Background', 				val(() => foregroundColor,	v => (foregroundColor = v)),	val(() => backgroundColor, v => (backgroundColor = v)), 	Defaults.foregroundColor, 	Defaults.backgroundColor)
	]);

	const topInputs = [
		num('Height',		val(() => heightTop,   v => (heightTop   = v)), Defaults.heightTop,   RANGE.size),
		num('Font-size',	val(() => fontSizeTop, v => (fontSizeTop = v)), Defaults.fontSizeTop, RANGE.size),
		num('Offset X',		val(() => offsetTopX,  v => (offsetTopX  = v)), Defaults.offsetTopX,  RANGE.offset),
		num('Offset Y',		val(() => offsetTopY,  v => (offsetTopY  = v)), Defaults.offsetTopY,  RANGE.offset)
	];

	const bottomInputs = [
		num('Height',		val(() => heightBottom,		v => (heightBottom   = v)), Defaults.heightBottom,   RANGE.size),
		num('Font-size',	val(() => fontSizeBottom,	v => (fontSizeBottom = v)), Defaults.fontSizeBottom, RANGE.size),
		num('Offset X',		val(() => offsetBottomX,	v => (offsetBottomX  = v)), Defaults.offsetBottomX,  RANGE.offset),
		num('Offset Y',		val(() => offsetBottomY,	v => (offsetBottomY  = v)), Defaults.offsetBottomY,  RANGE.offset)
	];
</script>

<div class="mb-6 rounded-lg border-2 border-primary-200 bg-white shadow-sm dark:border-primary-700 dark:bg-gray-800">
	<div class="px-4 py-5 sm:p-6">
		<div class="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">Parameters</div>
		<InputGroup title="Common" inputs={commonInputs} />
		<InputGroup title="Top Part" inputs={topInputs} />
		<InputGroup title="Bottom part" inputs={bottomInputs} />
	</div>
</div>

<SVG {uid} width={W} height={H} class={className}>
	<Rect type="path" width={W} height={H} {radius} fill={backgroundColor} stroke={foregroundColor} {strokeWidth} topLeft topRight bottomLeft bottomRight id="subject" />
	<Rect type="path" width={W} height={heightTop} {radius} fill={foregroundColor} stroke={foregroundColor} {strokeWidth} topLeft topRight />

	<Text x={xTop} y={yTop} fontSize={fontSizeTop} text={LOGO_DOMAIN} width={textWidthTop} fill={backgroundColor} data-synthetic-bold="true" data-bold-strength="1.0" {...props} />
	<Text x={xBottom} y={yBottom} fontSize={fontSizeBottom} text={`/${projectName}`} width={textWidthBottom} fill={foregroundColor} />
</SVG>
