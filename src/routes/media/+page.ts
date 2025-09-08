import type { PageLoad } from './$types';

// Load media data
import { media } from '$lib/_content/data';

export const load = (async () => {
    return {
		media
	};
}) satisfies PageLoad;