import { type ItemType, modulesToItems, modulesToVisibleItems, modulesToFeaturedItems } from "$lib/items/item";

// Use vite to import all item files
const modules = import.meta.glob("./**/about.ts", { eager: true }) as Record<string, { item: ItemType }>;

// Collect all items
export const devicesCatalog: ItemType[] = modulesToItems(modules);
// Items visible in the main page
export const devices: ItemType[] = modulesToVisibleItems(modules);
// Items marked as featured
export const devicesFeatured: ItemType[] = modulesToFeaturedItems(modules);



