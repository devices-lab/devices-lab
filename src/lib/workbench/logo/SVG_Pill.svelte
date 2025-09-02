<script lang="ts">
	import { LOGO_ICON, calculateTextWidth } from '$lib/workbench/logo/utils';

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
		dWidth: number;
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
		height: number;
		// left section
		left: Section;
		// right section
		right: Section;
		// style
		border: BorderData;
	};

	//======================================================================================//

	interface Props {
		uid: string;
		textLeft: string;
		textRight: string;
		editable?: boolean;
	}

	const { uid, textLeft, textRight, editable = false }: Props = $props();

	const Defaults: Data = {
		version: 3, // increment whenever the data structure changes
		uid: uid,
		// dimensions
		height: 176,
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
			fontSize: 108,
			color: '#000000',
			fill: '#ffffff',
			boldness: 0,
			offsetX: 0,
			offsetY: -0
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

	const widthLeft = $derived(data.left.dWidth + calculateTextWidth(textLeft, data.left.fontSize));
	const widthRight = $derived(data.right.dWidth + calculateTextWidth(textRight, data.right.fontSize));

	const width = $derived(widthLeft + widthRight);

	const leftBold = $derived({ 'data-synthetic-bold': data.left.boldness !== 0 ? 'true' : 'false', 'data-bold-strength': data.left.boldness.toString() });
	const leftTextX = $derived(widthLeft * 0.5 + data.left.offsetX);
	const leftTextY = $derived(data.height * 0.5 + data.left.offsetY);

	const rightBold = $derived({ 'data-synthetic-bold': data.right.boldness !== 0 ? 'true' : 'false', 'data-bold-strength': data.right.boldness.toString() });
	const rightTextX = $derived(widthRight * 0.5 + data.right.offsetX + widthLeft);
	const rightTextY = $derived(data.height * 0.5 + data.right.offsetY);

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
	const borderRight = $derived({
		...borderData,
		dr: { ...borderData.dr, useTL: false, useBL: false }
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
	<SVG {uid} width={width + data.border.width} height={data.height + data.border.width}>
		<!-- left section -->
		<Rect role="subject" {origin} dx={0} dy={0} width={widthLeft} height={data.height} fill={data.left.fill} border={borderLeft} />
		<Text role="clip" {origin} dx={leftTextX} dy={leftTextY} text={textLeft} fontSize={data.left.fontSize} color={data.left.color} {...leftBold} />

		<!-- right section -->
		<Rect role="ignore" {origin} dx={widthLeft} dy={0} width={widthRight} height={data.height} fill={data.right.fill} border={borderRight} />
		<Text role="clip" {origin} dx={rightTextX} dy={rightTextY} text={textRight} fontSize={data.right.fontSize} color={data.right.color} {...rightBold} />

		<!-- Border -->
		<Rect role="frame" {origin} {width} height={data.height} border={{ ...borderData, color: data.border.color, width: data.border.width }} />
	</SVG>
{/snippet}

{#if editable}
	<Preview {uid} bind:this={preview} {dataString} bind:data={loadedData} {onreset}>
		{#snippet config()}
			<!-- prettier-ignore -->
			<InputGroup label="Dimensions">
				<NumberInput 	label="Height"								bind:value={data.height} 			initial={Defaults.height} 			min={10} max={1000} />
			</InputGroup>

			<!-- prettier-ignore -->
			<InputGroup label="Left section">
				<NumberInput 	label={{label: "X", pre: Triangle}} 		bind:value={data.left.offsetX} 		initial={Defaults.left.offsetX} 	min={-100} max={100} />
				<NumberInput 	label={{label: "Y", pre: Triangle}} 		bind:value={data.left.offsetY} 		initial={Defaults.left.offsetY} 	min={-100} max={100} />
				<NumberInput 	label="Font size" 							bind:value={data.left.fontSize} 	initial={Defaults.left.fontSize} 	min={10} max={500} />
				<NumberInput 	label="Boldness" 							bind:value={data.left.boldness} 	initial={Defaults.left.boldness} 	min={0} max={20} step={0.01} />
				<ColorInput 	label="Fill color" 							bind:value={data.left.fill} 		initial={Defaults.left.fill} 		/>
				<ColorInput 	label="Text color" 							bind:value={data.left.color} 		initial={Defaults.left.color} 		/>
				<NumberInput 	label={{label: "Width", pre: Triangle}} 	bind:value={data.left.dWidth}		initial={Defaults.left.dWidth} 		min={0} max={200} />
			</InputGroup>

			<!-- prettier-ignore -->
			<InputGroup label="Right section">
				<NumberInput 	label={{label: "X", pre: Triangle}} 		bind:value={data.right.offsetX} 	initial={Defaults.right.offsetX} 	min={-100} max={100} />
				<NumberInput 	label={{label: "Y", pre: Triangle}} 		bind:value={data.right.offsetY} 	initial={Defaults.right.offsetY} 	min={-100} max={100} />
				<NumberInput 	label="Font size" 							bind:value={data.right.fontSize} 	initial={Defaults.right.fontSize} 	min={10} max={500} />
				<NumberInput 	label="Boldness" 							bind:value={data.right.boldness} 	initial={Defaults.right.boldness} 	min={0} max={20} step={0.01} />
				<ColorInput 	label="Fill color" 							bind:value={data.right.fill} 		initial={Defaults.right.fill} 		/>
				<ColorInput 	label="Text color" 							bind:value={data.right.color} 		initial={Defaults.right.color} 		/>
				<NumberInput 	label={{label: "Width", pre: Triangle}} 	bind:value={data.right.dWidth} 		initial={Defaults.right.dWidth} 	min={0} max={500} />
			</InputGroup>

			<!-- Border configuration -->
			<BorderConfig bind:border={data.border} defaults={Defaults.border} heightTop={data.height / 2} heightBottom={data.height / 2} {widthLeft} {widthRight} />
		{/snippet}

		{@render SnippetSVG()}
	</Preview>
{:else}
	{@render SnippetSVG()}
{/if}
