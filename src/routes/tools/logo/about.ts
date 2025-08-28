import type { Tool } from '$lib/_data/tools';
import { Routes } from '$lib/routes';
//=================================================//

export const item: Tool = {
	name: "Logo Generator",
	description: "Generate DeviceLab logos",
	href: `${Routes.tools.href}/logo`,
	label: "design"
};