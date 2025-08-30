<script lang="ts">
	import type { TeamMember } from '$lib/data/about';

	const { person }: { person: TeamMember } = $props();
</script>

{#if typeof person.image === 'string'}
	<img src={person.image} alt="" class="mx-auto size-24 rounded-full outline-1 -outline-offset-1 outline-black/5 dark:outline-white/10 object-cover {person.imageAdj}" />
{:else}
	<enhanced:img src={person.image} alt="" class="mx-auto size-24 rounded-full outline-1 -outline-offset-1 outline-black/5 dark:outline-white/10 object-cover {person.imageAdj}" />
{/if}
<h3 class="mt-6 text-base/7 font-semibold tracking-tight text-gray-900 dark:text-white">{person.name}</h3>
<p class="text-sm/6 text-gray-600 dark:text-gray-400">{person.role}</p>
