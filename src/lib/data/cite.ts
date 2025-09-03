import { Cite } from '@citation-js/core';
import '@citation-js/plugin-doi';
import '@citation-js/plugin-csl';

// https://github.com/citation-js/citation-js/tree/main

export async function cite(doi: string) {
	const cite = await Cite.async(doi);
	return cite.format('data', {
		format: 'object'
	});
}