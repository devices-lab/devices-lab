<script lang="ts">
	import NoItems from '$lib/components/NoItems.svelte';
	import ItemGrid from '$lib/items/ItemGrid.svelte';
	import ItemPage from '$lib/items/page/ItemPage.svelte';
	import type { PageProps } from './$types';

	

	const { data }: PageProps = $props();
</script>

{#if data.item.family && data.item.family.length > 0}
	<ItemGrid items={data.item.family} />
{:else if data.item.family}
	<ItemPage item={data.item} />
{:else}
	<NoItems class="text-center" />
{/if}
