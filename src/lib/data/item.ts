import type { Picture } from 'vite-imagetools';
import type { Route } from '$lib/data/routes';

import type { Publication } from './research';
import type { IconLink } from './indexer';


export interface ItemImage {
	sm: Picture;
	lg: Picture;
}



export type FamilyType = {
	// device name
	name: string;
	// description
	teaser: string;
	description: string;
	// images
	cover: Picture;
	// tags for filtering
	tags: string[];
}

/**
 * Represents a website item like device, tool or media.
 */
export type ItemType = {
	// device name
	name: string;

	slug: string;
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

	features?: string[];
	resources?: IconLink[];
	publications?: Publication[];

	// tags for filtering
	tags: string[];

	// indicates if item a family of items, e.g. like solderbit?
	//family?: boolean;
	// indicates the item is visible on the main page ( devices within a family are typically only visible inside the family, not the main page )
	// visible: boolean;
	// indicates the item is featured or new
	featured: boolean;
}


/**
 * Internal representation of an item with a route.
 */
export type _ItemType = ItemType & {
	route: Route;
	family: _ItemType[];
};


export type _ItemMap = {
	[key: string]: _ItemType;
};