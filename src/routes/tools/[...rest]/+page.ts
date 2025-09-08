import { bySlug } from '$lib/_content/data';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const item = bySlug.tool[params.rest];
	if (!item) throw error(404, 'Tool not found');

	return { item };
}) satisfies PageLoad;