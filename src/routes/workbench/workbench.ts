import { type ExternalWorkbenchItem } from "$lib/data/workbench";

// Use vite to import all device files
export const modules = import.meta.glob("./*/**/about.ts", { eager: true, import: 'item' }) as Record<string, ExternalWorkbenchItem>;




