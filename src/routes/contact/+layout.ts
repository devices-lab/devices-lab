import type { LayoutLoad } from './$types';

import { Routes } from '$lib/_data/routes';

export const load = (async () => {
	return {
		route: Routes.contact,
		title: 'Contact Us',
		subtitle: 'Get in touch with our team.',
	};
}) satisfies LayoutLoad;