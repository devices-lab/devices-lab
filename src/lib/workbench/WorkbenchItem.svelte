<script lang="ts">
	import BaseCard from '$lib/components/BaseCard.svelte';
	import BaseLink from '$lib/components/interactive/BaseLink.svelte';
	import BaseIcon from '$lib/components/BaseIcon.svelte';

	import type { WorkbenchItem } from '$lib/data/workbench';
	import { ChevronRight, ExternalLink } from '@lucide/svelte';

	const { item }: { item: WorkbenchItem } = $props();
</script>

<BaseCard scale="small" hover>
	<BaseLink href={item.href ?? ''} target={item.external ? '_blank' : '_self'} class="flex justify-between">
		<div class="flex items-center space-x-4">
			<BaseIcon icon={item.icon} fallback={item.title} class="size-8" />
			<div>
				<h2 class="text-sm/6 font-semibold text-gray-900 dark:text-white">{item.title}</h2>
				<p class="text-xs/5 font-normal text-gray-700 dark:text-gray-400">{item.subtitle}</p>
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
</BaseCard>
