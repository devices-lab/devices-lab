<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children, tooltip }: { children: Snippet; tooltip: Snippet } = $props();
</script>

<div class="group relative">
	<div class="flex-root">
		{@render children()}
	</div>
	<div class="absolute z-1000 hidden group-hover:block left-1/2 -translate-x-1/2 mt-1 isolate">
		<div class="rounded-md bg-white p-2 text-gray-800 shadow-lg dark:bg-gray-800 dark:text-gray-200">
			{@render tooltip()}
		</div>
	</div>
</div>
