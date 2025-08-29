import type { LayoutLoad } from './$types';

import { Routes } from '$lib/data/routes';

export const load = (async () => {
	return {
		route: Routes.research,
		title: 'Research',
		subtitle: 'Explore our research projects and publications.',
	};
}) satisfies LayoutLoad;