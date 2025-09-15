import { Routes } from '$lib/data/routes';
import type { InternalWorkbenchItem } from '$lib/data/workbench';
import { Feather } from '@lucide/svelte';
//=================================================//

export const item: InternalWorkbenchItem = {
	title: 'Logo Generator',
	subtitle: 'Generate DevicesLab logos for various use cases',
	icon: Feather,
	href: `${Routes.workbench.id}/logo`,
	name: 'logo'
};
