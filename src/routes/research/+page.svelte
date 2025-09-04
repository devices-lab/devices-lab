<script lang="ts">
	import type { PageProps } from './$types';

	import ResearchItem from '$lib/research/ItemCard.svelte';

	const { data }: PageProps = $props();
</script>

{#if data.research.length > 0}
	<section class="relative">
		<ul role="list" class="divide-y divide-gray-100 dark:divide-white/5">
			{#each data.research as item}
				<li class="mb-8">
					<ResearchItem {item} />
				</li>
			{/each}
			{#each data.researchFromDOI as item}
				<li class="mb-8">
					<!--<ResearchItem {item} />-->
				</li>
			{/each}
		</ul>
	</section>
{:else}
	<p class="text-center text-sm text-gray-500 italic">No research items found.</p>
{/if}
