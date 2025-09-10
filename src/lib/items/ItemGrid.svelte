<script lang="ts">
	import NoItems from '$lib/components/NoItems.svelte';
	import type { Entry } from '$lib/data/indexer';
	import ItemCard from '$lib/items/ItemCard.svelte';
	import Filter from './Filter.svelte';

	type Props = {
		entries: Entry[];
	}

	const { entries }: Props = $props();
</script>


{#if entries.length}
	<section aria-labelledby="items-heading" class="mt-6">
		<h2 id="items-heading" class="sr-only">Items</h2>
		<Filter />
		<div class="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10 mt-3">
			{#each entries as entry}
				<ItemCard {entry} />
			{/each}
		</div>
	</section>
{:else}
	<NoItems class="text-center my-4"/>
{/if}
