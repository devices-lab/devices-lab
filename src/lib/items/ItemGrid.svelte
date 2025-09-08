<script lang="ts">
	import NoItems from '$lib/components/NoItems.svelte';
	import type { _ItemType } from '$lib/data/item';
	import ItemCard from '$lib/items/ItemCard.svelte';

	const { items }: { items: _ItemType[] } = $props();
</script>


{#if items.length}
	<section aria-labelledby="items-heading" class="mt-6">
		<h2 id="items-heading" class="sr-only">Items</h2>

		<div class="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-10">
			{#each items as item}
				<ItemCard {item} />
			{/each}
		</div>
	</section>
{:else}
	<NoItems />
{/if}
