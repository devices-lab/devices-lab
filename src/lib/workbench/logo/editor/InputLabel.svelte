<script lang="ts">
	const { label, initial }: { label: string; initial: string | number } = $props();
</script>

<span class="text-sm/6 font-medium text-gray-900 dark:text-gray-200">
	{label}
	<span class="font-normal text-gray-500 italic dark:text-gray-400"> (default: {initial})</span>
</span>
