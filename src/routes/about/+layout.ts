import { Pages } from '$lib/_content/pages';
import { Routes } from '$lib/data/routes';
import type { LayoutLoad } from './$types';

export const load = (async () => {
	return {
		route: Routes.about,
		breadcrumbs: Routes.about.breadcrumbs,
		title: Pages.about.pageTitle,
		subtitle: Pages.about.pageSubtitle,
	};
}) satisfies LayoutLoad;