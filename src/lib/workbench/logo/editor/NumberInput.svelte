<script lang="ts">
	import Reset from './Reset.svelte';
	import BaseInput from '$lib/components/BaseInput.svelte';

	let { label, value = $bindable(), default: defaultValue, min = 0, max = 100, step = 1 }: { label: string; value: number; default: number, min?: number, max?: number, step?: number } = $props();

</script>

<div class="flex flex-col">
	<span class="text-sm/6 font-medium text-gray-900 dark:text-white">
		{label}
		<span class="text-gray-500 dark:text-gray-400"> (default: {defaultValue})</span>
	</span>
	<div class="flex rounded-lg gap-3 items-center justify-between">
		<BaseInput type="number" name="value" bind:value placeholder={defaultValue.toString()} class="h-[36px] min-w-1/3 appearance-none" {min} {max} {step} />
		<BaseInput type="range" name="value" bind:value class="h-[36px] w-full outline-none" {min} {max} {step} />
		<Reset onclick={() => (value = defaultValue)} class=""/>
	</div>
</div>
