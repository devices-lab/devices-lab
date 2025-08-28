import type { PageLoad } from './$types';

export const load = (async () => {
    return {
		title: 'Shop',
		description: 'Coming soon!',
	};
}) satisfies PageLoad;