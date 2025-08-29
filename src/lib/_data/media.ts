import { type ItemType, modulesToItems, modulesToVisibleItems, modulesToFeaturedItems } from "$lib/_data/item";
import { modules } from '$media/media'
import { Routes } from "$lib/_data/routes";

// Collect all items
export const mediaCatalog: ItemType[] = modulesToItems(modules);
// Items visible in the main page
export const media: ItemType[] = modulesToVisibleItems(modules);
// Items marked as featured
export const mediaFeatured: ItemType[] = modulesToFeaturedItems(modules, Routes.media);



