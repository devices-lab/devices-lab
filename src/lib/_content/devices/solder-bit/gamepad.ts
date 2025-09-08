import type { ItemType } from '$lib/data/item';
//=================================================//

import ImageCover from '$lib/assets/img/solderbit-gamepad/cover.png?enhanced';
import Image1 from '$lib/assets/img/solderbit-gamepad/image1.jpg?enhanced';
import Image2 from '$lib/assets/img/solderbit-gamepad/image2.png?enhanced';
import { CodeXml, Github } from '@lucide/svelte';


export const item: ItemType = {
	name: "solder:bit/gamepad",

	slug: "solder-bit/gamepad",
	path: "/solder-bit/gamepad",
	pathName: "/solder:bit/gamepad",

	teaser: "Learn surface mount soldering while building a versatile game controller for the BBC micro:bit.",
	description: "Learn to solder surface mount components whilst creating a versatile accessory for the BBC micro:bit. Ideal for controlling any interactive device, installation or robot. Supplied in low-cost kit form, partially assembled, or fully manufactured. Choose the level to suit your experience!",

	cover: ImageCover,
	images: [
		{ sm: ImageCover, lg: ImageCover },
		{ sm: Image1, lg: Image1 },
		{ sm: Image2, lg: Image2 }
	],

	projectName: "solder-bit/gamepad",
	projectID: "0000",
	projectVersion: "v1.0",

	tags: ['microbit', 'soldering'],


	featured: true,

	features: [
		"Edge connector for BBC micro:bit",
		"Four directional DPAD buttons",
		"Two shoulder buttons",
		"Two selector buttons",
		"Five addressable RGB LEDs",
		"Convenient AAA backpack"
	],
	publications:[],
	resources: [
		{ text: "GitHub", icon: Github, href: "https://github.com/devices-lab/solderbit-gamepad" },
		{ text: "MakeCode Extension", icon: CodeXml, href: "https://github.com/devices-lab/pxt-solderbit-gamepad" }
	]
};