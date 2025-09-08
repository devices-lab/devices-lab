<script lang="ts">
	import BaseInput from '$lib/components/BaseInput.svelte';
	import BaseCheckbox from '$lib/workbench/logo/inputs/BaseCheckbox.svelte';

	let { color = $bindable(), default: defaultColor }: { color: string; default: string } = $props();

	let enabled = $derived(color !== 'none');
	let tempColor = defaultColor;

	const getColor = () => {
		return (color === 'none' ? tempColor : color);
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

<BaseInput type="color" name="colorField" bind:value={getColor, setColor} class="h-[30px] min-w-1/3 appearance-none py-1.5 px-3" disabled={!enabled} />

<div class="flex grow items-center gap-x-2">
	<BaseCheckbox bind:checked={getEnable, setEnable}>
		<span class="text-sm font-medium text-gray-900 dark:text-gray-100">Enabled?</span>
	</BaseCheckbox>
</div>
