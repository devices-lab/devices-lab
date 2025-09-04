import type { ResearchType } from "$lib/data/research";

import LogicGlue from "$lib/assets/img/research/logicglue.png";

export const research: ResearchType = {
	name: 'LogicGlue',
	title: 'LogicGlue - Hardware-Independent Embedded Programming Through Platform-Independent Drivers',
	abstract: 'LogicGlue is a platform-independent driver system that decouples application logic from hardware specifics, enabling embedded programs to run across different microcontrollers without modification. It preserves native component features and protocols, simplifying prototyping while maintaining flexibility in hardware choice.',
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
	published: {
		year: 2025,
		month: 6,
		day: 15
	},
	conference: 'EICS 2025',
	location: 'Trier, Germany',
	links: [
		{
			href: 'https://dl.acm.org/doi/10.1145/3735498',
			title: 'DOI',
			icon: 'Paperclip'
		},
		{
			href: 'https://example.com/research/example-research',
			title: 'Video',
			icon: 'Cross'
		}
	],
	tags: [
		{
			string: 'example'
		},
		{
			string: 'research'
		}
	],
	awards: [
		{
			name: 'Test Award'
		}
	]
};