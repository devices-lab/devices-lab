import { dois } from "$lib/_content/research";
import { ScrollText, type Icon } from "@lucide/svelte";
import type { Picture } from 'vite-imagetools';
import { cite } from "./cite";


export interface Author {
	name: string;
	affiliation: string;
}

export type Link = {
	href: string;
	title: string;
	icon: typeof Icon;
};

export interface Research {
	title: string;
	abstract: string;
	teaser: string | Picture;
	authors: Author[];

	published: string;
	conference: string;
	location: string;



	links: Link[];
	tags: string[];
}


import ImageCover from "$lib/assets/img/clipbit/cover.png?enhanced";


export const researchFromDOI: Research[] = await Promise.all(dois.map(async doi => {
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

