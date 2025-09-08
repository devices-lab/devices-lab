import type { ItemType } from '$lib/data/item';
//=================================================//

import ImageCover from "$lib/assets/img/microbit/cover.png?enhanced"

export const item: ItemType = {
	name: "Test",

	slug: "test",
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


	
	featured: false
};