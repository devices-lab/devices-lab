<script lang="ts">
	import BaseImg from '$lib/components/BaseImg.svelte';
	import IconLink from '$lib/components/base/IconLink.svelte';
	import type { TeamMember } from '$lib/data/about';

	const { person }: { person: TeamMember } = $props();
</script>

<BaseImg src={person.image} alt="Profile picture" class="mx-auto size-24 rounded-full object-cover outline-1 -outline-offset-1 outline-black/5 dark:outline-white/10 {person.imageAdj}" />
<h3 class="mt-6 text-base/7 font-semibold tracking-tight text-gray-900 dark:text-gray-200">{person.name}</h3>
<p class="text-sm/4 text-gray-600 dark:text-gray-400">{person.role}</p>

{#if person.sites.length > 0}
	<div class="mt-2 flex flex-wrap justify-center gap-2">
		{#each person.sites as site}
			<IconLink href={site.href} class="text-sm text-gray-400 hover:text-gray-600 dark:text-gray-500 hover:dark:text-gray-300" tooltip={{ content: site.text }} icon={{ icon: site.icon, class: 'size-5' }} />
		{/each}
	</div>
{/if}
