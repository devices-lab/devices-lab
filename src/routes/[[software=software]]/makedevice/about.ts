import type { ItemType } from '$lib/items/item';
import { Routes } from '$lib/routes';
//=================================================//

import ImageCover from "$lib/assets/img/makedevice/cover.png?enhanced"

export const item: ItemType = {
	name: "MakeDevice",
	teaser: "Makedevice project.",
	description: "A web-based tool that leverages the Jacdac prototyping platform, enabling an end-to-end workflow from a wired desktop prototype to a robust, enclosed device with modules electrically connected via a carrier PCB.",
	cover: ImageCover,
	images: [
		{ sm: ImageCover, lg: ImageCover },
	],

	logo: "makedevice",
	href: `${Routes.software.href}/makedevice`,
	hrefName: `${Routes.software.name}/makedevice`,

	tags: ['makedevice'],

	visible: true,
	featured: true
};