import type { _ItemMap, _ItemType, ItemType } from '$lib/data/item';
import { Routes, type Route } from '$lib/data/routes';

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


//function buildFamilyMap(items: _ItemType[]) {}

function buildItem(item: ItemType, route: Route): _ItemType {
	return { 
		...item, 
		route: route,
		family: []
	} satisfies _ItemType;
}

console.log(Object.keys(deviceModules));

export const devices: _ItemType[] = Object.values(deviceModules).map((item) => buildItem(item, Routes.devices));
export const tools: _ItemType[] = Object.values(toolModules).map((item) => buildItem(item, Routes.tools));
export const media: _ItemType[] = Object.values(mediaModules).map((item) => buildItem(item, Routes.media));


export const allItems = [...devices, ...tools, ...media];

// Simple lookup maps by slug
export const bySlug: Record<string, _ItemMap> = {
	device: Object.fromEntries(devices.map(i => [i.slug, i])),
	tool: Object.fromEntries(tools.map(i => [i.slug, i])),
	media: Object.fromEntries(media.map(i => [i.slug, i])),
};

export const allBySlug: Record<string, _ItemType> = Object.fromEntries(allItems.map(i => [i.slug, i]));


// slug automatically determined by filename and path
// images automatically determined by images with the same filename prefix

import { devicesTree, type DeviceNode } from '$lib/data/devices-tree';

// Walk the tree
function collectAllDevices(node = devicesTree, out: DeviceNode[] = []) {
	for (const c of node.children) {
		if (c.kind === 'device') out.push(c);
		else collectAllDevices(c, out);
	}
	return out;
}

console.log('All devices in tree:', collectAllDevices().map(d => d.item.name));
console.log(devicesTree);

export { devicesTree };