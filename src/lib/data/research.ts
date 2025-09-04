//import { ScrollText } from "@lucide/svelte";
import type { Picture } from 'vite-imagetools';
//import { cite } from "./cite";
import { generateHash } from "$lib/utils";



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
	string: string
}


export type ResearchType = {
	// core information
	name: string;				// -- a short name for the research item
	title: string;				// -- the full title of the research item
	abstract: string;
	picture: string | Picture;
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
};

export type ResearchLibrary = {
	[key: string]: ResearchItem;
};

export function formatDate(date: Date): string {
	if (!date.day || !date.month || !date.year) return 'n.d.';
	return `${String(date.year).padStart(4, '0')}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
}


// Use vite to import all item files
const researchModules = import.meta.glob("$lib/_content/research/**/*.ts", { eager: true }) as Record<string, { research: ResearchType }>;

export const researchLibrary: ResearchLibrary = Object.fromEntries(
	Object.entries(researchModules).map(([path, module]) => {
		const key = path.split('/').pop()?.replace('.ts', '') || '';
		return [key, { key, ...module.research }];
	})
);

export const research: ResearchType[] = Object.values(researchModules).map(module => ({ ...module.research, key: generateKey(module.research.title) }));


function generateKey(title: string): string {
	const temp = generateHash(title);
	console.log(temp);
	return title.split(' ')[0] + '-' + temp.toString(36);
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