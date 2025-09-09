import type { ItemData } from "$lib/data/indexer";

import { research as clipbit1 } from '$research/clip-bit--6bn47b';
import { research as clipbit2 } from '$research/clip-bit--cli8fm';
import { research as clipbit3 } from '$research/clip-bit-2c7269';

export const item: ItemData = {
	name: 'clip:bit',
	pathName: 'clip:bit',
	teaser: 'Enhancing outdoor learning with persistent data logging for the BBC micro:bit.',
	description: 'Enable cross-curricular outdoor learning with the clip:bit. Easy to use persistent data logging for the BBC micro:bit, ideal for field trips and surveys. Supplied fully assembled in a range of colour options.',

	// identification
	projectName: "clip-bit",
	projectID: undefined,
	projectVersion: undefined,

	// content
	features: [
		'LED displays for daylight readability',
		'Up to 12 classification categories',
		'Persistent data logging',
		'Smart scanning of data collection sheets',
		'Intelligent data upload for classes',
		'Long life AA battery pack'
	],
	publications: [clipbit1, clipbit2, clipbit3],
	resources: [
		{ text: "Poster", icon: 'Paperclip', href: "https://www.devices-lab.org/wp-content/uploads/2024/07/digitaleconomies_cloudletposter.pdf" }
	],

	tags: [],
	featured: true,
};