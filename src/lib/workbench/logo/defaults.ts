import type { BorderData } from "$lib/workbench/logo/editor/BorderConfig.svelte";
import type { SectionData } from "$lib/workbench/logo/editor/SectionConfig.svelte";
import { DATA_VERSION } from "$lib/workbench/logo/utils";

//======================================================================================//

export type IconData = {
	version: number;
	uid: string;
	// dimensions
	width: number;
	height: number;
	// content
	content: SectionData;
	// border
	border: BorderData;
};

export const IconDefaults: IconData = {
	version: DATA_VERSION, // increment whenever the data structure changes
	uid: 'icon',
	// dimensions
	width: 220,
	height: 186,
	// content
	content: {
		offsetX: 0,
		offsetY: 0,
		fontSize: 150,
		boldness: 1.5,
		fill: '#000000',
		color: '#ffffff'
	},
	// border
	border: makeBorder({ color: '#000000', width: 0, radius: 40 })
};

//======================================================================================//

export type PillData = {
	version: number;
	uid: string;
	// dimensions
	height: number;
	// left section
	left: SectionData & { dWidth: number };
	// right section
	right: SectionData & { dWidth: number };
	// style
	border: BorderData;
};

export const PillDefaults: PillData = {
	version: DATA_VERSION, // increment whenever the data structure changes
	uid: 'pill',
	// dimensions
	height: 176,
	// left section
	left: {
		dWidth: 40,
		offsetX: 0,
		offsetY: 0,
		fontSize: 150,
		boldness: 1,
		fill: '#000000',
		color: '#ffffff'
	},
	// right section
	right: {
		dWidth: 60,
		offsetX: 0,
		offsetY: 0,
		fontSize: 108,
		boldness: 0,
		fill: '#ffffff',
		color: '#000000'
	},
	// border
	border: makeBorder({ color: '#000000', width: 10, radius: 40 })
};

//======================================================================================//

export type StackData = {
	version: number;
	uid: string;
	// dimensions
	dWidth: number;
	// top section
	top: SectionData & { height: number };
	// bottom section
	bottom: SectionData & { height: number };
	// style
	border: BorderData;
};

export const StackDefaults: StackData = {
	version: DATA_VERSION, // increment whenever the data structure changes
	uid: 'stack',
	// dimensions
	dWidth: 70,
	// top section
	top: {
		height: 120,
		offsetX: 0,
		offsetY: -5,
		fontSize: 84,
		boldness: 1,
		fill: '#000000',
		color: '#ffffff'
	},
	// bottom section
	bottom: {
		height: 120,
		offsetX: 0,
		offsetY: -10,
		fontSize: 84,
		boldness: 0,
		fill: '#ffffff',
		color: '#000000'
	},
	// border
	border: makeBorder({ color: '#000000', width: 10, radius: 40 })
};

//======================================================================================//

export type StackPillData = {
	version: number;
	uid: string;
	// left section
	left: SectionData & { dWidth: number };
	// right section
	right: {
		dWidth: number;
		top: SectionData & { height: number };
		bottom: SectionData & { height: number };
	};
	// style
	border: BorderData;
};

export const StackPillDefaults: StackPillData = {
	version: DATA_VERSION, // increment whenever the data structure changes
	uid: 'stackPill',
	// left section
	left: {
		dWidth: 40,
		offsetX: 0,
		offsetY: 0,
		fontSize: 150,
		boldness: 1,
		fill: '#000000',
		color: '#ffffff'
	},
	// right section
	right: {
		dWidth: 60,
		top: {
			height: 100,
			offsetX: 0,
			offsetY: -0,
			fontSize: 86,
			boldness: 0,
			fill: '#ffffff',
			color: '#000000'
		},
		bottom: {
			height: 100,
			offsetX: 0,
			offsetY: 0,
			fontSize: 86,
			boldness: 0,
			fill: '#ffffff',
			color: '#000000'
		}
	},
	// border
	border: makeBorder({ color: '#000000', width: 10, radius: 40 })
};


//======================================================================================//
//======================================================================================//

// types for the attribute bag you spread onto <text> (or your component)
export type TextAttrBag = {
	dx: number;
	dy: number;
	fontSize: number;
	color: string;
	'data-synthetic-bold': 'true' | 'false';
	'data-bold-strength': string;
};

// small, testable helper
export function makeTextProps({ boldness, offsetX, offsetY, fontSize, color }: SectionData, centerX: number, centerY: number): TextAttrBag {
	return {
		'data-synthetic-bold': (boldness !== 0 ? 'true' : 'false'),
		'data-bold-strength': boldness.toString(),
		dx: centerX + offsetX,
		dy: centerY + offsetY,
		fontSize: fontSize,
		color: color
	};
}



export type BorderFlags = Partial<Record<'topL' | 'topR' | 'bottomL' | 'bottomR', boolean>>;

// Make a rounded border 
export function makeRoundedBorder(base: BorderData, flags?: BorderFlags): BorderData {
	return {
		color: 'none',
		width: 0,
		radius: base.radius,

		topL: { ...base.topL, use: flags?.topL ?? true },
		topR: { ...base.topR, use: flags?.topR ?? true },
		bottomL: { ...base.bottomL, use: flags?.bottomL ?? true },
		bottomR: { ...base.bottomR, use: flags?.bottomR ?? true }
	};
}

// Make a rounded frame
export function makeRoundedFrame(base: BorderData, flags?: BorderFlags): BorderData {
	return {
		color: base.color,
		width: base.width,
		radius: base.radius,

		topL: { ...base.topL, use: flags?.topL ?? true },
		topR: { ...base.topR, use: flags?.topR ?? true },
		bottomL: { ...base.bottomL, use: flags?.bottomL ?? true },
		bottomR: { ...base.bottomR, use: flags?.bottomR ?? true }
	};
}

// Make a default border
export function makeBorder({ color = '#000000', width = 0, radius = 0 }: { color?: string, width?: number, radius?: number }, flags?: BorderFlags): BorderData {
	return {
		color,
		width,
		radius,
		topL: { dRadius: 0, use: flags?.topL ?? true },
		topR: { dRadius: 0, use: flags?.topR ?? true },
		bottomL: { dRadius: 0, use: flags?.bottomL ?? true },
		bottomR: { dRadius: 0, use: flags?.bottomR ?? true }
	};
}
