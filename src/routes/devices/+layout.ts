import type { LayoutLoad } from './$types';

import { Routes } from '$lib/data/routes';
import { Pages } from '$lib/_content/pages';

export const load = (async () => {
    return {
		route: Routes.devices,
		title: Pages.devices.pageTitle,
		subtitle: Pages.devices.pageSubtitle,
	};
}) satisfies LayoutLoad;