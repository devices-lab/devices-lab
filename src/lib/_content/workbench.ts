import type { WorkbenchItem } from '$lib/data/workbench';

//────────────────────────────────────────────────────────────────//

/**
 * List of links to workbench tools that are not included in the website, e.g. on hosted on another domain like GitHub.
 * Internal tools should be added to src/routes/workbench.
 *  - name: The name of the tool
 *  - href: The URL to the tool
 *  - description: A brief description of the functionality of the tool
 *  - label: A label for the tool, used for categorization
 */
export const workbenchItems: WorkbenchItem[] = [
	{
		name: "Image Editor",
		href: `https://mac-aron.github.io/png-rounded-corners/`,
		description: "Round the corners of images",
		label: "design"
	}
];

//────────────────────────────────────────────────────────────────//