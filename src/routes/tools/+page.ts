import type { PageLoad } from './$types';

// Load tool data
import { tools } from '$lib/_content/data';

export const load = (async () => {
    return {
		tools
	};
}) satisfies PageLoad;