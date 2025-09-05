import type { PageLoad } from './$types';

// Load research data
import { fetchResearchData } from '$lib/data/research';




export const load = (async () => {
	return {
		researchLibrary: fetchResearchData()
	};
}) satisfies PageLoad;

