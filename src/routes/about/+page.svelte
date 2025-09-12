<script lang="ts">
	import type { PageProps } from './$types';
	import Person from '$lib/about/Person.svelte';
	import BaseCard from '$lib/components/BaseCard.svelte';

	const { data }: PageProps = $props();
</script>

<BaseCard class="mx-auto max-w-7xl p-6 lg:px-8">

		<div class="mx-auto grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6">
			{#each data.team as person}
			
					<Person {person} />
			
			{/each}
			</div>
	
</BaseCard>
