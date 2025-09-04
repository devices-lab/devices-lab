import type { ResearchType } from '$lib/data/research';
import { Cross, Paperclip } from '@lucide/svelte';

import LogicGlue from "$lib/assets/img/research/logicglue.png";
//import Image1 from "$lib/assets/img/clipbit/image1.jpeg?enhanced";
//import Image2 from "$lib/assets/img/clipbit/image2.jpeg?enhanced";
//import Image3 from "$lib/assets/img/clipbit/image3.jpeg?enhanced";
//import Image4 from "$lib/assets/img/clipbit/image4.jpeg?enhanced";
//import Image5 from "$lib/assets/img/clipbit/image5.jpeg?enhanced";
//import Image6 from "$lib/assets/img/clipbit/image6.jpeg?enhanced";

export const dois = [
	'10.1145/3735498',
	'10.1145/3596265',
	'10.1145/3544549.3573792',
	'10.1145/3463523',
	'10.1145/3374920.3374950',
	'10.1145/3374920.3374988'
];

// Research items
export const research: ResearchType[] = [
	{
		title: 'LogicGlue - Hardware-Independent Embedded Programming Through Platform-Independent Drivers',
		abstract: 'LogicGlue is a platform-independent driver <span class="text-red-400">system</span> that decouples application logic from hardware specifics, enabling embedded programs to run across different microcontrollers without modification. It preserves native component features and protocols, simplifying prototyping while maintaining flexibility in hardware choice.',
		picture: LogicGlue,
		authors: [
			{
				name: 'Mannu Lambrichts',
				affiliation: 'Example University'
			},
			{
				name: 'Raf Ramakers',
				affiliation: 'Another University'
			},
			{
				name: 'Steve Hodges',
				affiliation: 'Third University'
			}
		],
		published: '2025',
		conference: 'EICS 2025',
		location: 'Trier, Germany',
		links: [
			{
				href: 'https://dl.acm.org/doi/10.1145/3735498',
				title: 'DOI',
				icon: Paperclip
			},
			{
				href: 'https://example.com/research/example-research',
				title: 'Video',
				icon: Cross
			}
		],
		tags: ['example', 'research'],
		awards: ['Test Award']
	}
];




