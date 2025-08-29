import { type Icon, UserRound, Heart, Pickaxe } from '@lucide/svelte';


export type RouteName = 'home' | 'about' | 'contact' | 'devices' | 'software' | 'research' | 'media' | 'workbench' | 'shop';

export interface Route {
	id: RouteName;
	title: string;
	href: string;

	// Optional icon
	icon?: typeof Icon;

}




export const Routes: Record<RouteName, Route> = {
	home: {
		id: 'home',
		title: 'Home',
		href: '/',
	},
	about: {
		id: 'about',
		title: 'About Us',
		href: '/about',
		icon: UserRound
	},
	contact: {
		id: 'contact',
		title: 'Contact Us',
		href: '/contact',
		icon: Heart
	},
	devices: {
		id: 'devices',
		title: 'Devices',
		href: '/devices',
	},
	software: {
		id: 'software',
		title: 'Tools',
		href: '/software',
	},
	research: {
		id: 'research',
		title: 'Research',
		href: '/research',
	},
	media: {
		id: 'media',
		title: 'Media',
		href: '/media',
	},
	workbench: {
		id: 'workbench',
		title: 'Workbench',
		href: '/workbench',
		icon: Pickaxe
	},
	shop: {
		id: 'shop',
		title: 'Shop',
		href: '/shop',
	}
};


export const parseEventRoute = (route: string | null): string => {
	if (!route) return '';
	route = route.replace("[[devices=devices]]", "devices");
	route = route.replace("[[software=software]]", "software");
	route = route.replace("[[media=media]]", "media");
	route = route.replace("[[research=research]]", "research");
	return route;
};