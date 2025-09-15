import { Routes } from '$lib/data/routes';
import type { InternalWorkbenchItem } from '$lib/data/workbench';
import { ScrollText } from '@lucide/svelte';
//=================================================//

export const item: InternalWorkbenchItem = {
	title: 'BibTeX Formatter',
	subtitle: 'Format BibTeX entries for entering them on this website',
	icon: ScrollText,
	href: `${Routes.workbench.id}/bibtex`,
	name: 'bibtex'
};
