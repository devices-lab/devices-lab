import type { ItemType } from '$lib/data/item';
//=================================================//

import ImageCover from "$lib/assets/img/solderbit/cover.png?enhanced"

export const item: ItemType = {
	name: "solder:bit",
	path: "/solder-bit",
	pathName: "/solder:bit",
	slug: "",

	teaser: "A range of devices created to learn soldering.",
	description: "A range of devices created to learn soldering.",
	
	cover: ImageCover,
	images: [
		{ sm: ImageCover, lg: ImageCover }
	],

	projectName: "solder-bit",
	projectID: "0000",
	projectVersion: "v1.0",

	tags: ['microbit', 'soldering'],

	family: true,
	visible: true,
	featured: false
};