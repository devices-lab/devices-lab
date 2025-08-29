import { modules } from '$workbench/workbench';

export interface WorkbenchItem {
	href: string;
	name: string;
	description: string;
	label: string;
	// Is automatically set to true for external workbench items
	external?: boolean;
}

//==================================================================//

// List of external workbench items to include in the workbench list
const externalTools: WorkbenchItem[] = [
	{
		name: "Image Editor",
		href: `https://mac-aron.github.io/png-rounded-corners/`,
		description: "Round the corners of images",
		label: "design"
	}
];

//==================================================================//

// Process a list of workbench items to set the external flag and sort them by name
function processWorkbenchList(items: WorkbenchItem[], external: boolean): WorkbenchItem[] {
	return items.map(item => ({
		...item,
		external: external
	})).sort((a, b) => a.name.localeCompare(b.name));
}

// Combine internal and external workbench items into a single list
function modulesToWorkbench(modules: Record<string, { item: WorkbenchItem }>): WorkbenchItem[] {
	return [
		...processWorkbenchList(Object.values(modules).map(m => m.item), false),
		...processWorkbenchList(externalTools, true)
	];
}

//==================================================================//

// Collect all devices
export const workbench: WorkbenchItem[] = modulesToWorkbench(modules);