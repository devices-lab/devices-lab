<script lang="ts">
	import ItemGrid from '$lib/items/ItemGrid.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<ItemGrid items={data.devices} />
