<script lang="ts">
	import { page } from '$app/state';

	import { type ItemType, modulesToItems } from '$lib/data/item';
	import ItemGrid from '$lib/items/ItemGrid.svelte';

	// Use vite to import all device files
	const modules = import.meta.glob('./*/**/about.ts', { eager: true, import: 'item' }) as Record<string, ItemType>;
	const devices: ItemType[] = modulesToItems(modules);
</script>

<ItemGrid items={devices} />