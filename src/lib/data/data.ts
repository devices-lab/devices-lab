




export type Feature = {
	text: string;
}

export type Date = {
	year: number;
	month: number;
	day: number;
};

export type Author = {
	name: string;
	affiliation: string;
}

export type Reference = {
	href: string;
	text: string;
	icon: string;
};

export type Award = {
	name: string;
	icon: string;
}

export type Tag = {
	name: string
}

export type Publication = {
	// core information
	key: string;				// -- unique id, e.g., DOI
	doi: string;
	type: string;				// -- paper, extended abstract, ...
	name: string;				// -- a short name for the research item
	title: string;				// -- the full title of the research item
	abstract: string;
	authors: Author[];
	// published
	published: Date;
	conference: string;
	conferenceShort: string;
	location: string;
	// additional information
	links: Reference[];
	awards: Award[];
	tags: Tag[];
}