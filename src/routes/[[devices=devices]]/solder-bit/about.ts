import type { ItemType } from '$lib/items/item';
import { Routes } from '$lib/routes';
//=================================================//

import ImageCover from "$lib/assets/img/solderbit/cover.png?enhanced"

export const item: ItemType = {
	name: "solder:bit",
	teaser: "A range of devices created to learn soldering.",
	description: "A range of devices created to learn soldering.",
	category: 'devices',
	
	cover: ImageCover,
	images: [
		{
			sm: ImageCover,
			lg: ImageCover
		}
	],

	logo: "solder-bit",
	href: `${Routes.devices.href}/solder-bit`,
	hrefName: `${Routes.devices.name}/solder:bit`,

	tags: ['microbit', 'soldering'],
	group: true,

	visible: true,
	featured: false
};