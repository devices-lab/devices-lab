import type { LayoutLoad } from './$types';

import { Routes } from '$lib/data/routes';

export const load = (async () => {
	return {
		route: Routes.tools,
		title: 'Our Tools',
		subtitle: 'Explore our tools to help you build devices.',
	};
}) satisfies LayoutLoad;