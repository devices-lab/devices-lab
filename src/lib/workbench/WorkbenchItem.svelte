<script lang="ts">
	import BaseLink from '$lib/components/BaseLink.svelte';
	import IconLink from '$lib/workbench/IconLink.svelte';
	import IconArrow from '$lib/workbench/IconArrow.svelte';
	import Label from '$lib/workbench/Label.svelte';

	import type { WorkbenchItem } from '$lib/data/workbench';

	const { item }: { item: WorkbenchItem } = $props();
</script>

<BaseLink href={item.href} target={item.external ? '_blank' : '_self'} class="group flex justify-between rounded-full bg-white dark:bg-gray-800 p-4 shadow-sm hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700">
	<div class="flex items-center space-x-4">
		<!-- Label -->
		<Label label={item.label} />

		<!-- Info -->
		<div>
			<h2 class="text-sm/6 font-semibold text-gray-900 dark:text-white">{item.name}</h2>
			<p class="text-xs/5 font-normal text-gray-700 dark:text-gray-400">{item.description}</p>
		</div>
	</div>

	<!-- Icon -->
	<div class="ms-autof my-auto mr-3 transition-all group-hover:mr-2">
		{#if item.external}
			<IconLink />
		{:else}
			<IconArrow />
		{/if}
	</div>
</BaseLink>
