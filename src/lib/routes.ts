import { type Icon, UserRound, Heart, Pickaxe } from '@lucide/svelte';
import { resolve } from '$app/paths';


export interface Route {
	title: string;
	href: string;
	name: string;
	icon?: typeof Icon;
}


export type RouteName = 'home' | 'about' | 'contact' | 'devices' | 'software' | 'research' | 'media' | 'tools' | 'shop';

export const Routes: Record<RouteName, Route> = {
	home: {
		title: 'Home',
		name: '/',
		href: resolve('')
	},
	about: {
		title: 'About Us',
		name: '/about',
		href: resolve('/about'),
		icon: UserRound
	},
	contact: {
		title: 'Contact Us',
		name: '/contact',
		href: resolve('/contact'),
		icon: Heart
	},
	devices: {
		title: 'Devices',
		name: '/devices',
		href: resolve('/devices') 
	},
	software: {
		title: 'Tools',
		name: '/software',
		href: resolve('/software')
	},
	research: {
		title: 'Research',
		name: '/research',
		href: resolve('/research')
	},
	media: {
		title: 'Media',
		name: '/media',
		href: resolve('/media')
	},
	tools: {
		title: 'Tools',
		name: '/tools',
		href: resolve('/tools'),
		icon: Pickaxe
	},
	shop: {
		title: 'Shop',
		name: '/shop',
		href: resolve('/shop')
	}
};
