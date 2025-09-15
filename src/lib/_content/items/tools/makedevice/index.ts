import type { ItemData } from '$lib/data/data';

import { research as makedevice } from '$research/makedevice--nwzdqd';

export const item: ItemData = {
	modified: '1757500476430',
	name: 'Makedevice',
	pathName: 'makedevice',
	teaser: 'Makedevice project.',
	description: 'A web-based tool that leverages the Jacdac prototyping platform, enabling an end-to-end workflow from a wired desktop prototype to a robust, enclosed device with modules electrically connected via a carrier PCB.',

	// identification
	projectName: 'Makedevice',
	projectID: undefined,
	projectVersion: undefined,

	// content
	features: [{ text: 'Jacdac modules attached to the PC are automatically detected, arranged on a carrier PCB and electrically routed' }, { text: 'Intuitive drag and drop interface lets users (re)arrange modules' }, { text: 'Automatic generation of Gerber files from the final arrangement, suitable for online PCB fabrication services without modification.' }, { text: 'Various enclosure options are presented to the user, MakeDevice automatically generates STL files for 3D printing and SVGs for laser cut press fit boxes or stencils ' }],
	resources: [],
	publications: [makedevice],

	// other
	tags: [{ name: 'makedevice' }, { name: 'pcb' }],
	featured: true,

	// layout
	cardLayout: 'ItemCard',
	layout: 'item_0'
};
