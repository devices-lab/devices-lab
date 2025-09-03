import type { PageLoad } from './$types';

// Load research data
import { research } from '$lib/_content/research';
import { researchFromDOI } from '$lib/data/research';

export const load = (async () => {
    return {
		research,
		researchFromDOI
	};
}) satisfies PageLoad;

