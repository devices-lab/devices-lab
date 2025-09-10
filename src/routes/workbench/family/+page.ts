import { entries } from '$lib/data/indexer';
import { Routes } from '$lib/data/routes';
import type { PageLoad } from './$types';
import { item } from './about';

export const load = (async () => {
	return {
		item,
		itemLibrary: entries,
		title: item.title,
		subtitle: item.subtitle,
		breadcrumbs: [{ title: Routes.workbench.key, href: Routes.workbench.id }, { title: 'family', href: '/workbench/family' }],
	};
}) satisfies PageLoad;