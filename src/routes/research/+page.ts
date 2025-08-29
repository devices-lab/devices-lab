import type { PageLoad } from './$types';

// Load research data
import { research } from '$lib/data/research';

export const load = (async () => {
    return {
		research
	};
}) satisfies PageLoad;