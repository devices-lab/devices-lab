<script lang="ts">
	import type { ItemType } from '$lib/data/item';
	import Feature from '$lib/items/common/Feature.svelte';

	const { item }: { item: ItemType } = $props();
</script>

<h1 class="flex items-end text-2xl font-bold tracking-tight wrap-break-word text-gray-900 sm:text-3xl dark:text-white">
	{#if item.featured}
		<Feature class="relative -ms-7 me-1 pb-2" />
	{/if}

	{item.name}
</h1>
