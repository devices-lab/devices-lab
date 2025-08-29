import type { ItemType } from '$lib/_data/item';
//=================================================//

import ImageCover from "$lib/assets/img/microbit/cover.png?enhanced"

export const item: ItemType = {
	name: "Test",
	path: "/test",
	pathName: "/test",

	teaser: "Test project.",
	description: "Test project.",
	
	cover: ImageCover,
	images: [
		{ sm: ImageCover, lg: ImageCover },
	],

	projectName: "test",
	projectID: "0000",
	projectVersion: "v1.0",

	tags: ['test'],

	family: false,
	visible: false,
	featured: false
};