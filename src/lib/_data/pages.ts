
import { type Route, Routes } from '$lib/_data/routes';
import type { ItemType } from '$lib/_data/item';

import { devicesFeatured } from '$lib/_data/devices';
import { softwareFeatured } from '$lib/_data/software';



export interface Page {
	route: Route;
	menu?: ItemType[];
}

export const Pages: Record<string, Page> = {
	home: {
		route: Routes.home,
	},
	devices: {
		route: Routes.devices,
		menu: devicesFeatured
	},
	software: {
		route: Routes.software,
		menu: softwareFeatured
	},
	media: {
		route: Routes.media,
	},
	research: {
		route: Routes.research,
	}
};


export const menu: Page[] = [
	Pages.home,
	Pages.devices,
	Pages.software,
	Pages.media,
	Pages.research
];

export const sideMenu: Route[] = [
	Routes.workbench,
	Routes.about,
	Routes.contact
];
