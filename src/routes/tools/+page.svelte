<script lang="ts">
	import type { PageProps } from './$types';
	import Tool from '$lib/tools/Tool.svelte';

	const { data }: PageProps = $props();
</script>

<ul role="list" class="divide-y divide-gray-100 dark:divide-white/5">
	{#each data.tools as tool}
		<li class="py-4">
			<Tool {tool} />
		</li>
	{/each}
</ul>
