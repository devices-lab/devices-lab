import type { PageLoad } from './$types';
import { fetchResearchData } from '$lib/data/research';

export const load = (async () => {
	return {
		researchLibrary: fetchResearchData()
	};
}) satisfies PageLoad;

