import type { PageLoad } from './$types';

// Load contact data
import { contact } from '$lib/data/contact';

export const load = (async () => {
    return {
		contact
	};
}) satisfies PageLoad;