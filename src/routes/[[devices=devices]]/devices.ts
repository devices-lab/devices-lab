import { type ItemType } from "$lib/data/item";

// Use vite to import all item files
export const modules = import.meta.glob("./**/about.ts", { eager: true }) as Record<string, { item: ItemType }>;



