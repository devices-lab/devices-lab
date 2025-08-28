import type { PageLoad } from './$types';

// Load contact data
import { contact } from '$lib/_data/contact';

export const load = (async () => {
    return {
		title: 'Get in touch',
		description: 'We would love to hear from you!',
		contact
	};
}) satisfies PageLoad;