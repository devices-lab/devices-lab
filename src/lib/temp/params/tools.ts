import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string): param is 'tools' => {
	return param === 'tools';
}) satisfies ParamMatcher;
