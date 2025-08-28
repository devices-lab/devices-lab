

import type { LayoutLoad } from './$types';

import {resolve } from '$app/paths';

import type { BreadcrumbType } from '$lib/navbar/Breadcrumbs.svelte';
import type { FeaturedListProps } from '$lib/items/FeaturedList.svelte';

import { type Route, Routes } from '$lib/routes';

import { devicesCatalog, devicesFeatured } from '../routes/[[devices=devices]]/devices';
import { softwareCatalog, softwareFeatured } from '../routes/[[software=software]]/software';
import { mediaCatalog, mediaFeatured } from '../routes/media/media';
import { researchCatalog, researchFeatured } from '../routes/research/research';
import type { ItemType } from '$lib/items/item';

// Enable prerendering for static site generation
export const prerender = true;

interface MenuItem extends Route {
	category: string;
	popover?: FeaturedListProps;
}

const menuItems: MenuItem[] = [
	{ ...Routes.home, category: 'home' },
	{ ...Routes.devices, category: 'devices', popover: { label: "See all devices", items: devicesFeatured } },
	{ ...Routes.software, category: 'software', popover: { label: "See all software", items: softwareFeatured } },
	{ ...Routes.media, category: 'media', popover: { label: "See all media", items: mediaFeatured } },
	{ ...Routes.research, category: 'research', popover: { label: "See all research", items: researchFeatured } }
];

const menuOptions: Route[] = [
	{ ...Routes.tools },
	{ ...Routes.about },
	{ ...Routes.contact },
];



const processPathName = (pathName: string, collection: ItemType[]): { path: string, name: string } | undefined => {
	for (const item of collection) {
		if (item.href.endsWith(pathName)) {
			return { path: item.href, name: item.hrefName };
		}
	}
	return undefined;
};

const processRouteName = (pathName: string): { path: string, name: string } | undefined => {
	for (const routeKey in Routes) {
		const route = Routes[routeKey as keyof typeof Routes];
		if (route.href.endsWith(pathName)) {
			return { path: route.href, name: route.name };
		}
	}
	return undefined;
};

// If the path matches a device, software, etc, return its full href and name
const findPathName = (pathName: string): { path: string, name: string }  => {
	let found: { path: string, name: string } | undefined;
	
	found = processPathName(pathName, devicesCatalog);
	if (found) return found;

	found = processPathName(pathName, softwareCatalog);
	if (found) return found;

	found = processPathName(pathName, mediaCatalog);
	if (found) return found;

	found = processPathName(pathName, researchCatalog);
	if (found) return found;

	found = processRouteName(pathName);
	if (found) return found;

	return { path: '', name: '' };
};

// Create breadcrumbs based on the current path
const createBreadcrumbs = (pathname: string): BreadcrumbType[] => {
	const { path, name } = findPathName(pathname);
	const nameParts = name.split('/').filter(Boolean);
	const pathParts = path.split('/').filter(Boolean).splice(-nameParts.length);

	return nameParts.map((part, index) => ({
		title: part,
		href: resolve(`/${pathParts.slice(0, index + 1).join('/')}`)
	}));
};

const equalPaths = (a: string, b: string): boolean => {
	return a.split('/').filter(Boolean).join('/') === b.split('/').filter(Boolean).join('/');
};


export const load: LayoutLoad = async (event) => {
	return {
		...(event.data ?? {}),
		activePath: event.url.pathname,
		breadcrumbs: createBreadcrumbs(event.url.pathname),
		isHome: equalPaths(event.url.pathname, Routes.home.href),
		menuItems,
		menuOptions,
	};
};