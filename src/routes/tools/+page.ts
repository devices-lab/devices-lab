import type { PageLoad } from './$types';

// Load tools data
import { tools } from './tools';

export const load = (async () => {
    return {
		title: 'Toolbox',
		description: 'A collection of custom tools designed to make our workflow more efficient and straightforward.',
		tools

	};
}) satisfies PageLoad;