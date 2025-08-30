import type { LayoutLoad } from './$types';

import { Routes } from '$lib/data/routes';
import { Pages } from '$lib/_content/pages';

export const load = (async () => {
	return {
		route: Routes.media,
		title: Pages.media.pageTitle,
		subtitle: Pages.media.pageSubtitle,
	};
}) satisfies LayoutLoad;