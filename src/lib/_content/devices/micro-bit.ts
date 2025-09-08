import type { ItemType } from '$lib/data/item';
//=================================================//

import ImageCover from "$lib/assets/img/microbit/cover.png?enhanced"

export const item: ItemType = {
	name: "micro:bit",

	slug: "micro-bit",
	path: "/micro-bit",
	pathName: "/micro:bit",

	teaser: "The BBC micro:bit is an award-winning programmable device that allows students to get hands-on with coding and digital making.",
	description: "The BBC micro:bit is an award-winning programmable device that allows students to get hands-on with coding and digital making. Use it to inspire your students to recognise the power of technology in the real world.",

	cover: ImageCover,
	images: [
		{ sm: ImageCover, lg: ImageCover },
	],

	projectName: "micro-bit",
	projectID: "0000",
	projectVersion: "v1.0",

	tags: ['microbit'],

	family: false,
	visible: true,
	featured: false
};