import { modules } from '$workbench/workbench';
import { Routes } from '$lib/data/routes';
import { workbenchItems as externalWorkbenchItems } from '$lib/_content/workbench';
import type { Icon } from '@lucide/svelte';

type BaseItem = {
	title: string;
	subtitle: string;
	icon?: typeof Icon;
}

export type ExternalWorkbenchItem = BaseItem & { href: string; };
export type InternalWorkbenchItem = BaseItem & {};

export type WorkbenchItem = BaseItem & {
	href: string;
	external: boolean;
};


// Process a list of workbench items to set the external flag and sort them by name
function processWorkbenchList(items: (ExternalWorkbenchItem | InternalWorkbenchItem)[], external: boolean): WorkbenchItem[] {
	return items.map(item => ({
		...item,
		external
	} as WorkbenchItem)).sort((a, b) => a.title.localeCompare(b.title));
}

function parseHref(href: string): string {
	return `${Routes.workbench.id}/${href.split('/').slice(1, -1).join('/')}`;
}

// Combine internal and external workbench items into a single list
function modulesToWorkbench(modules: Record<string, ExternalWorkbenchItem>): WorkbenchItem[] {
	const internalWorkbenchItems = Object.entries(modules).map(([key, value]) => ({ ...value, href: parseHref(key) }));

	return [
		...processWorkbenchList(internalWorkbenchItems, false),
		...processWorkbenchList(externalWorkbenchItems, true)
	];
}

// Collect all devices
export const workbench: WorkbenchItem[] = modulesToWorkbench(modules);