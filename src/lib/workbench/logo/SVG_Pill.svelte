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
	import { PillDefaults, makeRoundedBorder, makeRoundedFrame, makeTextProps, type PillData } from '$lib/workbench/logo/defaults';
	import { devMode, devModeLocal } from '$lib/utils';

	//======================================================================================//

	interface Props {
		uid: string;
		textLeft: string;
		textRight: string;
		editable?: boolean;
	}

	const { uid, textLeft, textRight, editable = false }: Props = $props();

	//======================================================================================//

	let preview: Preview | undefined = $state();
	let loadedData: PillData | undefined = $state();

	const dataStore: PillData = $state({ ...PillDefaults, uid });
	const data: PillData = $derived($devMode && $devModeLocal && loadedData && loadedData.version >= PillDefaults.version ? loadedData : dataStore);
	const dataString = $derived(JSON.stringify(data, null, 4));

	const origin = $derived({ x: data.border.width / 2, y: data.border.width / 2 });

	// dimensions
	const widthLeft = $derived(data.left.dWidth + calculateTextWidth(textLeft, data.left.fontSize));
	const widthRight = $derived(data.right.dWidth + calculateTextWidth(textRight, data.right.fontSize));
	const width = $derived(widthLeft + widthRight);

	// text properties
	const leftTextProps = $derived(makeTextProps(data.left, widthLeft * 0.5, data.height * 0.5));
	const rightTextProps = $derived(makeTextProps(data.right, widthRight * 0.5 + widthLeft, data.height * 0.5));

	// border properties
	const leftBorderProps = $derived(makeRoundedBorder(data.border, { topR: false, bottomR: false }));
	const rightBorderProps = $derived(makeRoundedBorder(data.border, { topL: false, bottomL: false }));
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
		loadedData = { ...PillDefaults };
	};
</script>

{#snippet SnippetSVG()}
	<SVG {uid} width={width + data.border.width} height={data.height + data.border.width}>
		<!-- left section -->
		<Rect role="subject" {origin} dx={0} dy={0} width={widthLeft} height={data.height} fill={data.left.fill} border={leftBorderProps} />
		<Text role="clip" {origin} text={textLeft} {...leftTextProps} />

		<!-- right section -->
		<Rect role="ignore" {origin} dx={widthLeft} dy={0} width={widthRight} height={data.height} fill={data.right.fill} border={rightBorderProps} />
		<Text role="clip" {origin} text={textRight} {...rightTextProps} />

		<!-- Border -->
		<Rect role="frame" {origin} {width} height={data.height} border={frameProps} />
	</SVG>
{/snippet}

{#if editable}
	<Preview {uid} bind:this={preview} {dataString} bind:data={loadedData} {onreset}>
		{#snippet config()}
			<!-- prettier-ignore -->
			<InputGroup label="Dimensions">
				<NumberInput 	label={{label: "Left width", pre: Triangle}} 	bind:value={data.left.dWidth}		initial={PillDefaults.left.dWidth} 		min={0} max={200} />
				<NumberInput 	label={{label: "Right width", pre: Triangle}} 	bind:value={data.right.dWidth} 		initial={PillDefaults.right.dWidth} 	min={0} max={500} />
				<NumberInput 	label="Height"									bind:value={data.height} 			initial={PillDefaults.height} 			min={10} max={1000} />
			</InputGroup>

			<!-- Section configuration -->
			<SectionConfig label="Left section" bind:section={data.left} defaults={PillDefaults.left} />
			<SectionConfig label="Right section" bind:section={data.right} defaults={PillDefaults.right} />

			<!-- Border configuration -->
			<BorderConfig bind:border={data.border} defaults={PillDefaults.border} heightTop={data.height / 2} heightBottom={data.height / 2} {widthLeft} {widthRight} />
		{/snippet}

		{@render SnippetSVG()}
	</Preview>
{:else}
	{@render SnippetSVG()}
{/if}
