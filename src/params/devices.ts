import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string): param is 'devices' => {
	return param === 'devices';
}) satisfies ParamMatcher;
