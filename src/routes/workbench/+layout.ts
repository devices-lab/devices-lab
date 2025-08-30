import type { LayoutLoad } from './$types';

import { Routes } from '$lib/data/routes';
import { Pages } from '$lib/_content/pages';

export const load = (async () => {
	return {
		route: Routes.workbench,
		title: Pages.workbench.pageTitle,
		subtitle: Pages.workbench.pageSubtitle,
	};
}) satisfies LayoutLoad;