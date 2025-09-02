<script lang="ts">
	import type { ClassValue } from 'svelte/elements';
	import { Circle, Triangle } from '@lucide/svelte';

	import NumberInput from '$lib/workbench/logo/editor/NumberInput.svelte';
	import ColorInput from '$lib/workbench/logo/editor/ColorInput.svelte';
	import SVG from '$lib/workbench/logo/components/SVG.svelte';
	import Rect, { type BorderData } from '$lib/workbench/logo/components/Rect4.svelte';
	import Text from '$lib/workbench/logo/components/Text3.svelte';
	import InputGroup from '$lib/workbench/logo/editor/InputGroup.svelte';
	import Preview from '$lib/workbench/logo/editor/Preview.svelte';
	import BaseButton from '$lib/components/BaseButton.svelte';
	import BorderConfig from './editor/BorderConfig.svelte';

	//======================================================================================//

	type Data = {
		version: number;
		uid: string;
		// dimensions
		width: number;
		height: number;
		// text
		text: string;
		offsetX: number;
		offsetY: number;
		fontSize: number;
		boldness: number;
		color: string;
		// style
		fill: string;
		border: BorderData;
	};

	//======================================================================================//

	interface Props {
		uid: string;
		editable?: boolean;
	}

	const { uid, editable = false }: Props = $props();

	const Defaults: Data = {
		version: 1, // increment whenever the data structure changes
		uid: uid,
		// dimensions
		width: 220,
		height: 186,
		// text
		text: 'DL',
		offsetX: 0,
		offsetY: 0,
		fontSize: 150,
		boldness: 1.5,
		color: '#ffffff',
		// style
		fill: '#000000',
		border: {
			color: '#000000',
			width: 0,
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

	const defaultData: Data = $state({ ...Defaults });
	const data: Data = $derived(loadedData && loadedData.version >= Defaults.version ? loadedData : defaultData);
	const dataString = $derived(JSON.stringify(data, null, 4));

	const origin = $derived({ x: data.border.width / 2, y: data.border.width / 2 });

	const bold = $derived({ 'data-synthetic-bold': data.boldness !== 0 ? 'true' : 'false', 'data-bold-strength': data.boldness.toString() });
	const textX = $derived(data.width * 0.5 + data.offsetX);
	const textY = $derived(data.height * 0.5 + data.offsetY);

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
	});

	// Update the preview whenever the data changes
	$effect(() => {
		dataString;
		preview?.updatePreview();
	});

	//======================================================================================//

	function makeCircle() {
		data.height = data.width;
		data.border.radius = data.height / 2;
		data.border.dr.tl = 0;
		data.border.dr.tr = 0;
		data.border.dr.br = 0;
		data.border.dr.bl = 0;
	}

	//======================================================================================//

	export const save = () => {
		preview?.save();
	};
	export const load = () => {
		preview?.load();
	};
	const onreset = () => {
		loadedData = { ...Defaults };
		save();
	};
</script>

{#snippet SnippetSVG()}
	<SVG {uid} width={data.width + data.border.width} height={data.height + data.border.width}>
		<Rect role="subject" {origin} width={data.width} height={data.height} fill={data.fill} border={borderData} />
		<Text role="clip" {origin} dx={textX} dy={textY} text={data.text} fontSize={data.fontSize} color={data.color} {...bold} />

		<!-- Border -->
		<Rect role="frame" {origin} width={data.width} height={data.height} border={{ ...borderData, color: data.border.color, width: data.border.width }} />
	</SVG>
{/snippet}

{#if editable}
	<Preview {uid} bind:this={preview} {dataString} bind:data={loadedData} {onreset}>
		{#snippet config()}
			<!-- prettier-ignore -->
			<InputGroup label="Common">
			<NumberInput 	label="Width" 									bind:value={data.width}				initial={Defaults.width} 			min={10} max={500} />
			<NumberInput 	label="Height" 									bind:value={data.height}			initial={Defaults.height} 			min={10} max={500} />
			<ColorInput 	label="Fill" 									bind:value={data.fill} 				initial={Defaults.fill} 			/>
		</InputGroup>

			<!-- prettier-ignore -->
			<InputGroup label="Text">
			<NumberInput 	label={{label: "X", pre: Triangle}} 			bind:value={data.offsetX} 			initial={Defaults.offsetX} 			min={-100} max={100} />
			<NumberInput 	label={{label: "Y", pre: Triangle}} 			bind:value={data.offsetY} 			initial={Defaults.offsetY} 			min={-100} max={100} />
			<NumberInput 	label="Font size" 								bind:value={data.fontSize} 			initial={Defaults.fontSize} 		min={10} max={250} />
			<NumberInput 	label="Boldness" 								bind:value={data.boldness} 			initial={Defaults.boldness} 		min={0} max={20} step={0.01} />
			<ColorInput 	label="Color" 									bind:value={data.color} 			initial={Defaults.color} 			/>
		</InputGroup>

			<!-- Border configuration -->
			<BorderConfig bind:border={data.border} defaults={Defaults.border} heightTop={data.height / 2} heightBottom={data.height / 2} widthLeft={data.width / 2} widthRight={data.width / 2} />

			<BaseButton onclick={makeCircle} theme="link-secondary" class="me-auto flex items-center text-sm underline"><Circle class="mr-1 size-4" /> Make circle</BaseButton>
		{/snippet}

		{@render SnippetSVG()}
	</Preview>
{:else}
	{@render SnippetSVG()}
{/if}
