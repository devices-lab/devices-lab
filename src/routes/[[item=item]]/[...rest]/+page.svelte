<script lang="ts">
	import ItemEntry from '$lib/items/ItemEntry.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<ItemEntry entries={data.entries} entry={data.entry} />
