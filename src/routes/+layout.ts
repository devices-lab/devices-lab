import { MainMenu, Routes, SideMenu } from '$lib/data/routes';
import type { LayoutLoad } from './$types';

// Enable prerendering for static site generation
export const prerender = true;

export const load: LayoutLoad = async (event) => {
	return {
		...(event.data ?? {}),
		route: Routes.home, // will be overwritten in each page
		breadcrumbs: [],
		MainMenu,
		SideMenu,
	};
};