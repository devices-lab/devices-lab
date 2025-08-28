import type { PageLoad } from './$types';

// Load media data
import { media } from './media';

export const load = (async () => {
    return {
		title: 'Media',
		description: 'Explore our media content.',
		media
	};
}) satisfies PageLoad;