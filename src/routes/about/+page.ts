import type { PageLoad } from './$types';

// Load team data
import { team } from '$lib/data/about';
import { Pages } from '$lib/data/pages';

export const load = (async () => {
    return {
		page: Pages.about,
		team
	};
}) satisfies PageLoad;