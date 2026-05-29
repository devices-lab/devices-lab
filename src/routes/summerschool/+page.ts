import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (() => {
	throw redirect(301, 'https://prosquared.org/event/device-prototyping-summer-school-2026/');
}) satisfies PageLoad;
