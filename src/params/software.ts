import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string): param is 'software' => {
	return param === 'software';
}) satisfies ParamMatcher;
