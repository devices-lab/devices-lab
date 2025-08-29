import type { PageLoad } from './$types';

// Load software data
import { software } from '$lib/_data/software';

export const load = (async () => {
    return {
		software
	};
}) satisfies PageLoad;