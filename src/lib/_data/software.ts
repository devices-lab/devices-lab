import { type ItemType, modulesToItems, modulesToVisibleItems, modulesToFeaturedItems } from "$lib/_data/item";
import { modules } from '$tools/software';
import { Routes } from "$lib/_data/routes";

// Collect all items
export const softwareCatalog: ItemType[] = modulesToItems(modules);
// Items visible in the main page
export const software: ItemType[] = modulesToVisibleItems(modules);
// Items marked as featured
export const softwareFeatured: ItemType[] = modulesToFeaturedItems(modules, Routes.software);



