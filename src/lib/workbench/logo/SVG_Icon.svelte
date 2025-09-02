<script lang="ts">
	import { Circle } from '@lucide/svelte';

	import NumberInput from '$lib/workbench/logo/inputs/NumberInput.svelte';
	import SVG from '$lib/workbench/logo/components/SVG.svelte';
	import Rect from '$lib/workbench/logo/components/Rect.svelte';
	import Text from '$lib/workbench/logo/components/Text.svelte';
	import InputGroup from '$lib/workbench/logo/inputs/InputGroup.svelte';
	import Preview from '$lib/workbench/logo/editor/Preview.svelte';
	import BaseButton from '$lib/components/BaseButton.svelte';
	import BorderConfig from '$lib/workbench/logo/editor/BorderConfig.svelte';
	import SectionConfig from '$lib/workbench/logo/editor/SectionConfig.svelte';
	import { IconDefaults, makeRoundedBorder, makeRoundedFrame, makeTextProps, type IconData } from '$lib/workbench/logo/defaults';

	//======================================================================================//

	interface Props {
		uid: string;
		text: string;
		editable?: boolean;
	}

	const { uid, text, editable = false }: Props = $props();

	//======================================================================================//

	let preview: Preview | undefined = $state();
	let loadedData: IconData | undefined = $state();

	const defaultData: IconData = $state({ ...IconDefaults, uid });
	const data: IconData = $derived(loadedData && loadedData.version >= IconDefaults.version ? loadedData : defaultData);
	const dataString = $derived(JSON.stringify(data, null, 4));

	const origin = $derived({ x: data.border.width / 2, y: data.border.width / 2 });

	// text properties
	const textProps = $derived(makeTextProps(data.content, data.width * 0.5, data.height * 0.5));

	// border properties
	const borderProps = $derived(makeRoundedBorder(data.border));
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
		loadedData = { ...IconDefaults };
	};

	function makeCircle() {
		data.height = data.width;
		data.border.radius = data.height / 2;
		data.border.topL.dRadius = 0;
		data.border.topR.dRadius = 0;
		data.border.bottomR.dRadius = 0;
		data.border.bottomL.dRadius = 0;
	}
</script>

{#snippet SnippetSVG()}
	<SVG {uid} width={data.width + data.border.width} height={data.height + data.border.width}>
		<Rect role="subject" {origin} width={data.width} height={data.height} fill={data.content.fill} border={borderProps} />
		<Text role="clip" {origin} {text} {...textProps} />

		<!-- Border -->
		<Rect role="frame" {origin} width={data.width} height={data.height} border={frameProps} />
	</SVG>
{/snippet}

{#if editable}
	<Preview {uid} bind:this={preview} {dataString} bind:data={loadedData} {onreset}>
		{#snippet config()}
			<!-- prettier-ignore -->
			<InputGroup label="Common">
				<NumberInput 	label="Width" 		bind:value={data.width}		initial={IconDefaults.width} 	min={10} max={500} />
				<NumberInput 	label="Height" 		bind:value={data.height}	initial={IconDefaults.height} 	min={10} max={500} />
			</InputGroup>

			<!-- Section configuration -->
			<SectionConfig label="Section" bind:section={data.content} defaults={IconDefaults.content} />

			<!-- Border configuration -->
			<BorderConfig bind:border={data.border} defaults={IconDefaults.border} heightTop={data.height / 2} heightBottom={data.height / 2} widthLeft={data.width / 2} widthRight={data.width / 2} />

			<BaseButton onclick={makeCircle} theme="link-secondary" class="me-auto flex items-center text-sm underline"><Circle class="mr-1 size-4" /> Make circle</BaseButton>
		{/snippet}

		{@render SnippetSVG()}
	</Preview>
{:else}
	{@render SnippetSVG()}
{/if}
