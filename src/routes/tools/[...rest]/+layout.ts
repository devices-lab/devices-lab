import type { LayoutLoad } from './$types';

import { Routes } from '$lib/data/routes';

export const load = (async () => {
	return {
		route: Routes.tools,
		title: undefined,
		subtitle: undefined,
	};
}) satisfies LayoutLoad;