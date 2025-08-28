<script lang="ts">
	import type { PageProps } from './$types';
	import Person from '$lib/about/Person.svelte';

	const { data }: PageProps = $props();
</script>

<div class="bg-white dark:bg-gray-900">
	<div class="mx-auto max-w-7xl p-6 lg:px-8">
		<ul role="list" class="mx-auto grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6">
			{#each data.team as person}
				<li>
					<Person {person} />
				</li>
			{/each}
		</ul>
	</div>
</div>
