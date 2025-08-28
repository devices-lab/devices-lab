import type { PageLoad } from './$types';

export const load = (async () => {
    return {
		title: 'Logo Generator',
		description: 'Generate DevicesLab logos for various use cases.',
	};
}) satisfies PageLoad;