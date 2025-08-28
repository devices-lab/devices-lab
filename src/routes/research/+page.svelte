<script lang="ts">
	import type { PageProps } from './$types';

	import ItemGrid from '$lib/items/Grid.svelte';

	const { data }: PageProps = $props();
</script>

<ItemGrid items={data.research} />
