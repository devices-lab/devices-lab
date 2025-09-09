import type { ItemData } from "$lib/data/indexer";

export const item: ItemData = {
	name: 'gamepad',
	pathName: 'gamepad',
	teaser: 'Learn surface mount soldering while building a versatile game controller for the BBC micro:bit.',
	description: 'Learn to solder surface mount components whilst creating a versatile accessory for the BBC micro:bit. Ideal for controlling any interactive device, installation or robot. Supplied in low-cost kit form, partially assembled, or fully manufactured. Choose the level to suit your experience!',

	// identification
	projectName: "solder-bit/gamepad",
	projectID: "000",
	projectVersion: "v1.0",

	// content
	features: [
		"Edge connector for BBC micro:bit",
		"Four directional DPAD buttons",
		"Two shoulder buttons",
		"Two selector buttons",
		"Five addressable RGB LEDs",
		"Convenient AAA backpack"
	],
	publications: [],
	resources: [
		{ text: "GitHub", icon: 'Github', href: "https://github.com/devices-lab/solderbit-gamepad" },
		{ text: "MakeCode Extension", icon: 'CodeXml', href: "https://github.com/devices-lab/pxt-solderbit-gamepad" }
	],

	tags: ['soldering', 'gamepad'],
	featured: true,
};