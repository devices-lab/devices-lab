import type { PageLoad } from './$types';

// Load tool data
import { tools } from '$lib/_data/tools';

export const load = (async () => {
    return {
		tools
	};
}) satisfies PageLoad;