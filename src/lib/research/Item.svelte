<script lang="ts">
	import BaseCard from '$lib/components/BaseCard.svelte';
	import BaseImg from '$lib/components/BaseImg.svelte';
	import BaseLink from '$lib/components/BaseLink.svelte';
	import type { Research } from '$lib/data/research';

	const { item }: { item: Research } = $props();
</script>

<BaseCard class="items-start flex">
	<BaseImg src={item.teaser} alt="" class="max-w-60 max-h-60 my-auto flex-none rounded-lg dark:outline dark:-outline-offset-1 dark:outline-white/10" />

	<div class="flex flex-1 flex-col ps-4">
		<div class="flex flex-1 gap-x-4">
			<div class="min-w-0 flex-auto">
				<p class="text-sm/5 font-semibold text-gray-900 dark:text-white">
					{item.title}
				</p>
				<p class="mt-1 flex text-sm/5 text-gray-500 dark:text-gray-400">
					{item.authors.map((author) => author.name).join(', ')}
				</p>
			</div>

			<div class="flex flex-col items-end text-end">
				<p class="text-sm/6 text-nowrap text-gray-900 dark:text-white">{item.conference}</p>
				<p class="text-sm/6 text-nowrap text-gray-900 dark:text-white">{item.location}</p>
				<p class="mt-1 text-xs/5 text-gray-500 dark:text-gray-400">{item.published}</p>
			</div>
		</div>

		<div class="my-2 flex-1 border-t-1 border-gray-200 py-2 dark:border-white/5">
			<p class="text-sm text-gray-500 dark:text-gray-400">{item.abstract}</p>
		</div>

		<div class="flex items-center justify-end gap-x-6">
			{#each item.links as link}
				<BaseLink href={link.href} class="flex text-sm text-blue-500 hover:text-gray-600 dark:text-gray-500 hover:dark:text-gray-300" aria-label={link.title} target="_blank" rel="noopener noreferrer" title={link.title}>
					<link.icon class="me-1 size-5" />
					{link.title}
				</BaseLink>
			{/each}
		</div>
	</div>
</BaseCard>
