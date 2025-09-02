<script lang="ts">
	import { LOGO_DOMAIN, calculateTextWidth } from '$lib/workbench/logo/utils';

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
		height: number;
		fontSize: number;
		color: string;
		fill: string;
		boldness: number;
		offsetX: number;
		offsetY: number;
	};

	type Data = {
		version: number;
		uid: string;
		// dimensions
		dWidth: number;
		// top section
		top: Section;
		// bottom section
		bottom: Section;
		// style
		border: BorderData;
	};

	//======================================================================================//

	interface Props {
		uid: string;
		textTop: string;
		textBottom: string;
		editable?: boolean;
	}

	const { uid, textTop, textBottom, editable = false}: Props = $props();

	const Defaults: Data = {
		version: 3, // increment whenever the data structure changes
		uid: uid,
		// dimensions
		dWidth: 70,
		// top section
		top: {
			height: 120,
			fontSize: 84,
			color: '#ffffff',
			fill: '#000000',
			boldness: 1,
			offsetX: 0,
			offsetY: -5
		},
		// bottom section
		bottom: {
			height: 120,
			fontSize: 84,
			color: '#000000',
			fill: '#ffffff',
			boldness: 0,
			offsetX: 0,
			offsetY: -10
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
	const height = $derived(data.top.height + data.bottom.height);

	const minWidth = $derived(Math.max(calculateTextWidth(textTop, data.top.fontSize), calculateTextWidth(textBottom, data.bottom.fontSize)));
	const width = $derived(data.dWidth + minWidth);

	const topBold = $derived({ 'data-synthetic-bold': data.top.boldness !== 0 ? 'true' : 'false', 'data-bold-strength': data.top.boldness.toString() });
	const topTextX = $derived(width * 0.5 + data.top.offsetX);
	const topTextY = $derived(data.top.height * 0.5 + data.top.offsetY);

	const bottomBold = $derived({ 'data-synthetic-bold': data.bottom.boldness !== 0 ? 'true' : 'false', 'data-bold-strength': data.bottom.boldness.toString() });
	const bottomTextX = $derived(width * 0.5 + data.bottom.offsetX);
	const bottomTextY = $derived(data.bottom.height * 0.5 + data.bottom.offsetY + data.top.height);

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
	const borderTop = $derived({
		...borderData,
		dr: { ...borderData.dr, useBR: false, useBL: false }
	} satisfies BorderData);
	const borderBottom = $derived({
		...borderData,
		dr: { ...borderData.dr, useTL: false, useTR: false }
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
	<SVG {uid} width={width + data.border.width} height={height + data.border.width} >
		<!-- Top section -->
		<Rect role="subject" {origin} dx={0} dy={0} {width} height={data.top.height} fill={data.top.fill} border={borderTop} />
		<Text role="clip" {origin} dx={topTextX} dy={topTextY} text={textTop} fontSize={data.top.fontSize} color={data.top.color} {...topBold} />

		<!-- Bottom section -->
		<Rect role="ignore" {origin} dx={0} dy={data.top.height} {width} height={data.bottom.height} fill={data.bottom.fill} border={borderBottom} />
		<Text role="clip" {origin} dx={bottomTextX} dy={bottomTextY} text={textBottom} fontSize={data.bottom.fontSize} color={data.bottom.color} {...bottomBold} />

		<!-- Border -->
		<Rect role="frame" {origin} {width} {height} border={{ ...borderData, color: data.border.color, width: data.border.width }} />
	</SVG>
{/snippet}

{#if editable}
	<Preview {uid} bind:this={preview} {dataString} bind:data={loadedData} {onreset}>
		{#snippet config()}
			<!-- prettier-ignore -->
			<InputGroup label="Dimensions">
				<NumberInput 	label={{label: "Width", pre: Triangle}}		bind:value={data.dWidth} 			initial={Defaults.dWidth} 			min={0} max={500} />
			</InputGroup>

			<!-- prettier-ignore -->
			<InputGroup label="Top section">
				<NumberInput 	label={{label: "X", pre: Triangle}} 		bind:value={data.top.offsetX} 		initial={Defaults.top.offsetX} 		min={-100} max={100} />
				<NumberInput 	label={{label: "Y", pre: Triangle}} 		bind:value={data.top.offsetY} 		initial={Defaults.top.offsetY} 		min={-100} max={100} />
				<NumberInput 	label="Font size" 							bind:value={data.top.fontSize} 		initial={Defaults.top.fontSize} 	min={10} max={500} />
				<NumberInput 	label="Boldness" 							bind:value={data.top.boldness} 		initial={Defaults.top.boldness} 	min={0} max={20} step={0.01} />
				<ColorInput 	label="Fill color" 							bind:value={data.top.fill} 			initial={Defaults.top.fill} 		/>
				<ColorInput 	label="Text color" 							bind:value={data.top.color} 		initial={Defaults.top.color} 		/>
				<NumberInput 	label="Height" 								bind:value={data.top.height}		initial={Defaults.top.height} 		min={10} max={500} />
			</InputGroup>

			<!-- prettier-ignore -->
			<InputGroup label="Bottom section">
				<NumberInput 	label={{label: "X", pre: Triangle}} 		bind:value={data.bottom.offsetX} 	initial={Defaults.bottom.offsetX} 	min={-100} max={100} />
				<NumberInput 	label={{label: "Y", pre: Triangle}} 		bind:value={data.bottom.offsetY} 	initial={Defaults.bottom.offsetY} 	min={-100} max={100} />
				<NumberInput 	label="Font size" 							bind:value={data.bottom.fontSize} 	initial={Defaults.bottom.fontSize} 	min={10} max={500} />
				<NumberInput 	label="Boldness" 							bind:value={data.bottom.boldness} 	initial={Defaults.bottom.boldness} 	min={0} max={20} step={0.01} />
				<ColorInput 	label="Fill color" 							bind:value={data.bottom.fill} 		initial={Defaults.bottom.fill} 		/>
				<ColorInput 	label="Text color" 							bind:value={data.bottom.color} 		initial={Defaults.bottom.color} 	/>
				<NumberInput 	label="Height" 								bind:value={data.bottom.height} 	initial={Defaults.bottom.height} 	min={10} max={500} />
			</InputGroup>

			<!-- Border configuration -->
			<BorderConfig bind:border={data.border} defaults={Defaults.border} heightTop={data.top.height} heightBottom={data.bottom.height} widthLeft={width / 2} widthRight={width / 2} />
		{/snippet}

		{@render SnippetSVG()}
	</Preview>
{:else}
	{@render SnippetSVG()}
{/if}
