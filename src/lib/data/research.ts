//import { ScrollText } from "@lucide/svelte";
import type { Picture } from 'vite-imagetools';
//import { cite } from "./cite";
import { generateHash, isBound } from "$lib/utils";



export type Date = {
	year: number;
	month: number;
	day: number;
};

export type Author = {
	name: string;
	affiliation: string;
}

export type Link = {
	href: string;
	title: string;
	icon: string;
};

export type Award = {
	name: string;
}

export type Tag = {
	name: string
}

export type ResearchType = {
	// core information
	name: string;				// -- a short name for the research item
	title: string;				// -- the full title of the research item
	abstract: string;
	authors: Author[];
	// published
	published: Date;
	conference: string;
	location: string;
	// additional information
	links: Link[];
	awards: Award[];
	tags: Tag[];
}

export type ResearchItem = ResearchType & {
	key: string;
	picture: string | Picture;
};

export type ResearchLibrary = {
	[key: string]: ResearchItem;
};


export const DefaultResearchItem: ResearchItem = {
	key: '',
	picture: '',
	name: '',
	title: '',
	abstract: '',
	authors: [],
	published: {
		year: 0,
		month: 0,
		day: 0
	},
	conference: '',
	location: '',
	links: [],
	tags: [],
	awards: []
};


export function formatDate(date: Date): string | undefined {
	if (!isBound(date.year, 0, 9999) || !isBound(date.month, 1, 12) || !isBound(date.day, 1, 31))
		return;

	const yearStr = String(date.year).padStart(4, '0');
	const monthStr = String(date.month).padStart(2, '0');
	const dayStr = String(date.day).padStart(2, '0');

	// Parse string
	if (!date.day || date.day < 1 || date.day > 31) {
		if (!date.month || date.month < 1 || date.month > 12) {
			return yearStr;
		}
		return `${yearStr}-${monthStr}`;
	}
	return `${yearStr}-${monthStr}-${dayStr}`;
}




// Generate a unique key for the given research item
export function generateKey(name: string, title: string): string {
	const hash = generateHash(title);
	return name.toLowerCase().split(' ')[0] + '-' + hash.toString(36);
}


// Helper function to parse the module path into a key
function parsePath(path: string): string {
	return path.split('/').pop()?.replace('.ts', '') || '';
}

function parseImagePath(path: string): string {
	return path.split('/').pop()?.replace(/\.(avif|gif|heif|jpeg|jpg|png|tiff|webp|svg)$/, '') || '';
}

//import LogicGlue from "$lib/assets/img/research/logicglue.png";
// Dynamic import of research modules
export function fetchResearchData(): ResearchLibrary {
	// Use vite to import all item files
	const researchModules = import.meta.glob("$lib/_content/research/**/*.ts", { eager: true }) as Record<string, { research: ResearchType }>;
	const imageModules = import.meta.glob('$lib/_content/research/**/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}', { eager: true, query: { enhanced: true } }) as Record<string, { default: Picture }>;

	// Map image paths to their corresponding research item keys
	const imageMap = Object.fromEntries(
		Object.entries(imageModules).map(([path, module]) => {
			const key = parseImagePath(path);
			return [key, module.default];
		})
	);

	return Object.fromEntries(Object.entries(researchModules).map(([path, module]) => {
		const key = parsePath(path);
		return [key, { key, picture: imageMap[key] || '', ...module.research } satisfies ResearchItem];
	}));
}


/*
export const researchFromDOI: ResearchType[] = await Promise.all(dois.map(async doi => {
	const data = (await cite(doi))[0];
	return {
		title: data.title,
		abstract: data.abstract?.replace(/<\/?[^>]+(>|$)/g, "") ?? '',
		teaser: ImageCover,
		authors: data.author?.map((author: any) => ({
			name: `${author.given} ${author.family}`,
			affiliation: author.affiliation.join(', ') || 'Unknown'
		})) ?? [],
		published: 'data.published',
		conference: 'data.conference',
		location: 'data.location',
		links: {
			href: data.url,
			title: 'DOI',
			icon: ScrollText
		},
		tags: []
	};
}));

*/