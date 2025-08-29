import type { ItemType } from '$lib/_data/item';
//=================================================//

import ImageCover from "$lib/assets/img/makedevice/cover.png?enhanced"

export const item: ItemType = {
	name: "MakeDevice",
	path: "/makedevice",
	pathName: "/makedevice",

	teaser: "Makedevice project.",
	description: "A web-based tool that leverages the Jacdac prototyping platform, enabling an end-to-end workflow from a wired desktop prototype to a robust, enclosed device with modules electrically connected via a carrier PCB.",
	
	cover: ImageCover,
	images: [
		{ sm: ImageCover, lg: ImageCover },
	],

	projectName: "makedevice",
	projectID: "0000",
	projectVersion: "v1.0",

	tags: ['makedevice'],

	family: false,
	visible: true,
	featured: true
};