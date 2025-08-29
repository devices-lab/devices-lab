

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


const processPathName = (pathName: string, collection: ItemType[]): string | undefined => {
	for (const item of collection) {
		if (item.href.endsWith(pathName)) {
			return item.hrefName;
		}
	}
	return undefined;
};

const processRouteName = (pathName: string): string | undefined => {
	for (const routeKey in Routes) {
		const route = Routes[routeKey as keyof typeof Routes];
		if (route.href.endsWith(pathName)) {
			return route.name;
		}
	}
	return undefined;
};

// If the path matches a device, software, etc, return its full href and name
const findPathName = (pathName: string): string  => {
	if (!pathName) return '';
	let found: string | undefined;
	
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

	return '';
};

// Create breadcrumbs based on the current path
const createBreadcrumbs = (route: string): BreadcrumbType[] => {
	const name = findPathName(route);
	const nameParts = name.split('/').filter(Boolean);
	const pathParts = route.split('/').filter(Boolean);

	return nameParts.map((part, index) => ({
		title: part,
		href: resolve(`/${pathParts.slice(0, index + 1).join('/')}`)
	}));
};


const parseRoute = (route: string | null): string => {
	if (!route) return '';
	route = route.replace("[[devices=devices]]", "devices");
	route = route.replace("[[software=software]]", "software");
	route = route.replace("[[media=media]]", "media");
	route = route.replace("[[research=research]]", "research");
	return route;
};

export const load: LayoutLoad = async (event) => {
	const route = parseRoute(event.route.id);
	return {
		...(event.data ?? {}),
		route,
		breadcrumbs: createBreadcrumbs(route),
		isHome: route === Routes.home.name,
		menuItems,
		menuOptions,
	};
};