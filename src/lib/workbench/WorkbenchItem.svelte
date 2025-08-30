<script lang="ts">
	import BaseLink from '$lib/components/BaseLink.svelte';

	import type { WorkbenchItem } from '$lib/data/workbench';
	import { ChevronRight, ExternalLink } from '@lucide/svelte';

	const { item }: { item: WorkbenchItem } = $props();
</script>

<BaseLink href={item.href} target={item.external ? '_blank' : '_self'} class="group flex justify-between rounded-full bg-white p-4 shadow-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
	<div class="flex items-center space-x-4">
		<!-- Label -->
		<span class="inline-flex items-center gap-x-1.5 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-400/10 dark:text-gray-400">
			{item.label}
		</span>

		<!-- Info -->
		<div>
			<h2 class="text-sm/6 font-semibold text-gray-900 dark:text-white">{item.name}</h2>
			<p class="text-xs/5 font-normal text-gray-700 dark:text-gray-400">{item.description}</p>
		</div>
	</div>

	<!-- Icon -->
	<div class="ms-autof my-auto mr-3 transition-all group-hover:mr-2">
		{#if item.external}
			<ExternalLink class="size-5 flex-none text-gray-400" />
		{:else}
			<ChevronRight class="size-5 flex-none text-gray-400" />
		{/if}
	</div>
</BaseLink>
