

import type { LayoutLoad } from './$types';

import type { BreadcrumbType } from '$lib/navbar/Breadcrumbs.svelte';
import type { FeaturedListProps } from '$lib/items/FeaturedList.svelte';

import { type Route, Routes } from '$lib/routes';

import { devicesCatalog, devicesFeatured } from '../routes/[[devices=devices]]/devices';
import { softwareCatalog, softwareFeatured } from '../routes/[[software=software]]/software';
import { mediaCatalog, mediaFeatured } from '../routes/media/media';
import { researchCatalog, researchFeatured } from '../routes/research/research';

// Enable prerendering for static site generation
export const prerender = true;

interface MenuItem {
	title: string;
	href: string;
	popover?: FeaturedListProps;
}

const menuItems: MenuItem[] = [
	{ ...Routes.home },
	{ ...Routes.devices, popover: { label: "See all devices", items: devicesFeatured } },
	{ ...Routes.software, popover: { label: "See all software", items: softwareFeatured } },
	{ ...Routes.media, popover: { label: "See all media", items: mediaFeatured } },
	{ ...Routes.research, popover: { label: "See all research", items: researchFeatured } }
];

const menuOptions: Route[] = [
	{ ...Routes.tools },
	{ ...Routes.about },
	{ ...Routes.contact },
];





// If the path matches a device, software, etc, return its full href and name
const findPathName = (pathName: string): { path: string, name: string } => {
	for (const item of devicesCatalog) {
		if (item.href.endsWith(pathName)) {
			return { path: item.href, name: item.hrefName };
		}
	}
	for (const item of softwareCatalog) {
		if (item.href.endsWith(pathName)) {
			return { path: item.href, name: item.hrefName };
		}
	}
	for (const item of mediaCatalog) {
		if (item.href.endsWith(pathName)) {
			return { path: item.href, name: item.hrefName };
		}
	}
	for (const item of researchCatalog) {
		if (item.href.endsWith(pathName)) {
			return { path: item.href, name: item.hrefName };
		}
	}
	return { path: pathName, name: pathName };
};

// Create breadcrumbs based on the current path
const createBreadcrumbs = (pathname: string): BreadcrumbType[] => {
	const { path, name } = findPathName(pathname);
	const pathParts = path.split('/').filter(Boolean);
	const nameParts = name.split('/').filter(Boolean);

	return nameParts.map((part, index) => ({
		title: part,
		href: `/${pathParts.slice(0, index + 1).join('/')}`
	}));
};


export const load: LayoutLoad = async (event) => {
	return {
		...(event.data ?? {}),
		activePath: event.url.pathname,
		breadcrumbs: createBreadcrumbs(event.url.pathname),
		isHome: event.url.pathname === '/',
		menuItems,
		menuOptions,
	};
};