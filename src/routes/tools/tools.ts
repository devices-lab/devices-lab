import { type Tool, modulesToTools } from "$lib/_data/tools";

// Use vite to import all device files
const modules = import.meta.glob("./*/**/about.ts", { eager: true }) as Record<string, { item: Tool }>;

// Collect all devices
export const tools: Tool[] = modulesToTools(modules);




