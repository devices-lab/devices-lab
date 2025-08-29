import { type ItemType, modulesToItems, modulesToVisibleItems, modulesToFeaturedItems } from "$lib/data/item";
import { modules } from '$tools/tools';
import { Routes } from "$lib/data/routes";

// Collect all items
export const toolsCatalog: ItemType[] = modulesToItems(modules);
// Items visible in the main page
export const tools: ItemType[] = modulesToVisibleItems(modules);
// Items marked as featured
export const toolsFeatured: ItemType[] = modulesToFeaturedItems(modules, Routes.tools);



