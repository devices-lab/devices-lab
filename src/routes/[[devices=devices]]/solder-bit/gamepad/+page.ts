import type { PageLoad } from './$types';
import { item } from './about';

export const load = (async () => {
    return {
		item
	};
}) satisfies PageLoad;