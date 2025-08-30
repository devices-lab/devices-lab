import type { LayoutLoad } from './$types';

import { Routes } from '$lib/data/routes';
import { Pages } from '$lib/_content/pages';

export const load = (async () => {
	return {
		route: Routes.about,
		title: Pages.about.pageTitle,
		subtitle: Pages.about.pageSubtitle,
	};
}) satisfies LayoutLoad;