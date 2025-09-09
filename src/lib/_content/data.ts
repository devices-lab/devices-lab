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


/*

devices/solder-bit.ts

devices/clip-bit.ts
devices/jacdac.ts
devices/micro-bit.ts

devices/solder-bit/index.ts
devices/solder-bit/thumb.png
devices/solder-bit/gamepad/index.ts
devices/solder-bit/gamepad/thumb.png
devices/solder-bit/gamepad/img001.png
devices/solder-bit/gamepad/img002.jpg
devices/solder-bit/gamepad/img003.jpeg
devices/solder-bit/led-matrix/index.ts
devices/solder-bit/led-matrix/thumb.png
devices/solder-bit/led-matrix/img001.png
devices/solder-bit/led-matrix/img002.jpg
devices/solder-bit/led-matrix/img003.jpeg
devices/solder-bit/led-matrix/img004.jpeg
devices/solder-bit/thingy/index.ts
devices/solder-bit/thingy/thumb.png
devices/solder-bit/thingy/abc/index.ts
devices/solder-bit/thingy/abc/thumb.png
devices/clip-bit/index.ts
devices/clip-bit/thumb.png
devices/clip-bit/img001.png
devices/clip-bit/img002.jpg
devices/clip-bit/img003.jpeg
devices/jacdac/index.ts
devices/jacdac/thumb.png
devices/jacdac/img001.png
devices/jacdac/img002.jpeg
devices/micro-bit/index.ts
devices/micro-bit/thumb.png
devices/micro-bit/img001.png
devices/micro-bit/img002.jpeg
devices/micro-bit/img003.jpeg


{ 
	devices/solder-bit: {
		kind: 'family',
		thumb: import 'thumb.png',
		item: import 'index.ts',
	},
	devices/clip-bit: {
		kind: 'device',
		thumb: import 'thumb.png',
		item: import 'index.ts',
		images: [import 'img001.png', import 'img002.jpg', import 'img003.jpeg'],
	},
	devices/jacdac: {
		kind: 'device',
		thumb: import 'thumb.png',
		item: import 'index.ts',
		images: [import 'img001.png', import 'img002.jpeg'],
	},
	devices/micro-bit: {
		kind: 'device',
		thumb: import 'thumb.png',
		item: import 'index.ts',
		images: [import 'img001.png', import 'img002.jpeg', import 'img003.jpeg'],
	},
	devices/solder-bit/gamepad: {
		kind: 'device',
		thumb: import 'thumb.png',
		item: import 'index.ts',
		images: [import 'img001.png', import 'img002.jpg', import 'img003.jpeg'],
	},
	devices/solder-bit/led-matrix: {
		kind: 'device',
		thumb: import 'thumb.png',
		item: import 'index.ts',
		images: [import 'img001.png', import 'img002.jpg', import 'img003.jpeg'],
	},
	devices/solder-bit/thingy: {
		kind: 'family',
		thumb: import 'thumb.png',
		item: import 'index.ts',
	},
	devices/solder-bit/thingy/abc: {
		kind: 'device',
		thumb: import 'thumb.png',
		item: import 'index.ts',
		images: [import 'img001.png', import 'img002.jpg', import 'img003.jpeg'],
	},
}

*/