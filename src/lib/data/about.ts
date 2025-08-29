import type { Picture } from 'vite-imagetools';
import { team as teamData } from '$lib/_content/team';

export type PersonOrder = 'level1' | 'level2' | 'level3' | 'level4' | 'level5' | 'level6' | 'level7';

export interface Person {
	name: string;
	role: string;
	image: Picture | string;
	imageAdj?: string;
	order: PersonOrder;
	href: string;
}

export const team: Person[] = teamData.sort((a, b) => {
	const levelComparison = a.order.localeCompare(b.order);
	return levelComparison !== 0 ? levelComparison : a.name.localeCompare(b.name);
})
