import type { LayoutLoad } from './$types';

import { Routes } from '$lib/data/routes';
import { Pages } from '$lib/_content/pages';

export const load = (async () => {
	return {
		route: Routes.shop,
		title: Pages.shop.title,
		subtitle: Pages.shop.subtitle,
	};
}) satisfies LayoutLoad;