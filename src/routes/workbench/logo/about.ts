import type { WorkbenchItem } from '$lib/data/workbench';
import { Routes } from '$lib/data/routes';
//=================================================//

export const item: WorkbenchItem = {
	name: "Logo Generator",
	description: "Generate DeviceLab logos",
	href: `${Routes.workbench.href}/logo`,
	label: "design"
};