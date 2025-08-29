import type { PageLoad } from './$types';

// Load media data
import { media } from '$lib/data/media';

export const load = (async () => {
    return {
		media
	};
}) satisfies PageLoad;