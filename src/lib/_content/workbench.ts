import type { ExternalWorkbenchItem } from '$lib/data/workbench';
import { SquareRoundCorner } from '@lucide/svelte';

//────────────────────────────────────────────────────────────────//

/**
 * List of links to workbench tools that are not included in the website, e.g. on hosted on another domain like GitHub.
 * Internal tools should be added to src/routes/workbench.
 *  - name: The name of the tool
 *  - href: The URL to the tool
 *  - description: A brief description of the functionality of the tool
 *  - label: A label for the tool, used for categorization
 */
export const workbenchItems: ExternalWorkbenchItem[] = [
	{
		title: "Image Editor",
		subtitle: "Round the corners of images",
		href: `https://mac-aron.github.io/png-rounded-corners/`,
		icon: SquareRoundCorner
	}
];

//────────────────────────────────────────────────────────────────//

/**
 * List of research paper types.
 */
export const researchTypeItems = [
	'Research Paper',
	'Thesis',
	'Book',
	'Extended Abstract',
	'Poster',
	'Report'
];