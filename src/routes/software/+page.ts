import type { PageLoad } from './$types';

// Load software data
import { software } from '../[[software=software]]/software';

export const load = (async () => {
    return {
		title: 'Software',
		description: 'Explore our software to help you build devices.',
		software
	};
}) satisfies PageLoad;