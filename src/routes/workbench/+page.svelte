<script lang="ts">
	import type { PageProps } from './$types';
	import WorkbenchItem from '$lib/workbench/WorkbenchItem.svelte';

	const { data }: PageProps = $props();
</script>

<ul role="list" class="divide-y divide-gray-100 dark:divide-white/5">
	{#each data.workbench as item}
		<li class="py-4">
			<WorkbenchItem {item} />
		</li>
	{/each}
</ul>
