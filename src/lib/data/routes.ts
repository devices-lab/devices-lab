import { resolve } from '$app/paths';
import type { RouteId } from '$app/types';
import { Pages } from '$lib/_content/pages';
import { type Icon } from '@lucide/svelte';

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

export type ParamRoutes = 'devices' | 'tools' | 'media';


/*
function isExternal(u: string): boolean {
	return /^(https?:|mailto:|tel:)/.test(u);
}

*/

/**
 * Resolve a href, slug, and type into a full href and external flag.
 * If href is external, return as is.
 * If href is internal and no type, return as is.
 * If href is internal and type is given, construct the full path using the slug.

export function resolveHref(href?: string | RouteId, slug?: string, type?: ParamRoutes, external?: boolean): { href: string | ResolvedPathname, external: boolean } {
	// Just return external links
	if (href && isExternal(href)) {
		return { href: href, external: external ?? true };
	}
	// Internal links without params
	if (href && !type) {
		return { href: resolve(href as Pathname), external: external ?? false };
	}
	// Sanity check
	if (!slug) {
		return { href: '#', external: false };
	}
	// Internal links with params
	switch (type) {
		case 'devices':
			return { href: resolve('/devices/[...rest]', { rest: slug }), external: external ?? false };
		case 'tools':
			return { href: resolve('/tools/[...rest]', { rest: slug }), external: external ?? false };
		case 'media':
			return { href: resolve('/media/[...rest]', { rest: slug }), external: external ?? false };
		default:
			break;
	}
	// Fallback for unresolved routes
	console.warn(`Could not resolve route ${href} with slug ${slug} and type ${type}`);
	return { href: '/', external: external ?? false };
}
 */

/**
 * If the path matches a device, tools, etc, return its full href.
 */
/*
export function redirectHref(item: Entry): ResolvedPathname | undefined {
	switch (item.route.key) {
		case 'devices':
			return resolve('/devices/[...rest]', { rest: item.slug });
		case 'tools':
			return resolve('/tools/[...rest]', { rest: item.slug });
		case 'media':
			return resolve('/media/[...rest]', { rest: item.slug });
		default:
			break;
	}
	return;;
}
	*/

// Route definition for each page
export type Route = {
	id: RouteId | string;
	key: RouteName;

	title: string;
	icon?: typeof Icon;
	breadcrumbs: { title: string; href: string }[];
}

// Mapping of route names to their route definitions
export const Routes: Record<RouteName, Route> = {
	home: {
		id: '/',
		key: 'home',
		title: Pages.home.menuTitle,
		icon: Pages.home.menuIcon,
		breadcrumbs: []
	},
	devices: {
		id: '/devices',
		key: 'devices',
		title: Pages.devices.menuTitle,
		icon: Pages.devices.menuIcon,
		breadcrumbs: [{ title: 'devices', href: '/devices' }]
	},
	tools: {
		id: '/tools',
		key: 'tools',
		title: Pages.tools.menuTitle,
		icon: Pages.tools.menuIcon,
		breadcrumbs: [{ title: 'tools', href: '/tools' }]
	},
	media: {
		id: '/media',
		key: 'media',
		title: Pages.media.menuTitle,
		icon: Pages.media.menuIcon,
		breadcrumbs: [{ title: 'media', href: '/media' }]
	},
	research: {
		id: '/research',
		key: 'research',
		title: Pages.research.menuTitle,
		icon: Pages.research.menuIcon,
		breadcrumbs: [{ title: 'research', href: '/research' }]
	},
	workbench: {
		id: '/workbench',
		key: 'workbench',
		title: Pages.workbench.menuTitle,
		icon: Pages.workbench.menuIcon,
		breadcrumbs: [{ title: 'workbench', href: '/workbench' }]
	},
	about: {
		id: '/about',
		key: 'about',
		title: Pages.about.menuTitle,
		icon: Pages.about.menuIcon,
		breadcrumbs: [{ title: 'about', href: '/about' }]
	},
	contact: {
		id: '/contact',
		key: 'contact',
		title: Pages.contact.menuTitle,
		icon: Pages.contact.menuIcon,
		breadcrumbs: [{ title: 'contact', href: '/contact' }]
	}
};

export function findRoute(path: string): Route {
	const raw = path.split('?')[0].split('#')[0];
	const cleanPath = raw.startsWith('/') ? raw : '/' + raw; // Ensure leading slash
	return Object.values(Routes).find(route => route.id !== '/' && cleanPath.startsWith(route.id)) || Routes.home;
}

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

export type Href = string | RouteId;

export type Link = {
	href?: Href;
	external?: boolean;
};


function isExternal(u: string): boolean {
	return /^(https?:|mailto:|tel:)/.test(u);
}

export function resolveLink(link: Link | Href): Link {
	// Make sure we have a Link object
	if (typeof link === 'string') link = { href: link };

	if (!link.href)
		return { href: '#', external: link.external ?? false };
	return (isExternal(link.href) ? { href: link.href, external: link.external ?? true } : { href: resolve(link.href), external: link.external ?? false });
}
