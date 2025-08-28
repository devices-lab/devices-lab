import { type Icon, UserRound, Heart, Pickaxe } from '@lucide/svelte';
import { resolve } from '$app/paths';


export interface Route {
	title: string;
	href: string;
	icon?: typeof Icon;
}


export type RouteName = 'home' | 'about' | 'contact' | 'devices' | 'software' | 'research' | 'media' | 'tools' | 'shop';

export const Routes: Record<RouteName, Route> = {
	home: {
		title: 'Home',
		href: resolve('/')
	},
	about: {
		title: 'About Us',
		href: resolve('/about'),
		icon: UserRound
	},
	contact: {
		title: 'Contact Us',
		href: resolve('/contact'),
		icon: Heart
	},
	devices: { 
		title: 'Devices', 
		href: resolve('/devices') 
	},
	software: { 
		title: 'Software', 
		href: resolve('/software') 
	},
	research: { 
		title: 'Research', 
		href: resolve('/research') 
	},
	media: { 
		title: 'Media', 
		href: resolve('/media') 
	},
	tools: { 
		title: 'Tools', 
		href: resolve('/tools'), 
		icon: Pickaxe 
	},
	shop: { 
		title: 'Shop', 
		href: resolve('/shop') 
	}
};
