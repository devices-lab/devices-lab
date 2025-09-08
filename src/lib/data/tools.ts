//import { type ItemType, modulesToItems, modulesToVisibleItems, modulesToFeaturedItems } from "$lib/data/item";
//import { modules } from '$tools/tools';
//import { Routes } from "$lib/data/routes";

import { tools as toolList } from '$lib/_content/data'
import type { ItemType } from './item';

// Collect all items
export const toolsCatalog: ItemType[] = toolList; //modulesToItems(modules);
// Items visible in the main page
export const tools: ItemType[] = toolList.filter(item => item.visible); //modulesToVisibleItems(modules);
// Items marked as featured
export const toolsFeatured: ItemType[] = toolList.filter(item => item.featured); //modulesToFeaturedItems(modules, Routes.tools);



