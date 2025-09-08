import type { PageLoad } from './$types';

// Load devices data
import { devices } from '$lib/_content/data';


export const load = (async () => {
	return {
		devices
	};
}) satisfies PageLoad;