<script lang="ts">
	import type { PageProps } from './$types';

	import ResearchItem from '$lib/research/ItemCard.svelte';

	const { data }: PageProps = $props();
</script>

{#if data.researchLibrary}
	<section class="relative">
		<ul role="list" class="divide-y divide-gray-100 dark:divide-white/5">
			{#each Object.values(data.researchLibrary) as item}
				<li class="mb-12">
					<ResearchItem {item} />
				</li>
			{/each}
		</ul>
	</section>
{:else}
	<p class="text-center text-sm text-gray-500 italic">No research items found.</p>
{/if}
