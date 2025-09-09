import type { PageLoad } from './$types';

// Load team data
import { team } from '$lib/data/about';

export const load = (async () => {
    return {
		team,
	};
}) satisfies PageLoad;