
import type { Picture } from 'vite-imagetools';
import { generateHash, isBound} from "$lib/utils/utils";


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
	text: string;
	icon: string;
};

export type Award = {
	name: string;
	icon: string;
}

export type Tag = {
	name: string
}

export type ResearchType = {
	// core information
	doi: string;
	type: string;				// -- paper, extended abstract, ...
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
	doi: '',
	type: '',
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
	if (!isBound(date.year, 1, 9999) && !isBound(date.month, 1, 12) && !isBound(date.day, 1, 31))
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
	return name.toLowerCase().split(' ').join('-') + '-' + hash.toString(36);
}


// Helper function to parse the module path into a key
function parsePath(path: string): string {
	return path.split('/').pop()?.replace(/\.(ts|js|svelte|avif|gif|heif|jpeg|jpg|png|tiff|webp|svg)$/, '') || '';
}


// Dynamic import of research modules
export function fetchResearchData(): ResearchLibrary {
	// Use vite to import all research items and images
	const researchModules = import.meta.glob("$lib/_content/research/**/*.ts", { eager: true, import: 'research' }) as Record<string, ResearchType>;
	const imageModules = import.meta.glob('$lib/_content/research/**/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}', { eager: true, query: { enhanced: true }, import: 'default' }) as Record<string, Picture>;

	// Map image paths to their corresponding research item keys
	const imageMap = Object.fromEntries(
		Object.entries(imageModules).map(([path, module]) => {
			const key = parsePath(path);
			return [key, module];
		})
	);

	return Object.fromEntries(Object.entries(researchModules).map(([path, module]) => {
		const key = parsePath(path);
		return [key, { key, picture: imageMap[key] || '', ...module } satisfies ResearchItem];
	}));
}

// Fetch research data by DOI.
export async function fetchResearchDataDOI(doi: string): Promise<ResearchItem | undefined> {
	if (!doi) return Promise.reject(undefined);

	// extract DOI from URL if needed
	const doiMatch = doi.match(/10.\d{4,9}\/[-._;()/:A-Z0-9]+/i);
	if (doiMatch) {
		doi = doiMatch[0];
	}

	return fetch(`https://api.crossref.org/works/${encodeURIComponent(doi)}`, {
		headers: {
			Accept: 'application/json'
		}
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then((data) => {
			const item = data.message;
			const authors = (item.author || []).map(
				(author: { given: string; family: string; affiliation: { name: string }[] }) =>
					({
						name: `${author.given} ${author.family}`,
						affiliation: author.affiliation[0].name || ''
					}) satisfies Author
			);
			const dateParts = item.published && item.published['date-parts'] && item.published['date-parts'][0] ? item.published['date-parts'][0] : [];
			const published = {
				year: dateParts[0] || NaN,
				month: dateParts[1] || NaN,
				day: dateParts[2] || NaN
			};
			const links = item.URL ? [{ text: 'DOI Link', href: item.URL, icon: 'ScrollText' } satisfies Link] : [];

			const subtitle = (item.subtitle.length ? item.subtitle[0] : '');
			const title = (item.title.length ? item.title[0] : '');

			return {
				...DefaultResearchItem,
				doi: item.DOI || doi,
				name: '',
				title: `${title}: ${subtitle}`?.replace(/: $/, ''),
				abstract: item.abstract ? item.abstract.replace(/<\/?jats:[^>]+>/g, '').replace(/<\/?[^>]+>/g, '') : '',
				authors,
				published,
				conference: item['short-container-title'].length ? item['short-container-title'][0] : item['container-title'].length ? item['container-title'][0] : '',
				location: item['event-location'] || '',
				links
			} satisfies ResearchItem;
		});
	/*.catch((error) => {
		console.error('Error fetching data:', error);
		return undefined;
	});*/
}


// Generate and download a citation file for the given research item
export function generateAndDownloadCitation(item: ResearchItem): void {
	item.key = generateKey(item.name, item.title);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { key, picture, ...data } = item;
	const dataString = `
// Generated by Devices Lab https://deviceslab.org
import type { ResearchType } from "$lib/data/research";

export const research: ResearchType = ${JSON.stringify(data, null, 4)};
`;

	// Create a link element to download the file
	const link = document.createElement('a');
	link.href = URL.createObjectURL(new Blob([dataString], { type: 'text/plain' }));
	link.download = `${item.key}.ts`;
	link.click();
}

/*
//import { ScrollText } from "@lucide/svelte";
//import { cite } from "./cite";
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



