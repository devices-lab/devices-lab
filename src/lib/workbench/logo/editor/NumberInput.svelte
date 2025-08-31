<script lang="ts">
	import Reset from './Reset.svelte';
	import BaseInput from '$lib/components/BaseInput.svelte';

	let { label, value = $bindable(), default: defaultValue, ...props }: { label: string; value: number; default: number, [key: string]: any } = $props();
</script>

<div>
	<span class="block text-sm/6 font-medium text-gray-900 dark:text-white">
		{label}
		<span class="text-gray-500 dark:text-gray-400"> (default: {defaultValue})</span>
	</span>
	<div class="flex rounded-lg gap-3">
		<BaseInput type="number" name="value" bind:value placeholder={defaultValue.toString()} class="w-1/3" {...props} />
		<BaseInput type="range" name="value" bind:value class="flex-1 outline-none" {...props} />
		<Reset onclick={() => (value = defaultValue)} />
	</div>
</div>
