import type { LayoutLoad } from './$types';

import { Routes } from '$lib/_data/routes';

export const load = (async () => {
	return {
		route: Routes.about,
		title: 'About Us',
		subtitle: 'Learn more about our company and values.',
	};
}) satisfies LayoutLoad;