import { Routes } from '$lib/data/routes';
import type { InternalWorkbenchItem } from '$lib/data/workbench';
import { WandSparkles } from '@lucide/svelte';
//=================================================//

export const item: InternalWorkbenchItem = {
	title: 'Item Family Configurator',
	subtitle: 'Generate family entries for entering them on this website',
	icon: WandSparkles,
	href: `${Routes.workbench.id}/family`,
	name: 'family'
};
