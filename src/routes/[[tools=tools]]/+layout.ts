import type { LayoutLoad } from './$types';

import { Routes } from '$lib/_data/routes';

export const load = (async () => {
	return {
		route: Routes.tools,
	};
}) satisfies LayoutLoad;