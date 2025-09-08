import { bySlug } from '$lib/_content/data';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	
	const item = bySlug.device[params.slug];

	console.log(item);
	if (!item || !item.visible) throw error(404, 'Device not found');

	console.log(item);
	return { item };
}) satisfies PageLoad;