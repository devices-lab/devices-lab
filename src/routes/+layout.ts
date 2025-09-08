

import type { BreadcrumbType } from '$lib/navbar/Breadcrumbs.svelte';
import type { LayoutLoad } from './$types';

import { allBySlug, devices, media, tools } from '$lib/_content/data';
import { MainMenu, Routes, SideMenu } from '$lib/data/routes';

//────────────────────────────────────────────────────────────────//

// Featured items
const featuredItems = {
	[Routes.devices.id]: devices.filter(device => device.featured),
	[Routes.tools.id]: tools.filter(tool => tool.featured),
	[Routes.media.id]: media.filter(media => media.featured)
};

//────────────────────────────────────────────────────────────────//

// Enable prerendering for static site generation
export const prerender = true;



// If the path matches a device, tools, etc, return its full href and name
const findPathName = (pathName: string, params: string | undefined): string => {
	let result = pathName;

	// If we have params, try to find a matching item
	const item = params ? allBySlug[params] : undefined;
	if (item) 
		result = pathName.replace(item.path, item.pathName);

	//for (const item of allItems) {
	//	if (pathName.endsWith(item.path)) {
	//		return pathName.replace(item.path, item.pathName);
	//	}
	//}
	return result;
};

// Create breadcrumbs based on the current path
const createBreadcrumbs = (route: string, params: string | undefined): BreadcrumbType[] => {
	const name = findPathName(route, params);
	const nameParts = name.split('/').filter(Boolean) || [];
	const pathParts = route.split('/').filter(Boolean) || [];

	return nameParts.map((part, index) => ({
		title: part,
		href: `/${pathParts.slice(0, index + 1).join('/')}`
	}));
};





export const load: LayoutLoad = async (event) => {

	const route = event.route.id?.replace('[...rest]', event.params.rest ?? '') ?? '/';
	//const route = parseEventRoute(routePath);
	const breadcrumbs = createBreadcrumbs(route, event.params.rest);
	return {
		...(event.data ?? {}),
		route: Routes.home, // will be overwritten in each page
		breadcrumbs,
		MainMenu,
		SideMenu,
		featuredItems
	};
};