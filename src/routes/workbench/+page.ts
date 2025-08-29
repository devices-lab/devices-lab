import type { PageLoad } from './$types';

// Load workbench data
import { workbench } from '$lib/data/workbench';

export const load = (async () => {
    return {
		workbench
	};
}) satisfies PageLoad;