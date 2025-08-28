import type { PageLoad } from './$types';

// Load devices data
import { devices } from '../[[devices=devices]]/devices';

export const load = (async () => {
    return {
		title: 'Our Devices',
		description: 'Explore the things we create.',
		devices
	};
}) satisfies PageLoad;