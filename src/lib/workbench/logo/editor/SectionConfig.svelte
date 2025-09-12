<script lang="ts">
	import { Triangle } from '@lucide/svelte';
	import ColorInput from '../inputs/ColorInput.svelte';
	import InputGroup from '../inputs/InputGroup.svelte';
	import NumberInput from '../inputs/NumberInput.svelte';

	export type SectionData = {
		offsetX: number;
		offsetY: number;
		fontSize: number;
		boldness: number;
		fill: string;
		color: string;
	};

	type Props = {
		label: string;
		section: SectionData;
		defaults: SectionData;
	};

	let { label, section = $bindable(), defaults }: Props = $props();
</script>

<!-- prettier-ignore -->
<InputGroup {label}>
	<NumberInput 	label={{label: "X", pre: Triangle}} 	bind:value={section.offsetX} 	initial={defaults.offsetX} 		min={-100} max={100} />
	<NumberInput 	label={{label: "Y", pre: Triangle}} 	bind:value={section.offsetY} 	initial={defaults.offsetY} 		min={-100} max={100} />
	<NumberInput 	label="Font size" 						bind:value={section.fontSize} 	initial={defaults.fontSize} 	min={10} max={500} />
	<NumberInput 	label="Boldness" 						bind:value={section.boldness} 	initial={defaults.boldness} 	min={0} max={20} step={0.01} />
	<ColorInput 	label="Fill color" 						bind:value={section.fill} 		initial={defaults.fill} 		/>
	<ColorInput 	label="Text color" 						bind:value={section.color} 		initial={defaults.color} 		/>
</InputGroup>
