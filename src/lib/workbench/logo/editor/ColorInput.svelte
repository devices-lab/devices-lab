<script lang="ts">
	import ColorField from '$lib/workbench/logo/editor/ColorField.svelte';
	import Reset from '$lib/workbench/logo/editor/Reset.svelte';

	let { label, value = $bindable(), default: defaultValue }: { label: string; value: string; default: string } = $props();
</script>

<div>
	<span class="block text-sm/6 font-medium text-gray-900 dark:text-white">
		{label}
		<span class="text-gray-500 dark:text-gray-400"> (default: {defaultValue})</span>
	</span>
	<div class="flex items-center gap-3 rounded-lg">
		<ColorField bind:color={value} default={defaultValue} />
		<Reset onclick={() => (value = defaultValue)} />
	</div>
</div>
