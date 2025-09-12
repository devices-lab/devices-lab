import { team } from '$lib/data/about';
import type { PageLoad } from './$types';

export const load = (async () => {
	return {
		team
	};
}) satisfies PageLoad;
