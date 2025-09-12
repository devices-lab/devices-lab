<script lang="ts">
	import type { PageProps } from './$types';
	import WorkbenchItem from '$lib/workbench/WorkbenchItem.svelte';

	const { data }: PageProps = $props();
</script>

<div class="flex flex-col gap-y-6">
	{#each data.workbench as item}
		<WorkbenchItem {item} />
	{/each}
</div>
