import type { ItemData } from '$lib/data/data';

export const item: ItemData = {
	modified: '1757500606031',
	name: 'solder:bit/gamepad',
	pathName: 'gamepad',
	teaser: 'Learn surface mount soldering while building a versatile game controller for the BBC micro:bit.',
	description: 'Learn to solder surface mount components whilst creating a versatile accessory for the BBC micro:bit. Ideal for controlling any interactive device, installation or robot. Supplied in low-cost kit form, partially assembled, or fully manufactured. Choose the level to suit your experience!',

	// identification
	projectName: 'solder-bit/gamepad',
	projectID: '000',
	projectVersion: 'v1.0',

	// content
	features: [{ text: 'Edge connector for BBC micro:bit' }, { text: 'Four directional DPAD buttons' }, { text: 'Two shoulder buttons' }, { text: 'Two selector buttons' }, { text: 'Five addressable RGB LEDs' }, { text: 'Convenient AAA backpack' }],
	resources: [
		{ text: 'GitHub', icon: 'Github', href: 'https://github.com/devices-lab/solderbit-gamepad' },
		{ text: 'MakeCode Extension', icon: 'CodeXml', href: 'https://github.com/devices-lab/pxt-solderbit-gamepad' }
	],
	publications: [],
	annotations: {
		'v0.4.png': 'Version 0.4',
		'v0.5.png': 'Version 0.5',
		'v0.6.png': 'Version 0.6',
		'v0.7.png': 'Version 0.7'
	},

	// other
	tags: [{ name: 'soldering' }, { name: 'gamepad' }],
	featured: true,

	// layout
	cardLayout: 'ItemCard',
	layout: 'item_0'
};
