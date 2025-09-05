import type { PageLoad } from './$types';
import { item } from './about';

// Load research data
import { fetchResearchData } from '$lib/data/research';

export const load = (async () => {
	return {
		item,
		researchLibrary: fetchResearchData(),
		title: item.title,
		subtitle: item.subtitle
	};
}) satisfies PageLoad;