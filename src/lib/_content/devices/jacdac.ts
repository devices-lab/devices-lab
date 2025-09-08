import type { ItemType } from '$lib/data/item';
//=================================================//

import ImageCover from "$lib/assets/img/jacdac/cover.png?enhanced"

export const item: ItemType = {
	name: "Jacdac",
	
	slug: "jacdac",
	path: "/jacdac",
	pathName: "/jacdac",

	teaser: "Jacdac is a plug-and-play hardware and software stack for microcontrollers and their peripherals such as sensors and actuators.",
	description: "Jacdac is a plug-and-play hardware and software stack for microcontrollers and their peripherals such as sensors and actuators.",

	cover: ImageCover,
	images: [
		{ sm: ImageCover, lg: ImageCover },
	],

	projectName: "jacdac",
	projectID: "0000",
	projectVersion: "v1.0",

	tags: ['jacdac'],

	featured: false
};