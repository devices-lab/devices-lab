import type { _ItemMap, _ItemType, ItemType } from '$lib/data/item';
import { Routes } from '$lib/data/routes';

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

export const devices: _ItemType[] = Object.values(deviceModules).map((item) => ({ ...item, route: Routes.devices }));
export const tools: _ItemType[] = Object.values(toolModules).map((item) => ({ ...item, route: Routes.tools }));
export const media: _ItemType[] = Object.values(mediaModules).map((item) => ({ ...item, route: Routes.media }));


export const allItems = [...devices, ...tools, ...media];

// Simple lookup maps by slug
export const bySlug: Record<string, _ItemMap> = {
	device: Object.fromEntries(devices.map(i => [i.slug, i])),
	tool: Object.fromEntries(tools.map(i => [i.slug, i])),
	media: Object.fromEntries(media.map(i => [i.slug, i])),
};

export const allBySlug: Record<string, _ItemType> = Object.fromEntries(allItems.map(i => [i.slug, i]));