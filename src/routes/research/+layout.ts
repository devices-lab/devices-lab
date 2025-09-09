import type { LayoutLoad } from './$types';

import { Routes } from '$lib/data/routes';
import { Pages } from '$lib/_content/pages';

export const load = (async () => {
	return {
		route: Routes.research,
		breadcrumbs: Routes.research.breadcrumbs,
		title: Pages.research.pageTitle,
		subtitle: Pages.research.pageSubtitle,
	};
}) satisfies LayoutLoad;