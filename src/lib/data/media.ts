//import { type ItemType, modulesToItems, modulesToVisibleItems, modulesToFeaturedItems } from "$lib/data/item";
//import { modules } from '$media/media'
//import { Routes } from "$lib/data/routes";

import { media as mediaList } from '$lib/_content/data'
import type { ItemType } from './item';

// Collect all items
export const mediaCatalog: ItemType[] = mediaList; //modulesToItems(modules);
// Items visible in the main page
export const media: ItemType[] = mediaList.filter(item => item.visible); //modulesToVisibleItems(modules);
// Items marked as featured
export const mediaFeatured: ItemType[] = mediaList.filter(item => item.featured); //modulesToFeaturedItems(modules, Routes.media);



