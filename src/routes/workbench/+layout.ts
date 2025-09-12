import { Pages } from '$lib/_content/pages';
import { Routes } from '$lib/data/routes';
import type { LayoutLoad } from './$types';

export const load = (async () => {
	return {
		route: Routes.workbench,
		breadcrumbs: Routes.workbench.breadcrumbs,
		title: Pages.workbench.pageTitle,
		subtitle: Pages.workbench.pageSubtitle
	};
}) satisfies LayoutLoad;
