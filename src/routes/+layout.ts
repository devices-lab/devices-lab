

import type { LayoutLoad } from './$types';
import type { BreadcrumbType } from '$lib/navbar/Breadcrumbs.svelte';

import { Routes, parseEventRoute } from '$lib/_data/routes';
import { devicesCatalog } from '$lib/_data/devices';
import { toolsCatalog } from '$lib/_data/tools';
import { mediaCatalog } from '$lib/_data/media';
import { researchCatalog } from '$lib/_data/research';
import { menu, sideMenu } from '$lib/_data/pages';

// Enable prerendering for static site generation
export const prerender = true;



// If the path matches a device, tools, etc, return its full href and name
const findPathName = (pathName: string): string => {
	// Collect all item paths
	const items = [
		...devicesCatalog,
		...toolsCatalog,
		...mediaCatalog,
		...researchCatalog
	];

	for (const item of items) {
		if (pathName.endsWith(item.path)) {
			return pathName.replace(item.path, item.pathName);
		}
	}

	return '';
};

// Create breadcrumbs based on the current path
const createBreadcrumbs = (route: string): BreadcrumbType[] => {
	const name = findPathName(route);
	const nameParts = name.split('/').filter(Boolean) || [];
	const pathParts = route.split('/').filter(Boolean) || [];

	return nameParts.map((part, index) => ({
		title: part,
		href: `/${pathParts.slice(0, index + 1).join('/')}`
	}));
};




export const load: LayoutLoad = async (event) => {
	const route = parseEventRoute(event.route.id);
	return {
		...(event.data ?? {}),
		route: Routes.home,
		breadcrumbs: createBreadcrumbs(route),
		isHome: route === Routes.home.href,
		menu,
		sideMenu,
	};
};