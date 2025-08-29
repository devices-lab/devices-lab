import { type WorkbenchItem } from "$lib/_data/workbench";

// Use vite to import all device files
export const modules = import.meta.glob("./*/**/about.ts", { eager: true }) as Record<string, { item: WorkbenchItem }>;




