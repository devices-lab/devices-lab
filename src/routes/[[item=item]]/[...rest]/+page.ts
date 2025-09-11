import { resolve } from '$app/paths';
import { createBreadcrumbs, findEntries, findPath, type CatalogEntry, type Entry } from '$lib/data/indexer';
import { findRoute, type BreadcrumbLink } from '$lib/data/routes';
import { concat } from '$lib/utils/utils';
import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';


export const load = (async ({ params }) => {
	// If no item is specified, try to find a redirect to a device / tool or media item
	// If no redirect is found, return 404
	if (!params.item) {
		const path = findPath(params.rest);
		if (path)
			throw redirect(307, resolve('/' + path));
		else
			throw error(404, 'Item not found');
	}

	// Find the requested item or family
	const path = concat(params.item, params.rest, '/');
	const items: CatalogEntry = findEntries(path);
	const breadcrumbs: BreadcrumbLink[] = createBreadcrumbs(path);
	
	switch (items.type) {
		case 'item':
			{
				const entry = items.data as Entry;
				return { breadcrumbs, entry, route: entry.route, family: items.family };
			}
		case 'family':
			{
				const entries = items.data as Entry[];
				return { breadcrumbs, entries, route: entries[0].route, family: items.family };
			}
		case 'none':
			{
				if (!params.rest)
					return { breadcrumbs, entries: [], route: findRoute(params.item), family: items.family };
				else
					throw error(404, 'Item not found');
			}
		default:
			throw error(404, 'Item not found');
	}
}) satisfies PageLoad;