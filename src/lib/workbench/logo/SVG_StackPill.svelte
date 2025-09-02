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
	import { StackPillDefaults, makeRoundedBorder, makeRoundedFrame, makeTextProps, type StackPillData } from '$lib/workbench/logo/defaults';

	//======================================================================================//

	interface Props {
		uid: string;
		textLeft: string;
		textRightTop: string;
		textRightBottom: string;
		editable?: boolean;
	}

	const { uid, textLeft, textRightTop, textRightBottom, editable = false }: Props = $props();

	//======================================================================================//

	let preview: Preview | undefined = $state();
	let loadedData: StackPillData | undefined = $state();

	const dataStore: StackPillData = $state({ ...StackPillDefaults, uid });
	const data: StackPillData = $derived(loadedData && loadedData.version >= StackPillDefaults.version ? loadedData : dataStore);
	const dataString = $derived(JSON.stringify(data, null, 4));

	const origin = $derived({ x: data.border.width / 2, y: data.border.width / 2 });

	const minWidthRight = $derived(Math.max(calculateTextWidth(textRightTop, data.right.top.fontSize), calculateTextWidth(textRightBottom, data.right.bottom.fontSize)));

	const widthRight = $derived(minWidthRight + data.right.dWidth);
	const widthLeft = $derived(data.left.dWidth + calculateTextWidth(textLeft, data.left.fontSize));
	const width = $derived(widthLeft + widthRight);

	const height = $derived(data.right.top.height + data.right.bottom.height);

	// text properties
	const leftTextProps = $derived(makeTextProps(data.left, widthLeft * 0.5, height * 0.5));
	const rightTopTextProps = $derived(makeTextProps(data.right.top, widthRight * 0.5 + widthLeft, data.right.top.height * 0.5));
	const rightBottomTextProps = $derived(makeTextProps(data.right.bottom, widthRight * 0.5 + widthLeft, data.right.bottom.height * 0.5 + data.right.top.height));

	// border properties
	const leftBorderProps = $derived(makeRoundedBorder(data.border, { topR: false, bottomR: false }));
	const rightTopBorderProps = $derived(makeRoundedBorder(data.border, { topL: false, bottomL: false, bottomR: false }));
	const rightBottomBorderProps = $derived(makeRoundedBorder(data.border, { topL: false, bottomL: false, topR: false }));
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
		loadedData = { ...StackPillDefaults };
	};
</script>

{#snippet SnippetSVG()}
	<SVG {uid} width={width + data.border.width} height={height + data.border.width}>
		<!-- left section -->
		<Rect role="subject" {origin} dx={0} dy={0} width={widthLeft} {height} fill={data.left.fill} border={leftBorderProps} />
		<Text role="clip" {origin} text={textLeft} {...leftTextProps} />

		<!-- right top section -->
		<Rect role="ignore" {origin} dx={widthLeft} dy={0} width={widthRight} height={data.right.top.height} fill={data.right.top.fill} border={rightTopBorderProps} />
		<Text role="clip" {origin} text={textRightTop} {...rightTopTextProps} />

		<!-- right bottom section -->
		<Rect role="ignore" {origin} dx={widthLeft} dy={data.right.top.height} width={widthRight} height={data.right.bottom.height} fill={data.right.bottom.fill} border={rightBottomBorderProps} />
		<Text role="clip" {origin} text={textRightBottom} {...rightBottomTextProps} />

		<!-- Border -->
		<Rect role="frame" {origin} {width} {height} border={frameProps} />
	</SVG>
{/snippet}

{#if editable}
	<Preview {uid} bind:this={preview} {dataString} bind:data={loadedData} {onreset}>
		{#snippet config()}
			<!-- prettier-ignore -->
			<InputGroup label="Dimensions">
				<NumberInput 	label={{label: "Left width", pre: Triangle}}	bind:value={data.left.dWidth}			initial={StackPillDefaults.left.dWidth} 				min={0} max={500} />
				<NumberInput 	label={{label: "Right width", pre: Triangle}} 	bind:value={data.right.dWidth} 			initial={StackPillDefaults.right.dWidth} 			min={0} max={500} />
				<NumberInput 	label="Right-top height"						bind:value={data.right.top.height} 		initial={StackPillDefaults.right.top.height} 		min={10} max={1000} />
				<NumberInput 	label="Right-bottom height"						bind:value={data.right.bottom.height} 	initial={StackPillDefaults.right.bottom.height} 		min={10} max={1000} />
			</InputGroup>

			<!-- Section configuration -->
			<SectionConfig label="Left section" bind:section={data.left} defaults={StackPillDefaults.left} />
			<SectionConfig label="Right-top section" bind:section={data.right.top} defaults={StackPillDefaults.right.top} />
			<SectionConfig label="Right-bottom section" bind:section={data.right.bottom} defaults={StackPillDefaults.right.bottom} />

			<!-- Border configuration -->
			<BorderConfig bind:border={data.border} defaults={StackPillDefaults.border} heightTop={data.right.top.height} heightBottom={data.right.bottom.height} {widthLeft} {widthRight} />
		{/snippet}

		{@render SnippetSVG()}
	</Preview>
{:else}
	{@render SnippetSVG()}
{/if}
