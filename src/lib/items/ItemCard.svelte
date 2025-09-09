<script lang="ts">
	import BaseCard from '$lib/components/BaseCard.svelte';
	import BaseImg from '$lib/components/BaseImg.svelte';
	import BaseLink from '$lib/components/interactive/BaseLink.svelte';
	import type { Entry } from '$lib/data/indexer';
	import FeaturedLabel from '$lib/items/featured/FeaturedLabel.svelte';

	type Props = {
		entry: Entry;
	};

	const { entry }: Props = $props();

	const isFamily = $derived(entry.kind === 'family');
</script>

{#key entry}
	<BaseCard hover>
		<BaseLink link={entry.path}>
			<BaseImg src={entry.thumb} alt="Item hero" class="aspect-square w-full rounded-lg object-contain" />
			<div class="mt-4 flex items-center text-base font-medium text-gray-900 dark:text-white {isFamily ? 'mb-2' : ''}">
				{#if isFamily}
					<span class="me-2 inline-block rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-600 dark:text-white">Family</span>
				{/if}
				<h2>{entry.item.name}</h2>
			</div>
			<p class="mt-1 text-sm text-gray-600 dark:text-gray-400">{entry.item.teaser}</p>

			{#if entry.item.tags && entry.item.tags.length}
				<p class="mt-2 text-sm text-gray-400 italic dark:text-gray-600">tags: {entry.item.tags.join(', ')}</p>
			{/if}

			{#if entry.item.featured}
				<FeaturedLabel class="absolute top-3 left-1 sm:top-4 sm:left-2" />
			{/if}
		</BaseLink>
	</BaseCard>
{/key}
