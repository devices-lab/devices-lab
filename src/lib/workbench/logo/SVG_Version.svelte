<script lang="ts">
	import { LOGO_DOMAIN, LOGO_ICON, LOGO_NAME, calculateTextWidth } from '$lib/workbench/logo/utils';

	import type { ClassValue } from 'svelte/elements';
	import { Triangle } from '@lucide/svelte';

	import NumberInput from '$lib/workbench/logo/editor/NumberInput.svelte';
	import ColorInput from '$lib/workbench/logo/editor/ColorInput.svelte';
	import SVG from '$lib/workbench/logo/components/SVG.svelte';
	import Rect, { type BorderData } from '$lib/workbench/logo/components/Rect4.svelte';
	import Text from '$lib/workbench/logo/components/Text3.svelte';
	import InputGroup from '$lib/workbench/logo/editor/InputGroup.svelte';
	import Preview from '$lib/workbench/logo/editor/Preview.svelte';
	import BorderConfig from './editor/BorderConfig.svelte';

	//======================================================================================//

	type Section = {
		fontSize: number;
		color: string;
		fill: string;
		boldness: number;
		offsetX: number;
		offsetY: number;
	};

	type HSection = Section & {
		dWidth: number;
	};

	type VSection = Section & {
		height: number;
	};

	type Data = {
		version: number;
		uid: string;
		// dimensions

		// left section
		left: HSection;
		right: {
			dWidth: number;
			top: VSection;
			bottom: VSection;
		};

		// style
		border: BorderData;
	};

	//======================================================================================//

	interface Props {
		uid: string;
		textLeft: string;
		textRightTop: string;
		textRightBottom: string;
		editable?: boolean;
	}

	const { uid, textLeft, textRightTop, textRightBottom, editable = false }: Props = $props();

	const Defaults: Data = {
		version: 2, // increment whenever the data structure changes
		uid: uid,
		// left section
		left: {
			dWidth: 40,
			fontSize: 150,
			color: '#ffffff',
			fill: '#000000',
			boldness: 1,
			offsetX: 0,
			offsetY: 0
		},
		// right section
		right: {
			dWidth: 60,
			top: {
				height: 120,
				fontSize: 86,
				color: '#000000',
				fill: '#ffffff',
				boldness: 0,
				offsetX: 0,
				offsetY: -0
			},
			bottom: {
				height: 120,
				fontSize: 86,
				color: '#000000',
				fill: '#ffffff',
				boldness: 0,
				offsetX: 0,
				offsetY: 0
			}
		},
		// style
		border: {
			color: '#000000',
			width: 10,
			radius: 40,
			dr: {
				tl: 0,
				tr: 0,
				br: 0,
				bl: 0
			}
		}
	};

	//======================================================================================//

	let preview: Preview | undefined = $state();
	let loadedData: Data | undefined = $state();

	const dataStore: Data = $state({ ...Defaults });
	const data: Data = $derived(loadedData && loadedData.version >= Defaults.version ? loadedData : dataStore);
	const dataString = $derived(JSON.stringify(data, null, 4));

	const origin = $derived({ x: data.border.width / 2, y: data.border.width / 2 });

	const minWidthRight = $derived(Math.max(calculateTextWidth(textRightTop, data.right.top.fontSize), calculateTextWidth(textRightBottom, data.right.bottom.fontSize)));

	const widthRight = $derived(minWidthRight + data.right.dWidth);
	const widthLeft = $derived(data.left.dWidth + calculateTextWidth(textLeft, data.left.fontSize));
	const width = $derived(widthLeft + widthRight);

	const height = $derived(data.right.top.height + data.right.bottom.height);

	const leftBold = $derived({ 'data-synthetic-bold': data.left.boldness !== 0 ? 'true' : 'false', 'data-bold-strength': data.left.boldness.toString() });
	const leftTextX = $derived(widthLeft * 0.5 + data.left.offsetX);
	const leftTextY = $derived(height * 0.5 + data.left.offsetY);

	const rightTopBold = $derived({ 'data-synthetic-bold': data.right.top.boldness !== 0 ? 'true' : 'false', 'data-bold-strength': data.right.top.boldness.toString() });
	const rightTopTextX = $derived(widthRight * 0.5 + data.right.top.offsetX + widthLeft);
	const rightTopTextY = $derived(data.right.top.height * 0.5 + data.right.top.offsetY);

	const rightBottomBold = $derived({ 'data-synthetic-bold': data.right.bottom.boldness !== 0 ? 'true' : 'false', 'data-bold-strength': data.right.bottom.boldness.toString() });
	const rightBottomTextX = $derived(widthRight * 0.5 + data.right.bottom.offsetX + widthLeft);
	const rightBottomTextY = $derived(data.right.bottom.height * 0.5 + data.right.bottom.offsetY + data.right.top.height);

	const borderData: BorderData = $derived({
		color: 'none',
		width: 0,
		radius: data.border.radius,
		dr: {
			tl: data.border.dr.tl,
			tr: data.border.dr.tr,
			br: data.border.dr.br,
			bl: data.border.dr.bl
		}
	} satisfies BorderData);
	const borderLeft = $derived({
		...borderData,
		dr: { ...borderData.dr, useTR: false, useBR: false }
	} satisfies BorderData);
	const borderRightTop = $derived({
		...borderData,
		dr: { ...borderData.dr, useTL: false, useBL: false, useBR: false }
	} satisfies BorderData);
	const borderRightBottom = $derived({
		...borderData,
		dr: { ...borderData.dr, useTL: false, useBL: false, useTR: false }
	} satisfies BorderData);

	// Update the preview whenever the data changes
	$effect(() => {
		dataString;
		preview?.updatePreview();
	});

	//======================================================================================//

	export const save = () => {
		preview?.save();
	};
	export const load = () => {
		preview?.load();
	};
	const onreset = () => {
		loadedData = { ...Defaults };
	};
