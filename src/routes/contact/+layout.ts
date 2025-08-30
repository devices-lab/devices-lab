import type { LayoutLoad } from './$types';

import { Routes } from '$lib/data/routes';
import { Pages } from '$lib/_content/pages';

export const load = (async () => {
	return {
		route: Routes.contact,
		title: Pages.contact.pageTitle,
		subtitle: Pages.contact.pageSubtitle,
	};
}) satisfies LayoutLoad;