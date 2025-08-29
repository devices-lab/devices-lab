import type { LayoutLoad } from './$types';

import { Routes } from '$lib/_data/routes';

export const load = (async () => {
	return {
		route: Routes.workbench,
		title: 'Workbench',
		subtitle: 'A collection of custom tools designed to make our workflow more efficient and straightforward.',
	};
}) satisfies LayoutLoad;