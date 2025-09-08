import { allBySlug } from '$lib/_content/data';
import type { _ItemType } from '$lib/data/item';
import { redirectHref } from '$lib/data/routes';
import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

// This page handles all the [...rest] routes and redirects them to the corresponding device / tool / media page
// If no corresponding page is found, it throws a 404 error
export const load = (async ({ params }) => {
	const item: _ItemType = allBySlug[params.rest];
	if (!item) throw error(404, 'Item not found');

	// Check if we need to redirect
	const redirectItem = redirectHref(item);
	if (redirectItem)
		redirect(307, redirectItem);

	// There should be nothing on the [...rest] route
	return error(404, 'Page not found');
}) satisfies PageLoad;