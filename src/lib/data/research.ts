import { type ItemType, modulesToItems, modulesToVisibleItems, modulesToFeaturedItems } from "$lib/data/item";
import { modules } from '$research/research'
import { Routes } from "$lib/data/routes";

// Collect all items
export const researchCatalog: ItemType[] = modulesToItems(modules);
// Items visible in the main page
export const research: ItemType[] = modulesToVisibleItems(modules);
// Items marked as featured
export const researchFeatured: ItemType[] = modulesToFeaturedItems(modules, Routes.research);



