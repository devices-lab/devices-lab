import type { PageLoad } from './$types';
import { item } from './about';

// Load research data
import { fetchResearchData } from '$lib/data/research';
import { Routes } from '$lib/data/routes';

export const load = (async () => {
	return {
		item,
		researchLibrary: fetchResearchData(),
		title: item.title,
		subtitle: item.subtitle,
		breadcrumbs: [{ title: Routes.workbench.key, href: Routes.workbench.id }, { title: 'bibtex', href: '/workbench/bibtex' }],
	};
}) satisfies PageLoad;