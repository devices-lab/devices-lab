import type { ItemData } from "$lib/data/indexer";

export const item: ItemData = {
	name: 'name',
	pathName: 'abc path',
	teaser: 'teaser',
	description: 'description',

	// identification
	projectName: undefined,
	projectID: undefined,
	projectVersion: undefined,

	// content
	features: [],
	resources: [],
	publications: [],

	tags: ['test'],
	featured: false,
};