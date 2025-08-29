import type { PageLoad } from './$types';

// Load team data
import { team } from '$lib/_data/about';
import { Pages } from '$lib/_data/pages';

export const load = (async () => {
    return {
		page: Pages.about,
		team
	};
}) satisfies PageLoad;