<script lang="ts">
	import { calculateTextWidth } from '$lib/workbench/logo/utils';

	import { Triangle } from '@lucide/svelte';

	import NumberInput from '$lib/workbench/logo/inputs/NumberInput.svelte';
	import SVG from '$lib/workbench/logo/components/SVG.svelte';
	import Rect from '$lib/workbench/logo/components/Rect.svelte';
	import Text from '$lib/workbench/logo/components/Text.svelte';
	import InputGroup from '$lib/workbench/logo/inputs/InputGroup.svelte';
	import Preview from '$lib/workbench/logo/editor/Preview.svelte';
	import BorderConfig from '$lib/workbench/logo/editor/BorderConfig.svelte';
	import SectionConfig from '$lib/workbench/logo/editor/SectionConfig.svelte';
	import { StackDefaults, makeRoundedBorder, makeRoundedFrame, makeTextProps, type StackData } from '$lib/workbench/logo/defaults';

	//======================================================================================//

	interface Props {
		uid: string;
		textTop: string;
		textBottom: string;
		editable?: boolean;
	}

	const { uid, textTop, textBottom, editable = false }: Props = $props();

	//======================================================================================//

	let preview: Preview | undefined = $state();
	let loadedData: StackData | undefined = $state();

	const dataStore: StackData = $state({ ...StackDefaults, uid });
	const data: StackData = $derived(loadedData && loadedData.version >= StackDefaults.version ? loadedData : dataStore);
	const dataString = $derived(JSON.stringify(data, null, 4));

	const origin = $derived({ x: data.border.width / 2, y: data.border.width / 2 });
	
	// dimensions
	const minWidth = $derived(Math.max(calculateTextWidth(textTop, data.top.fontSize), calculateTextWidth(textBottom, data.bottom.fontSize)));
	const width = $derived(data.dWidth + minWidth);
	const height = $derived(data.top.height + data.bottom.height);
		
	// text properties
	const topTextProps = $derived(makeTextProps(data.top, width * 0.5, data.top.height * 0.5));
	const bottomTextProps = $derived(makeTextProps(data.bottom, width * 0.5, data.bottom.height * 0.5 + data.top.height));

	// border properties
	const topBorderProps = $derived(makeRoundedBorder(data.border, { bottomL: false, bottomR: false }));
	const bottomBorderProps = $derived(makeRoundedBorder(data.border, { topL: false, topR: false }));
	const frameProps = $derived(makeRoundedFrame(data.border));

	//======================================================================================//

	// Update the preview whenever the data changes
	$effect(() => {
		dataString;
		preview?.updatePreview();
	});

	export const save = () => {
		preview?.save();
	};

	export const load = () => {
		preview?.load();
	};

	const onreset = () => {
		loadedData = { ...StackDefaults };
	};
</script>

{#snippet SnippetSVG()}
	<SVG {uid} width={width + data.border.width} height={height + data.border.width}>
		<!-- Top section -->
		<Rect role="subject" {origin} dx={0} dy={0} {width} height={data.top.height} fill={data.top.fill} border={topBorderProps} />
		<Text role="clip" {origin} text={textTop} {...topTextProps} />

		<!-- Bottom section -->
		<Rect role="ignore" {origin} dx={0} dy={data.top.height} {width} height={data.bottom.height} fill={data.bottom.fill} border={bottomBorderProps} />
		<Text role="clip" {origin} text={textBottom} {...bottomTextProps} />

		<!-- Border -->
		<Rect role="frame" {origin} {width} {height} border={frameProps} />
	</SVG>
{/snippet}

{#if editable}
	<Preview {uid} bind:this={preview} {dataString} bind:data={loadedData} {onreset}>
		{#snippet config()}
			<!-- prettier-ignore -->
			<InputGroup label="Dimensions">
				<NumberInput 	label={{label: "Width", pre: Triangle}}		bind:value={data.dWidth} 			initial={StackDefaults.dWidth} 			min={0} max={500} />
				<NumberInput 	label="Top height" 							bind:value={data.top.height}		initial={StackDefaults.top.height} 		min={10} max={500} />
				<NumberInput 	label="Bottom height" 						bind:value={data.bottom.height} 	initial={StackDefaults.bottom.height} 	min={10} max={500} />
			</InputGroup>

			<!-- Section configuration -->
			<SectionConfig label="Top section" bind:section={data.top} defaults={StackDefaults.top} />
			<SectionConfig label="Bottom section" bind:section={data.bottom} defaults={StackDefaults.bottom} />

			<!-- Border configuration -->
			<BorderConfig bind:border={data.border} defaults={StackDefaults.border} heightTop={data.top.height} heightBottom={data.bottom.height} widthLeft={width / 2} widthRight={width / 2} />
		{/snippet}

		{@render SnippetSVG()}
	</Preview>
{:else}
	{@render SnippetSVG()}
{/if}
