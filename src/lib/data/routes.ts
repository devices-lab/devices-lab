import { type Icon } from '@lucide/svelte';
import { Pages } from '$lib/_content/pages';

//────────────────────────────────────────────────────────────────//

// Route names for the application
export type RouteName = 'home' | 'devices' | 'tools' | 'media' | 'research' | 'workbench' | 'about' | 'contact';

//────────────────────────────────────────────────────────────────//

// Content metadata for each page
export interface PageInfo {
	menuTitle: string;
	menuIcon?: typeof Icon;
	pageTitle: string;
	pageSubtitle: string;
}

// Mapping of route names to their page metadata
export type PageData = Record<RouteName, PageInfo>;

//────────────────────────────────────────────────────────────────//

// Route definition for each page
export interface Route {
	id: RouteName;
	title: string;
	href: string;
	icon?: typeof Icon;
}

// Mapping of route names to their route definitions
export const Routes: Record<RouteName, Route> = {
	home: {
		id: 'home',
		title: Pages.home.menuTitle,
		href: '/',
		icon: Pages.home.menuIcon
	},
	devices: {
		id: 'devices',
		title: Pages.devices.menuTitle,
		href: '/devices',
		icon: Pages.devices.menuIcon
	},
	tools: {
		id: 'tools',
		title: Pages.tools.menuTitle,
		href: '/tools',
		icon: Pages.tools.menuIcon
	},
	media: {
		id: 'media',
		title: Pages.media.menuTitle,
		href: '/media',
		icon: Pages.media.menuIcon
	},
	research: {
		id: 'research',
		title: Pages.research.menuTitle,
		href: '/research',
		icon: Pages.research.menuIcon
	},
	workbench: {
		id: 'workbench',
		title: Pages.workbench.menuTitle,
		href: '/workbench',
		icon: Pages.workbench.menuIcon
	},
	about: {
		id: 'about',
		title: Pages.about.menuTitle,
		href: '/about',
		icon: Pages.about.menuIcon
	},
	contact: {
		id: 'contact',
		title: Pages.contact.menuTitle,
		href: '/contact',
		icon: Pages.contact.menuIcon
	}
};

//────────────────────────────────────────────────────────────────//

// Main navigation menu
export const MainMenu: Route[] = [
	Routes.home,
	Routes.devices,
	Routes.tools,
	Routes.media,
	Routes.research
];

// Side navigation menu
export const SideMenu: Route[] = [
	Routes.workbench,
	Routes.about,
	Routes.contact
];

//────────────────────────────────────────────────────────────────//

// Utility function to 'resolve' event routes by replacing dynamic segments
/*
export const parseEventRoute = (route: string | null): string => {
	if (!route) return '';
	route = route.replace("[[devices=devices]]", "devices");
	route = route.replace("[[tools=tools]]", "tools");
	route = route.replace("[[media=media]]", "media");
	route = route.replace("[[research=research]]", "research");
	return route;
};
*/