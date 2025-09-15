<script lang="ts">
	import NoItems from '$lib/components/NoItems.svelte';
	import { resolveFamilyLayout, resolveItemLayout } from '$lib/data/layouts';
	import type { Entry, EntryFamily, EntryItem } from '$lib/data/indexer';

	type Props = {
		entries?: Entry[];
		entry?: EntryItem;
		family?: EntryFamily;
	};

	const { entries, entry, family }: Props = $props();
</script>

{#if entries}
	{@const Layout = resolveFamilyLayout(family)}
	<Layout {entries} {family} />
{:else if entry}
	{@const Layout = resolveItemLayout(entry)}
	<Layout {entry} />
{:else}
	<NoItems class="text-center" />
{/if}
