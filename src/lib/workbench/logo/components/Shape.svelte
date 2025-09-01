<script lang="ts">
	import ColorInput from '$lib/workbench/logo/editor/ColorInput.svelte';
	import InputGroup from '$lib/workbench/logo/editor/InputGroup.svelte';
	import NumberInput, { type InputType } from '$lib/workbench/logo/editor/NumberInput.svelte';

	import Rect from '$lib/workbench/logo/components/Rect4.svelte';
	import Text from '$lib/workbench/logo/components/Text3.svelte';

	import { textWidth as calculateTextWidth, type SVG_Role } from '$lib/workbench/logo/utils';
	import { onMount, type Snippet } from 'svelte';
	import type { Attachment } from 'svelte/attachments';

	const Defaults = {
		offsetX: 0,
		offsetY: 0,
		fontSize: 84,
		boldness: 1,
		color: '#000000',
		fill: '#ffffff',
		rounded: {
			topLeft: false,
			topRight: false,
			bottomLeft: false,
			bottomRight: false
		}
	};

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
		config?: Snippet<[string, Boolean?]>;
		textWidth: number;
	}

	let { roleShape, roleText, origin, dx, dy, width, height, radius, text, settings, config = $bindable(), textWidth = $bindable() }: Props = $props();
	onMount(() => {
		config = Settings;
	});

	let offsetX = $state(0);
	let offsetY = $state(0);
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

	// prettier-ignore
	const Params: Record<string, InputType> = $derived({
		offsetX: 		{ initial: Defaults.offsetX, 	min: -100, 	max: 100 },
		offsetY: 		{ initial: Defaults.offsetY, 	min: -100, 	max: 100 },
		fontSize: 		{ initial: Defaults.fontSize, 	min: 10, 	max: 500 },
		boldness: 		{ initial: Defaults.boldness, 	min: 0, 	max: 20, 	step: 0.01 },
	});
</script>

{#snippet Settings(label: string, hidden: Boolean = false)}
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
