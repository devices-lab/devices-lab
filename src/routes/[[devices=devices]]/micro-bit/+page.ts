import type { PageLoad } from './$types';
import { item } from './about';

export const load = (async () => {
	return {
		title: item.name,
		description: item.description,
		category: item.category,
		noHeader: true
	};
}) satisfies PageLoad;