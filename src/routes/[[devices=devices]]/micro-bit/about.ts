import type { ItemType } from '$lib/items/item';
import { Routes } from '$lib/routes';
//=================================================//

import ImageCover from "$lib/assets/img/microbit/cover.png?enhanced"

export const item: ItemType = {
	name: "micro:bit",
	teaser: "The BBC micro:bit is an award-winning programmable device that allows students to get hands-on with coding and digital making.",
	description: "The BBC micro:bit is an award-winning programmable device that allows students to get hands-on with coding and digital making. Use it to inspire your students to recognise the power of technology in the real world.",
	cover: ImageCover,
	images: [
		{ sm: ImageCover, lg: ImageCover },
	],

	logo: "micro-bit",
	href: `${Routes.devices.href}/micro-bit`,
	hrefName: `${Routes.devices.name}/micro:bit`,

	tags: ['microbit'],

	visible: true,
	featured: false
};