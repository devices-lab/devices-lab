import type { LayoutLoad } from './$types';

import { Routes } from '$lib/_data/routes';

export const load = (async () => {
	return {
		route: Routes.shop,
		title: 'Shop',
		subtitle: 'Browse our products and services.',
	};
}) satisfies LayoutLoad;