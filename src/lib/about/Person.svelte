<script lang="ts">
	import type { TeamMember } from '$lib/data/about';
	import BaseImg from '$lib/components/BaseImg.svelte';
	import BaseLink from '$lib/components/BaseLink.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';

	const { person }: { person: TeamMember } = $props();
</script>

<BaseImg src={person.image} alt="Profile picture" class="mx-auto size-24 rounded-full object-cover outline-1 -outline-offset-1 outline-black/5 dark:outline-white/10 {person.imageAdj}" />
<h3 class="mt-6 text-base/7 font-semibold tracking-tight text-gray-900 dark:text-gray-200">{person.name}</h3>
<p class="text-sm/6 text-gray-600 dark:text-gray-400">{person.role}</p>

{#if person.sites.length > 0}
	<!--<span class="mx-auto flex w-3/4 border-t mb-1 border-gray-200 dark:border-gray-700"></span>-->
	<div class="mt-1 flex flex-wrap justify-center gap-2">
		{#each person.sites as site}
			<Tooltip>
				<BaseLink href={site.href} class="text-sm text-gray-400 hover:text-gray-600 dark:text-gray-500 hover:dark:text-gray-300" aria-label={site.title} target="_blank" rel="noopener noreferrer" title={site.title}>
					<site.icon class="size-5" />
				</BaseLink>

				{#snippet tooltip()}
					<p class="">{site.title}</p>
				{/snippet}
			</Tooltip>
		{/each}
	</div>
{/if}
