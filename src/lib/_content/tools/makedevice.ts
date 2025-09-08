import type { ItemType } from '$lib/data/item';
//=================================================//

import ImageCover from "$lib/assets/img/makedevice/cover.png?enhanced";

import { research as makedevice } from '$research/makedevice--nwzdqd';


export const item: ItemType = {
	name: "MakeDevice",

	slug: "makedevice",
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
	featured: true,

	features: [
		'Jacdac modules attached to the PC are automatically detected, arranged on a carrier PCB and electrically routed',
		'Intuitive drag and drop interface lets users (re)arrange modules',
		'Automatic generation of Gerber files from the final arrangement, suitable for online PCB fabrication services without modification.',
		'Various enclosure options are presented to the user, MakeDevice automatically generates STL files for 3D printing and SVGs for laser cut press fit boxes or stencils '
	],
	resources: [],
	publications: [makedevice],

};