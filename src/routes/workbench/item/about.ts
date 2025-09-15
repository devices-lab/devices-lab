import { Routes } from '$lib/data/routes';
import type { InternalWorkbenchItem } from '$lib/data/workbench';
import { WandSparkles } from '@lucide/svelte';
//=================================================//

export const item: InternalWorkbenchItem = {
	title: 'Device / Tool / Media Configurator',
	subtitle: 'Generate devices, tools or media entries for entering them on this website',
	icon: WandSparkles,
	href: `${Routes.workbench.id}/item`,
	name: 'item'
};
