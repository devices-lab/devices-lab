<script lang="ts">
	import BaseInput from '$lib/components/BaseInput.svelte';
	import Checkbox from './Checkbox.svelte';

	let { color = $bindable(), default: defaultColor }: { color: string, default: string } = $props();

	let value = $derived(color === 'none' ? defaultColor : color);
	let enabled = $derived(color !== 'none');

	/*
	const hexString = $derived(
		Math.round(alpha * 255)
			.toString(16)
			.padStart(2, '0')
	);
	const hexColor = $derived(hasAlpha ? (color + hexString) : 'none');
	*/

	$effect(() => {
		color = enabled ? value : 'none';
	});
</script>

<BaseInput type="color" name="colorField" bind:value class="h-[36px] w-1/3 appearance-none" disabled={!enabled} />

<!--
<div class="flex grow items-center gap-x-2">
	<label for="alpha" class="text-sm font-medium text-gray-500 dark:text-gray-400">Alpha:</label>
	<input id="alpha" class="h-2 w-full appearance-none bg-gray-200" type="range" min="0" max="1" step="0.01" bind:value={alpha} />
</div>
-->

<div class="flex grow items-center gap-x-2">
	<Checkbox bind:checked={enabled} label="Enabled?" />
</div>
