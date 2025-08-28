import type { PageLoad } from './$types';

// Load research data
import { research } from './research';

export const load = (async () => {
    return {
		title: 'Research',
		description: 'Explore our research projects and publications.',
		research
	};
}) satisfies PageLoad;