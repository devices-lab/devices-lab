<script lang="ts">
	import NoItems from '$lib/components/NoItems.svelte';
	import type { Entry } from '$lib/data/indexer';
	import ItemGrid from '$lib/items/ItemGrid.svelte';
	import ItemPage from '$lib/items/page/ItemPage.svelte';

	type Props = {
		entries?: Entry[];
		entry?: Entry;
		family: string;
	};

	const { entries, entry, family }: Props = $props();
</script>

{#if entries}
	<ItemGrid {entries} {family} />
{:else if entry}
	<ItemPage {entry} />
{:else}
	<NoItems class="text-center" />
{/if}
