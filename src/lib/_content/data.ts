import type { ItemType } from '$lib/data/item';
import { Routes } from '$lib/data/routes';
import { stripLeadingSlash } from '$lib/utils/utils';


// Each glob MUST be a literal string
const deviceModules = import.meta.glob('/src/lib/_content/devices/**/*.ts', {
	eager: true, import: 'item'
}) as Record<string, ItemType>;
const toolModules = import.meta.glob('/src/lib/_content/tools/**/*.ts', {
	eager: true, import: 'item'
}) as Record<string, ItemType>;
const mediaModules = import.meta.glob('/src/lib/_content/media/**/*.ts', {
	eager: true, import: 'item'
}) as Record<string, ItemType>;

export const devices = Object.values(deviceModules).map((item) => ({ ...item, route: Routes.devices }));
export const tools = Object.values(toolModules).map((item) => ({ ...item, route: Routes.tools }));
export const media = Object.values(mediaModules).map((item) => ({ ...item, route: Routes.media }));


export const allItems = [...devices, ...tools, ...media];

// Simple lookup maps by slug
export const bySlug = {
	device: Object.fromEntries(devices.map(i => [stripLeadingSlash(i.path), i])),
	tool: Object.fromEntries(tools.map(i => [stripLeadingSlash(i.path), i])),
	media: Object.fromEntries(media.map(i => [stripLeadingSlash(i.path), i])),
};
