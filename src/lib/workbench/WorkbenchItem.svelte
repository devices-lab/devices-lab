<script lang="ts">
	import BaseCard from '$lib/components/BaseCard.svelte';
	import IconText from '$lib/components/base/IconText.svelte';
	import type { WorkbenchItem } from '$lib/data/workbench';
	import { ChevronRight, ExternalLink } from '@lucide/svelte';

	const { item }: { item: WorkbenchItem } = $props();
</script>

<BaseCard link={{ href: item.href }} class="mx-auto max-w-2xl rounded-lg px-8 py-5">
	<div class="flex w-full flex-1 items-center justify-between">
		<div class="flex items-center space-x-4">
			<IconText icon={{ icon: item.icon, fallback: item.title, class: 'size-8 text-gray-600 dark:text-gray-200' }} />
			<div>
				<h2 class="text-sm/6 font-semibold text-gray-900 dark:text-white">{item.title}</h2>
				<p class="text-xs/5 font-normal text-gray-700 dark:text-gray-400">{item.subtitle}</p>
			</div>
		</div>

		<!-- Icon -->
		<div class="mx-3 transition-transform group-hover:mr-2">
			{#if item.external}
				<ExternalLink class="size-6 text-gray-400" />
			{:else}
				<ChevronRight class="size-6 text-gray-400" />
			{/if}
		</div>
	</div>
</BaseCard>
