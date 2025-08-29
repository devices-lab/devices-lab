import type { Picture } from 'vite-imagetools';
import type { Route } from '$lib/_data/routes';

export interface ItemImage {
	sm: Picture;
	lg: Picture;
}

export interface ItemType {
	// device name
	name: string;
	// relative path to the device, e.g. "/solder-bit/gamepad"
	path: string;
	// a nicer name for the path that will be shown in the breadcrumbs instead of the path, e.g. "solder:bit/gamepad"
	pathName: string;

	// description
	teaser: string;
	description: string;
	// images
	cover: Picture;
	images: ItemImage[];

	// logo generator stuff
	projectName: string;
	projectID: string;
	projectVersion: string;

	// tags for filtering
	tags: string[];

	// indicates if item a family of items, e.g. like solderbit?
	family?: boolean;
	// indicates the item is visible on the main page ( devices within a family are typically only visible inside the family, not the main page )
	visible: boolean;
	// indicates the item is featured or new
	featured: boolean;

	//// Automatically filled in
	route?: Route;
}



export function getItemPath(item: ItemType): string {
	return (item.route?.href ?? '') + item.path;
}

export function modulesToItems(modules: Record<string, { item: ItemType }>): ItemType[] {
	return Object.values(modules).map(m => m.item);
}

export function modulesToVisibleItems(modules: Record<string, { item: ItemType }>): ItemType[] {
	return Object.values(modules)
		.filter(m => m.item.visible ?? true) // default visible=true unless explicitly false
		.map(m => m.item);
}

export function modulesToFeaturedItems(modules: Record<string, { item: ItemType }>, route: Route): ItemType[] {
	return Object.values(modules)
		.filter(m => m.item.featured ?? false) // default featured=false unless explicitly true
		.map(m => ({...m.item, route} satisfies ItemType)); // ensure route is set
}

