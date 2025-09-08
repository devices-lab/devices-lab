import { bySlug } from '$lib/_content/data';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const item = bySlug.device[params.rest];
	if (!item) throw error(404, 'Device not found');

	return { item };
}) satisfies PageLoad;