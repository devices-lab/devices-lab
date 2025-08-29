import { type ItemType, modulesToItems, modulesToVisibleItems, modulesToFeaturedItems } from "$lib/data/item";
import { modules } from '$devices/devices'
import { Routes } from "$lib/data/routes";

// Collect all items
export const devicesCatalog: ItemType[] = modulesToItems(modules);
// Items visible in the main page
export const devices: ItemType[] = modulesToVisibleItems(modules);
// Items marked as featured
export const devicesFeatured: ItemType[] = modulesToFeaturedItems(modules, Routes.devices);



