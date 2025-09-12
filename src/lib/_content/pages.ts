import type { PageData } from '$lib/data/routes';
import { Hammer, Mail, Users } from '@lucide/svelte';

//────────────────────────────────────────────────────────────────//

/**
 * Page metadata for the application
 * - menuTitle: 	The name to display in the navigation bar (menu)
 * - menuIcon: 		[Optional] An icon to display in the navigation bar (menu)
 * - pageTitle: 	The title of the page
 * - pageSubtitle: 	A brief description of the page
 */
export const Pages: PageData = {
	home: {
		menuTitle: 'Home',
		pageTitle: 'Home',
		pageSubtitle: 'Welcome to our website'
	},
	devices: {
		menuTitle: 'Devices',
		pageTitle: 'Our Devices',
		pageSubtitle: 'Explore the things we create'
	},
	tools: {
		menuTitle: 'Tools',
		pageTitle: 'Our Tools',
		pageSubtitle: 'Explore our tools to help you build devices'
	},
	media: {
		menuTitle: 'Media',
		pageTitle: 'Media',
		pageSubtitle: 'Discover our media content and resources'
	},
	research: {
		menuTitle: 'Research',
		pageTitle: 'Research',
		pageSubtitle: 'Explore our research projects and publications'
	},
	workbench: {
		menuTitle: 'Workbench',
		menuIcon: Hammer,
		pageTitle: 'Workbench',
		pageSubtitle: 'A collection of custom tools designed to make our workflow more efficient and straightforward'
	},
	about: {
		menuTitle: 'About us!',
		menuIcon: Users,
		pageTitle: 'About Us',
		pageSubtitle: 'Learn more about who we are'
	},
	contact: {
		menuTitle: 'Contact us!',
		menuIcon: Mail,
		pageTitle: 'Get in touch',
		pageSubtitle: "Have a question, an idea for collaboration, or want to visit the lab? Reach out, we'd love to hear from you."
	}
};

//────────────────────────────────────────────────────────────────//
