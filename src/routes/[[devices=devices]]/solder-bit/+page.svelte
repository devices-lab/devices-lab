<script lang="ts">
	import { type ItemType, modulesToItems } from '$lib/items/item';
	import ItemGrid from '$lib/items/Grid.svelte';

	// Use vite to import all device files
	const modules = import.meta.glob('./*/**/about.ts', { eager: true }) as Record<string, { item: ItemType }>;
	const devices: ItemType[] = modulesToItems(modules);
</script>

<ItemGrid items={devices} />