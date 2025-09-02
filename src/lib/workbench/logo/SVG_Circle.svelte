<script lang="ts">
	import { calculateTextWidth } from '$lib/workbench/logo/utils';
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
		width: number;
		color: string;
	};

	type Data = {
		uid: string;
		text: string;
		diameter: number;
		offsetX: number;
		offsetY: number;
		color: string;
		fill: string;
		fontSize: number;
		boldness: number;
		border: Border;
	}

	//======================================================================================//

	interface Props {
		uid: string;
		class?: ClassValue;
		props?: Record<string, any>;
	}

	const { uid, class: className = '', props = {} }: Props = $props();

	const Defaults: Data = {
		uid: uid,
		text: 'DL',
		diameter: 220,
		offsetX: 0,
		offsetY: 0,
		color: '#ffffff',
		fill: '#000000',
		fontSize: 150,
		boldness: 1.5,
		border: {
			width: 0,
			color: '#000000'
		}
	};

	//======================================================================================//

	let preview: Preview | undefined = $state();
	let loadedData: Data | undefined = $state();

	const defaultData: Data = $state({ ...Defaults, ...props });
	const data: Data = $derived(loadedData ?? defaultData);
	const dataString = $derived(JSON.stringify(data, null, 4));

	const textWidth = $derived(calculateTextWidth(data.text, data.fontSize));
	

	const origin = $derived({ x: data.border.width / 2, y: data.border.width / 2 });


	const hasBorder = $derived(data.border.color !== 'none');
	const maxRadius = $derived(data.diameter / 2);

	const bold = $derived({ 'data-synthetic-bold': data.boldness !== 0 ? 'true' : 'false', 'data-bold-strength': data.boldness.toString() });
	const textX = $derived(data.diameter * 0.5 + data.offsetX);
	const textY = $derived(data.diameter * 0.5 + data.offsetY);


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
			<NumberInput 	label="Diameter" 	bind:value={data.diameter}			initial={Defaults.diameter} 		min={0} max={500} />
			<ColorInput 	label="Fill" 		bind:value={data.fill} 				initial={Defaults.fill} 			/>
		</InputGroup>

		<!-- prettier-ignore -->
		<InputGroup label="Text">
			<NumberInput 	label="Offset (X)" 	bind:value={data.offsetX} 			initial={Defaults.offsetX} 			min={-100} max={100} />
			<NumberInput 	label="Offset (Y)" 	bind:value={data.offsetY} 			initial={Defaults.offsetY} 			min={-100} max={100} />
			<NumberInput 	label="Font size" 	bind:value={data.fontSize} 			initial={Defaults.fontSize} 		min={10} max={250} />
			<NumberInput 	label="Boldness" 	bind:value={data.boldness} 			initial={Defaults.boldness} 		min={0} max={20} step={0.01} />
			<ColorInput 	label="Color" 		bind:value={data.color} 			initial={Defaults.color} 			/>
		</InputGroup>

		<!-- prettier-ignore -->
		<InputGroup label="Border">
			<NumberInput 	label="Width" 		bind:value={data.border.width} 		initial={Defaults.border.width} 	min={0} max={hasBorder ? data.diameter : 0} />
			<ColorInput 	label="Color" 		bind:value={() => data.border.color, updateBorderColor} initial={Defaults.border.color} />
		</InputGroup>
	{/snippet}

	<SVG {uid} width={data.diameter + data.border.width} height={data.diameter + data.border.width} class={className}>
		<Rect type="path" role="subject" {origin} dx={0} dy={0} width={data.diameter} height={data.diameter} radius={data.diameter / 2} fill={data.fill} topLeft topRight bottomLeft bottomRight />
		<Text role="clip" {origin} dx={textX} dy={textY} text={data.text} fontSize={data.fontSize} width={textWidth} color={data.color} {...bold} />

		<!-- Border -->
		<Rect type="path" role="frame" {origin} width={data.diameter} height={data.diameter} radius={data.diameter / 2} borderColor={data.border.color} borderWidth={data.border.width} topLeft topRight bottomLeft bottomRight />
	</SVG>
</Preview>

