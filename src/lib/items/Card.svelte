<script lang="ts">
	import Card from '$lib/components/Card2.svelte';
	import type { ItemType } from '$lib/items/item';

	const { item }: { item: ItemType } = $props();
</script>


<Card tag="a" href={item.href} class="p-5" hover={true}>
	<enhanced:img src={item.cover} alt="Item hero" class="aspect-square w-full rounded-lg object-contain" />
	<div class="mt-4 flex items-center text-base font-medium text-gray-900 dark:text-white {item.group ? 'mb-2' : ''}">
		{#if item.group}
			<span class="me-2 inline-block rounded-full bg-gray-200 dark:bg-gray-600 px-2 py-1 text-xs font-semibold text-gray-700 dark:text-white">Family</span>
		{/if}
		<h2 class="">{item.name}</h2>
	</div>
	<p class="mt-1 text-sm text-gray-600 dark:text-gray-400">{item.teaser}</p>

	{#if item.tags.length}
		<p class="mt-2 text-sm text-gray-400 italic dark:text-gray-600">tags: {item.tags.join(', ')}</p>
	{/if}
</Card>

