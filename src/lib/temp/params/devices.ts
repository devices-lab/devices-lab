import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string): param is 'devices1' => {
	return param === 'devices1';
}) satisfies ParamMatcher;
