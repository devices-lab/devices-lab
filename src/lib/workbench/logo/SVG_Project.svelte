<script lang="ts">
	import { LOGO_DOMAIN, calculateTextWidth } from '$lib/workbench/logo/utils';
	import { clamp } from '$lib/utils';
	
	import { untrack } from 'svelte';
	import type { ClassValue } from 'svelte/elements';
	
	import NumberInput from '$lib/workbench/logo/editor/NumberInput.svelte';
	import ColorInput from '$lib/workbench/logo/editor/ColorInput.svelte';
	import SVG from '$lib/workbench/logo/components/SVG.svelte';
	import Rect from '$lib/workbench/logo/components/Rect4.svelte';
	import Text from '$lib/workbench/logo/components/Text3.svelte';
	import InputGroup from '$lib/workbench/logo/editor/InputGroup.svelte';
	import Preview from '$lib/workbench/logo/editor/Preview.svelte';
	
	//======================================================================================//

	type Border = {
		radius: number;
		width: number;
		color: string;
	};

	type Section = {
		text: string;
		height: number;
		fontSize: number;
		color: string;
		fill: string;
		boldness: number;
		offsetX: number;
		offsetY: number;
	};

	type Data = {
		uid: string;
		paddingX: number;
		border: Border;
		top: Section;
		bottom: Section;
	}

	//======================================================================================//

	interface Props {
		uid: string;
		projectName: string;
		class?: ClassValue;
		props?: Record<string, any>;
	}

	const { uid, projectName, class: className = '', props = {} }: Props = $props();

	const Defaults: Data = {
		uid: uid,
		paddingX: 80,
		border: {
			radius: 40,
			width: 10,
			color: '#000000'
		},
		top: {
			text: LOGO_DOMAIN,
			height: 120,
			fontSize: 84,
			color: '#ffffff',
			fill: '#000000',
			boldness: 1,
			offsetX: 0,
			offsetY: -5
		},
		bottom: {
			text: `/${projectName}`,
			height: 120,
			fontSize: 84,
			color: '#000000',
			fill: '#ffffff',
			boldness: 0,
			offsetX: 0,
			offsetY: -10
		}
	};

	//======================================================================================//

	let preview: Preview | undefined = $state();
	let loadedData: Data | undefined = $state();

	const defaultData: Data = $state({ ...Defaults, ...props });
	const data: Data = $derived(loadedData ?? defaultData);
	const dataString = $derived(JSON.stringify(data, null, 4));

	const textWidthTop = $derived(calculateTextWidth(data.top.text, data.top.fontSize));
	const textWidthBottom = $derived(calculateTextWidth(data.bottom.text, data.bottom.fontSize));

	const origin = $derived({ x: data.border.width / 2, y: data.border.width / 2 });
	const height = $derived(data.top.height + data.bottom.height);
	const width = $derived(Math.max(textWidthTop, textWidthBottom) + data.paddingX);

	const hasBorder = $derived(data.border.color !== 'none');
	const maxRadius = $derived(Math.min(height / 2, width / 2 || height, data.top.height, data.bottom.height));

	const topBold = $derived({ 'data-synthetic-bold': data.top.boldness !== 0 ? 'true' : 'false', 'data-bold-strength': data.top.boldness.toString() });
	const topTextX = $derived(width * 0.5 + data.top.offsetX);
	const topTextY = $derived(data.top.height * 0.5 + data.top.offsetY);

	const bottomBold = $derived({ 'data-synthetic-bold': data.bottom.boldness !== 0 ? 'true' : 'false', 'data-bold-strength': data.bottom.boldness.toString() });
	const bottomTextX = $derived(width * 0.5 + data.bottom.offsetX);
	const bottomTextY = $derived(data.bottom.height * 0.5 + data.bottom.offsetY + data.top.height);

	// Save and restore the border width when toggling wether the border is enabled
	let prevBorderWidth = Defaults.border.width;
	function updateBorderColor(color: string | 'none') {
		untrack(() => {
			if (color === 'none') {
				prevBorderWidth = data.border.width;
				data.border.width = 0;
			} else if (data.border.color === 'none') {
				data.border.width = prevBorderWidth;
			}
			data.border.color = color;
		});
	}

	// Clamp the border radius to the maximum radius
	$effect(() => {
		data.border.radius = clamp(data.border.radius, 0, maxRadius);
	});

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
</script>

