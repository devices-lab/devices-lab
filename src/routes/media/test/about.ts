import type { ItemType } from '$lib/items/item';
import { Routes } from '$lib/routes';
//=================================================//

import ImageCover from "$lib/assets/img/microbit/cover.png?enhanced"

export const item: ItemType = {
	name: "Test",
	teaser: "Test project.",
	description: "Test project.",
	category: 'media',
	
	cover: ImageCover,
	images: [
		{ sm: ImageCover, lg: ImageCover },
	],

	logo: "test",
	href: `${Routes.media.href}/test`,
	hrefName: `${Routes.media.name}/test`,

	tags: ['test'],

	visible: false,
	featured: false
};