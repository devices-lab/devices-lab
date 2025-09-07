<script lang="ts">
	import BaseImg from '$lib/components/BaseImg.svelte';
	import BaseLink from '$lib/components/interactive/BaseLink.svelte';
	import Feature from '$lib/items/common/Feature.svelte';
	import { type ItemType, getItemPath } from '$lib/data/item';
	import BaseCard from '$lib/components/BaseCard.svelte';

	const { item }: { item: ItemType } = $props();
</script>

<BaseCard hover>
	<BaseLink href={getItemPath(item)}>
		<BaseImg src={item.cover} alt="Item hero" class="aspect-square w-full rounded-lg object-contain" />
		<div class="mt-4 flex items-center text-base font-medium text-gray-900 dark:text-white {item.family ? 'mb-2' : ''}">
			{#if item.family}
				<span class="me-2 inline-block rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-600 dark:text-white">Family</span>
			{/if}
			<h2>{item.name}</h2>
		</div>
		<p class="mt-1 text-sm text-gray-600 dark:text-gray-400">{item.teaser}</p>

		{#if item.tags.length}
			<p class="mt-2 text-sm text-gray-400 italic dark:text-gray-600">tags: {item.tags.join(', ')}</p>
		{/if}

		{#if item.featured}
			<Feature class="absolute top-3 left-1 sm:top-4 sm:left-2" />
		{/if}
	</BaseLink>
</BaseCard>
