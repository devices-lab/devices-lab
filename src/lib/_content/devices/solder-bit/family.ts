import type { FamilyType, ItemType } from "$lib/data/item";


export const family: FamilyType = {
	name: 'solder:bit',
	teaser: 'A family of devices designed for soldering projects.',
	description: 'A family of devices designed for soldering projects.',
	cover: ImageCover,
	tags: ['microbit', 'soldering'],
};

import ImageCover from "$lib/assets/img/solderbit/cover.png?enhanced"

export const item: ItemType = {
	name: "solder:bit fam",

	slug: "solder-bit",
	path: "/solder-bit",
	pathName: "/solder:bit",

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

	
	featured: false
};