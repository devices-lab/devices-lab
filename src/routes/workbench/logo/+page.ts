import { Routes } from '$lib/data/routes';
import type { PageLoad } from './$types';
import { item } from './about';

export const load = (async () => {
	return {
		item,
		title: item.title,
		subtitle: item.subtitle,
		breadcrumbs: [{ title: Routes.workbench.key, href: Routes.workbench.id }, { title: 'logo', href: '/workbench/logo' }],
	};
}) satisfies PageLoad;