import type { PageLoad } from './$types';
import { item } from './about';

export const load = (async () => {
	return {
		item,
		title: item.title,
		subtitle: item.subtitle
	};
}) satisfies PageLoad;