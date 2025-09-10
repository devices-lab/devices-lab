<script lang="ts">
	import BaseCard from '$lib/components/BaseCard.svelte';
	import IconText from '$lib/components/icons/IconText.svelte';
	import BaseLink from '$lib/components/interactive/BaseLink.svelte';
	import type { WorkbenchItem } from '$lib/data/workbench';
	import { ChevronRight, ExternalLink } from '@lucide/svelte';

	const { item }: { item: WorkbenchItem } = $props();
</script>

<BaseCard link={{href: item.href, external: item.external}} class="w-xl py-4 px-6 flex justify-between">

		<div class="flex items-center space-x-4">
			<IconText icon={{ icon: item.icon, fallback: item.title, class: 'size-8 text-gray-600 dark:text-gray-200' }} />
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
	
</BaseCard>
