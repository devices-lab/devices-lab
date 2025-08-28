import { type Icon, UserRound, Heart, Pickaxe } from '@lucide/svelte';


export interface Route {
	title: string;
	href: string;
	icon?: typeof Icon;
}


export type RouteName = 'home' | 'about' | 'contact' | 'devices' | 'software' | 'research' | 'media' | 'tools' | 'shop';

export const Routes: Record<RouteName, Route> = {
	home: {
		title: 'Home',
		href: '/'
	},
	about: {
		title: 'About Us',
		href: '/about',
		icon: UserRound
	},
	contact: {
		title: 'Contact Us',
		href: '/contact',
		icon: Heart
	},
	devices: { 
		title: 'Devices', 
		href: '/devices' 
	},
	software: { 
		title: 'Software', 
		href: '/software' 
	},
	research: { 
		title: 'Research', 
		href: '/research' 
	},
	media: { 
		title: 'Media', 
		href: '/media' 
	},
	tools: { 
		title: 'Tools', 
		href: '/tools', 
		icon: Pickaxe 
	},
	shop: { 
		title: 'Shop', 
		href: '/shop' 
	}
};
