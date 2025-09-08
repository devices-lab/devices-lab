import { type ItemType } from "$lib/data/item";

// Use vite to import all item files
export const modules = import.meta.glob("./*/**/about.ts", { eager: true, import: 'item' }) as Record<string, ItemType>;




