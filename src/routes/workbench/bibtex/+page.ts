import type { PageLoad } from './$types';
import { item } from './about';

// Load research data
import { research, researchLibrary } from '$lib/data/research';

export const load = (async () => {
	return {
		item,
		research,
		researchLibrary,
		title: item.title,
		subtitle: item.subtitle
	};
}) satisfies PageLoad;