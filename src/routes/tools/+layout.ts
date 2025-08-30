import type { LayoutLoad } from './$types';

import { Routes } from '$lib/data/routes';
import { Pages } from '$lib/_content/pages';

export const load = (async () => {
	return {
		route: Routes.tools,
		title: Pages.tools.pageTitle,
		subtitle: Pages.tools.pageSubtitle,
	};
}) satisfies LayoutLoad;