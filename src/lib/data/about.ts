import { team as teamData } from '$lib/_content/team';
import type { Icon } from '@lucide/svelte';
import type { Picture } from 'vite-imagetools';

export type PersonOrder = '0_professor' | '1_senior' | '2_researcher' | '3_phd' | '4_master' | '5_bachelor' | '6_alumni';

export type TeamLink = {
	href: string;
	text: string;
	icon?: typeof Icon | string;
};

export interface TeamMember {
	name: string;
	role: string;
	image: Picture | string;
	imageAdj?: string;
	order: PersonOrder;
	href: string;
	sites: TeamLink[];
}

export const team: TeamMember[] = teamData.sort((a, b) => {
	const levelComparison = a.order.localeCompare(b.order);
	return levelComparison !== 0 ? levelComparison : a.name.localeCompare(b.name);
})
