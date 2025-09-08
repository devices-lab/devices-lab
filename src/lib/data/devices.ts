//import { type ItemType, modulesToItems, modulesToVisibleItems, modulesToFeaturedItems } from "$lib/data/item";
//import { modules } from '$devices/devices'
//import { Routes } from "$lib/data/routes";

import {devices as devicesList} from '$lib/_content/data'
import type { ItemType } from './item';

// Collect all items
export const devicesCatalog: ItemType[] = devicesList; //modulesToItems(modules);
// Items visible in the main page
export const devices: ItemType[] = devicesList.filter(item => item.visible); //modulesToVisibleItems(modules);
// Items marked as featured
export const devicesFeatured: ItemType[] = devicesList.filter(item => item.featured); //modulesToFeaturedItems(modules, Routes.devices);



