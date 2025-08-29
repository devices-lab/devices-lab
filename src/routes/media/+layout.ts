import type { LayoutLoad } from './$types';

import { Routes } from '$lib/_data/routes';

export const load = (async () => {
	return {
		route: Routes.media,
		title: 'Media',
		subtitle: 'Discover our media content and resources.',
	};
}) satisfies LayoutLoad;