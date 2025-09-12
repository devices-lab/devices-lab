import { entries } from '$lib/data/indexer';
import { fetchResearchDataSimple } from '$lib/data/research';
import { Routes } from '$lib/data/routes';
import type { PageLoad } from './$types';
import { item } from './about';

export const load = (async () => {
	return {
		item,
		researchLibrary: fetchResearchDataSimple(),
		itemLibrary: entries,
		title: item.title,
		subtitle: item.subtitle,
		breadcrumbs: [
			{ title: Routes.workbench.key, href: Routes.workbench.id },
			{ title: 'item', href: '/workbench/item' }
		]
	};
}) satisfies PageLoad;
