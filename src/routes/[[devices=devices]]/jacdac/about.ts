import type { ItemType } from '$lib/items/item';
import { Routes } from '$lib/routes';
//=================================================//

import ImageCover from "$lib/assets/img/jacdac/cover.png?enhanced"

export const item: ItemType = {
	name: "Jacdac",
	teaser: "Jacdac is a plug-and-play hardware and software stack for microcontrollers and their peripherals such as sensors and actuators.",
	description: "Jacdac is a plug-and-play hardware and software stack for microcontrollers and their peripherals such as sensors and actuators.",
	category: 'devices',

	cover: ImageCover,
	images: [
		{ sm: ImageCover, lg: ImageCover },
	],

	logo: "jacdac",
	href: `${Routes.devices.href}/jacdac`,
	hrefName: `${Routes.devices.name}/jacdac`,

	tags: ['jacdac'],

	visible: true,
	featured: false
};