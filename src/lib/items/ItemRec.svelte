<script lang="ts">
	import NoItems from '$lib/components/NoItems.svelte';
	import type { _ItemType } from '$lib/data/item';
	import ItemCard from '$lib/items/ItemCard.svelte';


	import type { DeviceNode, FamilyNode } from '$lib/data/devices-tree';
	


	type Props = {
		family: FamilyNode;
	};

	const { family }: Props = $props();

	


</script>

<!--
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
-->





{#each family.children as node}

	{#if node.kind === 'device'}
		<ItemCard item={node.item as _ItemType}  />

	{:else if node.kind === 'family'}
		<!-- recurse -->
	
	{:else}
		<NoItems />
	{/if}
	<!-- {#if node.children.length > 0}
		<h2 class="mt-8 mb-4 text-2xl font-bold">{node.name}</h2>
		<ItemGrid items={collectAllDevices(node)} />
	{/if} -->
{/each}