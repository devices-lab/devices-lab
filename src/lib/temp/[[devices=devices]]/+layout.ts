import type { LayoutLoad } from './$types';

import { Routes } from '$lib/data/routes';

export const load = (async () => {
	return {
		route: Routes.devices,
	};
}) satisfies LayoutLoad;