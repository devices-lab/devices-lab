<script lang="ts">
	import Checkbox from '$lib/components/base/Checkbox.svelte';
	import BaseInput from '$lib/workbench/logo/inputs/BaseInput.svelte';

	let { color = $bindable(), default: defaultColor }: { color: string; default: string } = $props();

	let enabled = $derived(color !== 'none');
	let tempColor = defaultColor;

	const getColor = () => {
		return color === 'none' ? tempColor : color;
	};
	const setColor = (newColor: string) => {
		color = newColor;
	};

	const getEnable = () => {
		return enabled;
	};
	const setEnable = (newEnabled: boolean) => {
		enabled = newEnabled;
		if (enabled) {
			color = tempColor;
		} else {
			tempColor = color;
			color = 'none';
		}
	};
</script>

<BaseInput type="color" name="colorField" bind:value={getColor, setColor} class="h-[30px] min-w-1/3 appearance-none px-3 py-1.5" disabled={!enabled} />
<Checkbox bind:checked={getEnable, setEnable} text={{ text: 'Enabled', class: 'text-sm' }} class="me-auto" />
