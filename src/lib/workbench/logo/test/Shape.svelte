<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import ColorInput from '$lib/workbench/logo/inputs/ColorInput.svelte';
	import InputGroup from '$lib/workbench/logo/inputs/InputGroup.svelte';
	import NumberInput, { type InputType } from '$lib/workbench/logo/inputs/NumberInput.svelte';
	import { calculateTextWidth, type SVG_Role } from '$lib/workbench/logo/utils';

	import Rect from '$lib/workbench/logo/components/Rect.svelte';
	import Text from '$lib/workbench/logo/components/Text.svelte';

	// Config view for the shape settings
	export const configView = ConfigView;

	const Defaults = {
		offsetX: 0,
		offsetY: 0,
		fontSize: 84,
		boldness: 1,
		color: '#000000',
		fill: '#ffffff'
	};

	// prettier-ignore
	const Params: Record<string, InputType> = $derived({
		offsetX: 		{ initial: Defaults.offsetX, 	min: -100, 	max: 100 },
		offsetY: 		{ initial: Defaults.offsetY, 	min: -100, 	max: 100 },
		fontSize: 		{ initial: Defaults.fontSize, 	min: 10, 	max: 500 },
		boldness: 		{ initial: Defaults.boldness, 	min: 0, 	max: 20, 	step: 0.01 },
	});

	export interface ShapeSettings {
		fontSize?: number;
		boldness?: number;
		color?: string;
		fill?: string;
		rounded?: {
			topLeft?: boolean;
			topRight?: boolean;
			bottomLeft?: boolean;
			bottomRight?: boolean;
		};
	}

	interface Props {
		roleShape: SVG_Role;
		roleText: SVG_Role;

		origin: { x: number; y: number };
		dx: number;
		dy: number;
		width: number;
		height: number;

		radius: number;
		text: string;

		settings: ShapeSettings;
		textWidth: number;

		onchange?: () => void;
	}

	let { roleShape, roleText, origin, dx, dy, width, height, radius, text, settings, textWidth = $bindable(), onchange }: Props = $props();


	let offsetX = $state(Defaults.offsetX);
	let offsetY = $state(Defaults.offsetY);
	let fontSize = $state(settings.fontSize ?? Defaults.fontSize);
	let boldness = $state(settings.boldness ?? Defaults.boldness);
	let fill = $state(settings.fill ?? Defaults.fill);
	let color = $state(settings.color ?? Defaults.color);


	$effect(() => {
		textWidth = calculateTextWidth(`/${text}`, fontSize);
	});

	const bold = $derived({ 'data-synthetic-bold': boldness !== 0 ? 'true' : 'false', 'data-bold-strength': boldness.toString() });
	const textX = $derived(width * 0.5 + offsetX + dx);
	const textY = $derived(height * 0.5 + offsetY + dy);


	$effect(() => {
		offsetX;
		offsetY;
		fontSize;
		boldness;
		fill;
		color;
		textWidth;

		onchange?.();
	});

</script>

{#snippet ConfigView(label: string, hidden: Boolean = false)}
	<!-- prettier-ignore -->
	<InputGroup {label} {hidden}>
		<NumberInput label="Text Offset (X)" 	bind:value={offsetX} 	params={Params.offsetX} />
		<NumberInput label="Text Offset (Y)" 	bind:value={offsetY} 	params={Params.offsetY} />
		<NumberInput label="Font size" 			bind:value={fontSize} 	params={Params.fontSize} />
		<NumberInput label="Boldness" 			bind:value={boldness} 	params={Params.boldness} />
		<ColorInput label="Fill color" 			bind:value={fill} 		initial={settings.fill ?? Defaults.fill} />
		<ColorInput label="Text color" 			bind:value={color} 		initial={settings.color ?? Defaults.color} />
	</InputGroup>
{/snippet}

<Rect type="path" role={roleShape} {origin} {dx} {dy} {width} {height} {radius} {fill} {...settings.rounded} />
<Text role={roleText} {origin} dx={textX} dy={textY} {text} {fontSize} width={textWidth} {color} {...bold} />
