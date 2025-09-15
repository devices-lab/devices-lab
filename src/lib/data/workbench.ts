import { workbenchItems as externalWorkbenchItems } from '$lib/_content/workbench';
import type { Icon } from '@lucide/svelte';


// Use vite to import all device files
const modules = import.meta.glob('$workbench/*/**/about.ts', { eager: true, import: 'item' }) as Record<string, ExternalWorkbenchItem>;


type BaseItem = {
	title: string;
	subtitle: string;
	icon?: typeof Icon;
	href: string;
};

export type ExternalWorkbenchItem = BaseItem & { };
export type InternalWorkbenchItem = BaseItem & {
	name: string // name to show in the breadcrumbs
};

export type WorkbenchItem = BaseItem & {
	href: string;
	external: boolean;
};

// Process a list of workbench items to set the external flag and sort them by name
function processWorkbenchList(items: (ExternalWorkbenchItem | InternalWorkbenchItem)[], external: boolean): WorkbenchItem[] {
	return items
		.map(
			(item) =>
				({
					...item,
					external
				}) as WorkbenchItem
		)
		.sort((a, b) => a.title.localeCompare(b.title));
}

function parseHref(href: string): string {
	return `/${href.split('/').slice(3, -1).join('/')}`;
}

// Combine internal and external workbench items into a single list
function modulesToWorkbench(modules: Record<string, ExternalWorkbenchItem>): WorkbenchItem[] {
	const internalWorkbenchItems = Object.entries(modules).map(([key, value]) => ({ ...value, href: parseHref(key) }));

	return [...processWorkbenchList(internalWorkbenchItems, false), ...processWorkbenchList(externalWorkbenchItems, true)];
}

// Collect all devices
export const workbench: WorkbenchItem[] = modulesToWorkbench(modules);
