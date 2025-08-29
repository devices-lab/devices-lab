import type { PageLoad } from './$types';

// Load devices data
import { devices } from '$lib/data/devices';


export const load = (async () => {
	return {
		devices
	};
}) satisfies PageLoad;