

import type { LayoutLoad } from './$types';
import type { BreadcrumbType } from '$lib/navbar/Breadcrumbs.svelte';

import { Routes } from '$lib/data/routes';
import { devices, tools, media } from '$lib/_content/data';
import { MainMenu, SideMenu } from '$lib/data/routes';

//────────────────────────────────────────────────────────────────//

// Featured items
import { devicesFeatured } from '$lib/data/devices';
import { toolsFeatured } from '$lib/data/tools';

const featuredItems = {
	[Routes.devices.id]: devicesFeatured,
	[Routes.tools.id]: toolsFeatured
};

//────────────────────────────────────────────────────────────────//

// Enable prerendering for static site generation
export const prerender = true;



// If the path matches a device, tools, etc, return its full href and name
const findPathName = (pathName: string): string => {
	// Collect all item paths
	const items = [
		...devices,
		...tools,
		...media
	];

	for (const item of items) {
		if (pathName.endsWith(item.path)) {
			return pathName.replace(item.path, item.pathName);
		}
	}

	return pathName;
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
	const route = event.route.id?.replace('[slug]', event.params.slug ?? '') ?? '/';
	//const route = parseEventRoute(routePath);
	const breadcrumbs = createBreadcrumbs(route);
	return {
		...(event.data ?? {}),
		route: Routes.home, // will be overwritten in each page
		breadcrumbs,
		MainMenu,
		SideMenu,
		featuredItems
	};
};