<Preview {uid} bind:this={preview} dataString={dataString} bind:data={loadedData}>
	{#snippet config()}
		<!-- prettier-ignore -->
		<InputGroup label="Common">
			<NumberInput 	label="Padding (width)" 	bind:value={data.paddingX} 			initial={Defaults.paddingX} 		min={0} max={1000} />
			<NumberInput 	label="Border Radius" 		bind:value={data.border.radius} 	initial={Defaults.border.radius} 	min={0} max={maxRadius} />
			<NumberInput 	label="Border width" 		bind:value={data.border.width} 		initial={Defaults.border.width} 	min={0} max={hasBorder ? height : 0} />
			<ColorInput 	label="Border color" 		bind:value={() => data.border.color, updateBorderColor} initial={Defaults.border.color} />
		</InputGroup>

		<!-- prettier-ignore -->
		<InputGroup label="Top section">
			<NumberInput 	label="Height" 				bind:value={data.top.height}		initial={Defaults.top.height} 		min={0} max={1000} />
			<NumberInput 	label="Font size" 			bind:value={data.top.fontSize} 		initial={Defaults.top.fontSize} 	min={10} max={500} />
			<NumberInput 	label="Text Offset (X)" 	bind:value={data.top.offsetX} 		initial={Defaults.top.offsetX} 		min={-100} max={100} />
			<NumberInput 	label="Text Offset (Y)" 	bind:value={data.top.offsetY} 		initial={Defaults.top.offsetY} 		min={-100} max={100} />
			<ColorInput 	label="Fill color" 			bind:value={data.top.fill} 			initial={Defaults.top.fill} 		/>
			<ColorInput 	label="Text color" 			bind:value={data.top.color} 		initial={Defaults.top.color} 		/>
			<NumberInput 	label="Boldness" 			bind:value={data.top.boldness} 		initial={Defaults.top.boldness} 	min={0} max={20} step={0.01} />
		</InputGroup>

		<!-- prettier-ignore -->
		<InputGroup label="Bottom section">
			<NumberInput 	label="Height" 				bind:value={data.bottom.height} 	initial={Defaults.bottom.height} 	min={0} max={1000} />
			<NumberInput 	label="Font size" 			bind:value={data.bottom.fontSize} 	initial={Defaults.bottom.fontSize} 	min={10} max={500} />
			<NumberInput 	label="Text Offset (X)" 	bind:value={data.bottom.offsetX} 	initial={Defaults.bottom.offsetX} 	min={-100} max={100} />
			<NumberInput 	label="Text Offset (Y)" 	bind:value={data.bottom.offsetY} 	initial={Defaults.bottom.offsetY} 	min={-100} max={100} />
			<ColorInput 	label="Fill color" 			bind:value={data.bottom.fill} 		initial={Defaults.bottom.fill} 		/>
			<ColorInput 	label="Text color" 			bind:value={data.bottom.color} 		initial={Defaults.bottom.color} 	/>
			<NumberInput 	label="Boldness" 			bind:value={data.bottom.boldness} 	initial={Defaults.bottom.boldness} 	min={0} max={20} step={0.01} />
		</InputGroup>
	{/snippet}

	<SVG {uid} width={width + data.border.width} height={height + data.border.width} class={className}>
		<!-- Top section -->
		<Rect type="path" role="subject" {origin} dx={0} dy={0} {width} height={data.top.height} radius={data.border.radius} fill={data.top.fill} topLeft topRight />
		<Text role="clip" {origin} dx={topTextX} dy={topTextY} text={data.top.text} fontSize={data.top.fontSize} width={textWidthTop} color={data.top.color} {...topBold} />
		<!-- Bottom section -->
		<Rect type="path" role="ignore" {origin} dx={0} dy={data.top.height} {width} height={data.bottom.height} radius={data.border.radius} fill={data.bottom.fill} bottomLeft bottomRight />
		<Text role="clip" {origin} dx={bottomTextX} dy={bottomTextY} text={data.bottom.text} fontSize={data.bottom.fontSize} width={textWidthBottom} color={data.bottom.color} {...bottomBold} />
		<!-- Border -->
		<Rect type="path" role="frame" {origin} {width} {height} radius={data.border.radius} borderColor={data.border.color} borderWidth={data.border.width} topLeft topRight bottomLeft bottomRight />
	</SVG>
</Preview>
