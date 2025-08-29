import type { ItemType } from '$lib/data/item';
//=================================================//

import ImageCover from "$lib/assets/img/clipbit/cover.png?enhanced";
import Image1 from "$lib/assets/img/clipbit/image1.jpeg?enhanced";
import Image2 from "$lib/assets/img/clipbit/image2.jpeg?enhanced";
import Image3 from "$lib/assets/img/clipbit/image3.jpeg?enhanced";
import Image4 from "$lib/assets/img/clipbit/image4.jpeg?enhanced";
import Image5 from "$lib/assets/img/clipbit/image5.jpeg?enhanced";
import Image6 from "$lib/assets/img/clipbit/image6.jpeg?enhanced";

export const item: ItemType = {
	name: "clip:bit",
	path: "/clip-bit",
	pathName: "/clip:bit",

	teaser: "Enhancing outdoor learning with persistent data logging for the BBC micro:bit.",
	description: "Enable cross-curricular outdoor learning with the clip:bit. Easy to use persistent data logging for the BBC micro:bit, ideal for field trips and surveys. Supplied fully assembled in a range of colour options.",

	cover: ImageCover,
	images: [
		{ sm: ImageCover, lg: ImageCover },
		{ sm: Image1, lg: Image1 },
		{ sm: Image2, lg: Image2 },
		{ sm: Image3, lg: Image3 },
		{ sm: Image4, lg: Image4 },
		{ sm: Image5, lg: Image5 },
		{ sm: Image6, lg: Image6 }
	],

	projectName: "clip-bit",
	projectID: "0000",
	projectVersion: "v1.0",

	tags: ['microbit'],

	family: false,
	visible: true,
	featured: true
};