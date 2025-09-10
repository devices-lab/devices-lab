import { Pages } from '$lib/_content/pages';
import { Routes } from '$lib/data/routes';
import type { LayoutLoad } from './$types';

export const load = (async () => {
	return {
		route: Routes.contact,
		breadcrumbs: Routes.contact.breadcrumbs,
		title: Pages.contact.pageTitle,
		subtitle: Pages.contact.pageSubtitle,
	};
}) satisfies LayoutLoad;