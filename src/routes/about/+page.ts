import type { PageLoad } from './$types';

// Load team data
import { team } from '$lib/_data/about';

export const load = (async () => {
    return {
		title: 'About Us',
		description: 'Learn more about our research group and the people involved.',
		team
	};
}) satisfies PageLoad;