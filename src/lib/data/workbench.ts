import { modules } from '$workbench/workbench';
import { workbenchItems as externalWorkbenchItems } from '$lib/_content/workbench';

export interface WorkbenchItem {
	href: string;
	name: string;
	description: string;
	label: string;
	// Is automatically set to true for external workbench items
	external?: boolean;
}


// Process a list of workbench items to set the external flag and sort them by name
function processWorkbenchList(items: WorkbenchItem[], external: boolean): WorkbenchItem[] {
	return items.map(item => ({
		...item,
		external: external
	})).sort((a, b) => a.name.localeCompare(b.name));
}

// Combine internal and external workbench items into a single list
function modulesToWorkbench(modules: Record<string, { item: WorkbenchItem }>): WorkbenchItem[] {
	const internalWorkbenchItems = Object.values(modules).map(m => m.item);
	return [
		...processWorkbenchList(internalWorkbenchItems, false),
		...processWorkbenchList(externalWorkbenchItems, true)
	];
}

// Collect all devices
export const workbench: WorkbenchItem[] = modulesToWorkbench(modules);