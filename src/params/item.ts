import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string): param is 'devices' | 'tools' | 'media' => {
	return param === 'devices' || param === 'tools' || param === 'media';
}) satisfies ParamMatcher;
