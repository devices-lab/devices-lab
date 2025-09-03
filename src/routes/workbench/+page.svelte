<script lang="ts">
	import type { PageProps } from './$types';
	import WorkbenchItem from '$lib/workbench/WorkbenchItem.svelte';

	const { data }: PageProps = $props();
</script>

<ul role="list" class="flex flex-col gap-y-4">
	{#each data.workbench as item}
		<li class="">
			<WorkbenchItem {item} />
		</li>
	{/each}
</ul>
