import type { Picture } from 'vite-imagetools';

export interface ItemImage {
	sm: Picture;
	lg: Picture;
}

export interface ItemType {
	name: string;
	teaser: string;
	description: string;
	category: string;
	cover: Picture;
	images: ItemImage[];

	logo: string;
	href: string;
	hrefName: string;

	tags: string[];

	// Whether the item represents a group of items
	group?: boolean;

	// Whether the item is visible in the item list
	visible: boolean;
	// Whether the item is featured (e.g. shown on the menu)
	featured: boolean;
}


export function modulesToItems(modules: Record<string, { item: ItemType }>): ItemType[] {
	return Object.values(modules).map(m => m.item);
}

export function modulesToVisibleItems(modules: Record<string, { item: ItemType }>): ItemType[] {
	return Object.values(modules)
		.filter(m => m.item.visible ?? true) // default visible=true unless explicitly false
		.map(m => m.item);
}

export function modulesToFeaturedItems(modules: Record<string, { item: ItemType }>): ItemType[] {
	return Object.values(modules)
		.filter(m => m.item.featured ?? false) // default featured=false unless explicitly true
		.map(m => m.item);
}