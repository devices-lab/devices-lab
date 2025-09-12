import { workbench } from '$lib/data/workbench';
import type { PageLoad } from './$types';

export const load = (async () => {
	return {
		workbench
	};
}) satisfies PageLoad;
