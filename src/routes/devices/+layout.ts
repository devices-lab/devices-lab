import type { LayoutLoad } from './$types';

import { Routes } from '$lib/_data/routes';

export const load = (async () => {
    return {
		route: Routes.devices,
		title: 'Our Devices',
		subtitle: 'Explore the things we create.',
	};
}) satisfies LayoutLoad;