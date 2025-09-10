
import type { RouteId } from '$app/types';
import type { Feature, Publication, Reference, Tag } from '$lib/data/data';
import { findRoute, Routes, type BreadcrumbLink, type Route } from '$lib/data/routes';
import { removeLeadingChar } from '$lib/utils/utils';
import type { Picture } from 'vite-imagetools';





type Kind = 'family' | 'item';


type CommonData = {
	name: string;
	pathName: string;
	teaser: string;

	tags: Tag[];
	featured: boolean;
};

export type ItemData = CommonData & {
	modified: string;
	description: string;

	// identification
	projectName: string | undefined;
	projectID: string | undefined;
	projectVersion: string | undefined;

	// content
	features: Feature[];
	resources: Reference[];
	publications: Publication[];
};

export type ItemDataHelper = ItemData & { researchKeys: string[] };

export type FamilyData = CommonData & {};

type EntryData = ItemData | FamilyData; //() => Promise<ItemData>;

export type Entry = {
	kind: Kind;
	item: EntryData;
	thumb: Picture | undefined;
	images: Picture[];
	path: string;
	parent: string;
	route: Route
};

export type CatalogEntry = { data: Entry[] | Entry | undefined, type: 'family' | 'item' | 'none', family: string };

type RecordMap = Record<string, Entry>;
type FeaturedMap = Record<string, Entry[]>;

const BASE_PATH = '/src/lib/_content/items/';



const build = () => {
	// Collect all index.ts modules (lazy)
	const itemMods = import.meta.glob(`/src/lib/_content/items/**/index.ts`, { eager: true, import: 'item' }) as Record<string, EntryData>;
	// Collect images (eager URLs)
	const imageMods = import.meta.glob(`/src/lib/_content/items/**/*.{png,jpg,jpeg,webp,avif,gif}`, { eager: true, query: { enhanced: true }, import: 'default' }) as Record<string, Picture>;

	// Helpers
	const norm = (p: string) => p.replace(BASE_PATH, '');
	const dirOf = (p: string) => norm(p).replace(/\/[^/]+$/, '');
	const nameOf = (p: string) => norm(p).split('/').pop()!;
	const parentOf = (dir: string) => dir.replace(/\/[^/]+$/, '') || '';

	// Build base entries for every folder that has an index.ts
	const entries: RecordMap = {};
	const featured: FeaturedMap = {};

	for (const fullPath in itemMods) {
		const path = dirOf(fullPath);
		const parent = parentOf(path);
		const item = itemMods[fullPath];
		const route = findRoute(path);

		// Gather images directly under the same dir, excluding thumb.*
		const images: Picture[] = [];
		let thumb: Picture | undefined = undefined;
		for (const imgPath in imageMods) {
			const imgDir = dirOf(imgPath);
			if (imgDir === path) {
				const fname = nameOf(imgPath).toLowerCase();
				if (fname.startsWith('thumb.')) {
					// This is a thumbnail image
					thumb = imageMods[imgPath];
				} else {
					// Normal image
					images.push(imageMods[imgPath]);
				}
			}
		}
		// Sort images by filename
		images.sort();

		// Create the entry
		entries[path] = {
			kind: 'item', // provisional; we’ll fix to 'family' below if it has children
			thumb,
			item,
			images,
			path: '/' + path,
			parent,
			route
		};

		// If featured, add to featured map for its route
		if (item.featured) {
			if (!featured[route.id])
				featured[route.id] = [];
			featured[route.id].push(entries[path]);
		}
	}

	// Determine which entries are families: any dir that is a parent of another entry with exactly one extra segment (i.e., immediate child).
	const hasChild: Record<string, boolean> = {};
	const segs = (p: string) => p.split('/').filter(Boolean).length;
	for (const childDir of Object.keys(entries)) {
		const parent = entries[childDir].parent;
		if (parent && entries[parent]) {
			// Only mark as child if parent is an actual entry folder and it is the *immediate* parent (by depth).
			if (segs(childDir) === segs(parent) + 1) {
				hasChild[parent] = true;
			}
		}
	}
	for (const dir of Object.keys(entries)) {
		if (hasChild[dir]) {
			entries[dir].kind = 'family';
		}
	}

	//======// API //======//
	const get = (path: string): Entry | undefined => {
		path = removeLeadingChar(path, '/', { repeat: true });
		return entries[path];
	};

	const getChildren = (path: string): Entry[] => {
		path = removeLeadingChar(path, '/', { repeat: true });

		const depth = path ? path.split('/').filter(Boolean).length : 0;
		const out: Entry[] = [];
		for (const e of Object.values(entries)) {
			if (e.parent === path && e.path.split('/').filter(Boolean).length === depth + 1) {
				out.push(e);
			}
		}

		out.sort((a, b) => a.path.localeCompare(b.path));
		return out;
	};


	const findPath = (param: string): string | undefined => {
		return Object.keys(entries).find((key) => key.endsWith(param));
	}

	const findEntries = (path: string): CatalogEntry => {
		// Check if we have an item for this path
		const itemData = get(path);
		if (itemData && itemData.kind === 'item') {
			return { data: itemData, type: 'item', family: entries[itemData.parent]?.item.name || '' };
		}

		// Check if we have a family for this path
		const listData = getChildren(path);
		if (listData && listData.length > 0) {
			return { data: listData, type: 'family', family: entries[listData[0].parent]?.item.name || '' };
		}

		// No match found
		return { data: undefined, type: 'none', family: '' };
	};

	const findFeaturedEntries = (routeId: RouteId | string): Entry[] => featured[routeId] || [];


	const createBreadcrumbs = (path: string): BreadcrumbLink[] => {
		const parts = path.split('/').filter(Boolean);
		const out: BreadcrumbLink[] = [];
		let cur = '';
		for (const part of parts) {
			cur += `/${part}`;
			const entry = get(cur);
			out.push({
				title: entry?.item.pathName || part,
				href: cur
			});
		}
		return out;
	}

	return { entries, findFeaturedEntries, findEntries, findPath, createBreadcrumbs };
};

