import { contact } from '$lib/data/contact';
import type { PageLoad } from './$types';

export const load = (async () => {
    return {
		contact
	};
}) satisfies PageLoad;