</script>

{#snippet SnippetSVG()}
	<SVG {uid} width={width + data.border.width} height={height + data.border.width}>
		<!-- left section -->
		<Rect role="subject" {origin} dx={0} dy={0} width={widthLeft} {height} fill={data.left.fill} border={borderLeft} />
		<Text role="clip" {origin} dx={leftTextX} dy={leftTextY} text={textLeft} fontSize={data.left.fontSize} color={data.left.color} {...leftBold} />

		<!-- right top section -->
		<Rect role="ignore" {origin} dx={widthLeft} dy={0} width={widthRight} height={data.right.top.height} fill={data.right.top.fill} border={borderRightTop} />
		<Text role="clip" {origin} dx={rightTopTextX} dy={rightTopTextY} text={textRightTop} fontSize={data.right.top.fontSize} color={data.right.top.color} {...rightTopBold} />

		<!-- right bottom section -->
		<Rect role="ignore" {origin} dx={widthLeft} dy={data.right.top.height} width={widthRight} height={data.right.bottom.height} fill={data.right.bottom.fill} border={borderRightBottom} />
		<Text role="clip" {origin} dx={rightBottomTextX} dy={rightBottomTextY} text={textRightBottom} fontSize={data.right.bottom.fontSize} color={data.right.bottom.color} {...rightBottomBold} />

		<!-- Border -->
		<Rect role="frame" {origin} {width} height={height} border={{ ...borderData, color: data.border.color, width: data.border.width }} />
	</SVG>
{/snippet}

{#if editable}
	<Preview {uid} bind:this={preview} {dataString} bind:data={loadedData} {onreset}>
		{#snippet config()}
			<!-- prettier-ignore -->
			<InputGroup label="Dimensions">
				<NumberInput 	label={{label: "Right width", pre: Triangle}} 	bind:value={data.right.dWidth} 			initial={Defaults.right.dWidth} 			min={0} max={500} />
			</InputGroup>

			<!-- prettier-ignore -->
			<InputGroup label="Left section">
				<NumberInput 	label={{label: "X", pre: Triangle}} 			bind:value={data.left.offsetX} 			initial={Defaults.left.offsetX} 			min={-100} max={100} />
				<NumberInput 	label={{label: "Y", pre: Triangle}} 			bind:value={data.left.offsetY} 			initial={Defaults.left.offsetY} 			min={-100} max={100} />
				<NumberInput 	label="Font size" 								bind:value={data.left.fontSize} 		initial={Defaults.left.fontSize} 			min={10} max={500} />
				<NumberInput 	label="Boldness" 								bind:value={data.left.boldness} 		initial={Defaults.left.boldness} 			min={0} max={20} step={0.01} />
				<ColorInput 	label="Fill color" 								bind:value={data.left.fill} 			initial={Defaults.left.fill} 				/>
				<ColorInput 	label="Text color" 								bind:value={data.left.color} 			initial={Defaults.left.color} 				/>
				<NumberInput 	label={{label: "Width", pre: Triangle}}			bind:value={data.left.dWidth}			initial={Defaults.left.dWidth} 				min={0} max={500} />
			</InputGroup>

			<!-- prettier-ignore -->
			<InputGroup label="Right-top section">
				<NumberInput 	label={{label: "X", pre: Triangle}} 			bind:value={data.right.top.offsetX} 	initial={Defaults.right.top.offsetX} 		min={-100} max={100} />
				<NumberInput 	label={{label: "Y", pre: Triangle}} 			bind:value={data.right.top.offsetY} 	initial={Defaults.right.top.offsetY} 		min={-100} max={100} />
				<NumberInput 	label="Font size" 								bind:value={data.right.top.fontSize} 	initial={Defaults.right.top.fontSize} 		min={10} max={500} />
				<NumberInput 	label="Boldness" 								bind:value={data.right.top.boldness} 	initial={Defaults.right.top.boldness} 		min={0} max={20} step={0.01} />
				<ColorInput 	label="Fill color" 								bind:value={data.right.top.fill} 		initial={Defaults.right.top.fill} 			/>
				<ColorInput 	label="Text color" 								bind:value={data.right.top.color} 		initial={Defaults.right.top.color} 			/>
				<NumberInput 	label="Height"									bind:value={data.right.top.height} 		initial={Defaults.right.top.height} 		min={10} max={1000} />
			</InputGroup>

			<!-- prettier-ignore -->
			<InputGroup label="Right-bottom section">
				<NumberInput 	label={{label: "X", pre: Triangle}} 			bind:value={data.right.bottom.offsetX} 	initial={Defaults.right.bottom.offsetX} 	min={-100} max={100} />
				<NumberInput 	label={{label: "Y", pre: Triangle}} 			bind:value={data.right.bottom.offsetY} 	initial={Defaults.right.bottom.offsetY} 	min={-100} max={100} />
				<NumberInput 	label="Font size" 								bind:value={data.right.bottom.fontSize} initial={Defaults.right.bottom.fontSize} 	min={10} max={500} />
				<NumberInput 	label="Boldness" 								bind:value={data.right.bottom.boldness} initial={Defaults.right.bottom.boldness} 	min={0} max={20} step={0.01} />
				<ColorInput 	label="Fill color" 								bind:value={data.right.bottom.fill} 	initial={Defaults.right.bottom.fill} 		/>
				<ColorInput 	label="Text color" 								bind:value={data.right.bottom.color} 	initial={Defaults.right.bottom.color} 		/>
				<NumberInput 	label="Height"									bind:value={data.right.bottom.height} 	initial={Defaults.right.bottom.height} 		min={10} max={1000} />
			</InputGroup>

			<!-- Border configuration -->
			<BorderConfig bind:border={data.border} defaults={Defaults.border} heightTop={data.right.top.height} heightBottom={data.right.bottom.height} widthLeft={widthLeft} widthRight={widthRight} />
		{/snippet}

		{@render SnippetSVG()}
	</Preview>
{:else}
	{@render SnippetSVG()}
{/if}