// Build once at module load
const catalog = build();

export const entries = catalog.entries; // for direct access if needed
export const findPath = catalog.findPath;
export const findEntries = catalog.findEntries;
export const findFeaturedEntries = catalog.findFeaturedEntries;
export const createBreadcrumbs = catalog.createBreadcrumbs;





export const DefaultItem: Entry = {
	kind: 'item',
	item: {
		modified: '0',
		name: '',
		pathName: '',
		teaser: '',
		description: '',
		// identification
		projectName: undefined,
		projectID: undefined,
		projectVersion: undefined,
		// content
		features: [],
		resources: [],
		publications: [],
		// other
		tags: [],
		featured: false,
	} as ItemData,
	thumb: undefined,
	images: [],
	path: '',
	parent: '',
	route: Routes.home
};

export const DefaultFamily: Entry = {
	kind: 'family',
	item: {
		name: '',
		pathName: '',
		teaser: '',
		// other
		tags: [],
		featured: false,
	} as FamilyData,
	thumb: undefined,
	images: [],
	path: '',
	parent: '',
	route: Routes.home
};

function cleanVariableName(name: string): string {
	// Replace invalid characters with underscores
	return name.replace(/[^a-zA-Z0-9_$]/g, '_').replace(/^(\d)/, '_$1').toLowerCase();
}

// Generate and download a citation file for the given research item
export function generateAndDownloadItem(entry: Entry, researchKeys: string[]): void {
	const PUBLICATION_PLACEHOLDER = '[[publications]]';

	const removeDups = (arr: string[]): string[] => {
		return arr.filter((item, index) => arr.indexOf(item) === index);
	}

	researchKeys = removeDups(researchKeys);
	const publicationImports = researchKeys.map((p) => `import { research as ${cleanVariableName(p)} } from '$research/${p}';`).join('\n');
	const publicationJson = `[${researchKeys.map((p) => cleanVariableName(p)).join(', ')}]`;

	// Custom replacer to handle publications array
	const replacer = (key: string, value: unknown) => {
		if (key === "publications") return PUBLICATION_PLACEHOLDER; // placeholder
		return value ?? '';
	}

	// Build the file content
	let dataString = `
// Generated by Devices Lab https://deviceslab.org
import type { ItemData } from "$lib/data/indexer";

${publicationImports}

export const item: ItemData = ${JSON.stringify({...entry.item, modified: Date.now().toString()}, replacer, 4)};
`;

	// Replace the placeholder with actual publication names
	dataString = dataString.replace(`"${PUBLICATION_PLACEHOLDER}"`, publicationJson);

	// Create a link element to download the file
	const link = document.createElement('a');
	link.href = URL.createObjectURL(new Blob([dataString], { type: 'text/plain' }));
	link.download = `index.ts`;
	link.click();
}


// Generate and download a citation file for the given research item
export function generateAndDownloadFamily(entry: Entry): void {
	// Build the file content
	const dataString = `
// Generated by Devices Lab https://deviceslab.org
import type { FamilyData } from "$lib/data/indexer";

export const item: FamilyData = ${JSON.stringify(entry.item, null, 4)};
`;

	// Create a link element to download the file
	const link = document.createElement('a');
	link.href = URL.createObjectURL(new Blob([dataString], { type: 'text/plain' }));
	link.download = `index.ts`;
	link.click();
}
