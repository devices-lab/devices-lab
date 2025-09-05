<script lang="ts">
	import { formatDate, type ResearchItem } from '$lib/data/research';

	import BaseCard from '$lib/components/BaseCard.svelte';
	import BaseImg from '$lib/components/BaseImg.svelte';
	import Text from '$lib/components/Text.svelte';
	import AwardList from '$lib/research/AwardList.svelte';
	import LinkList from '$lib/research/LinkList.svelte';
	import ResearchCard from './ResearchCard.svelte';

	const { item }: { item: ResearchItem } = $props();
</script>

<BaseCard class="relative rounded-3xl!">
	<!-- Awards float over the card -->
	<AwardList awards={item.awards} class="absolute top-0 left-4 -translate-y-1/2" />

	<!-- Main grid -->
	<div class={`grid gap-6 p-4 sm:p-6 ${item.picture ? 'lg:grid-cols-[320px,1fr,220px]' : 'lg:grid-cols-[1fr,220px]'} lg:gap-8`}>
		{#if item.picture}
			<!-- Media -->
			<div class="order-1">
				<div class="overflow-hidden rounded-xl border bg-white shadow-sm dark:border-gray-800 dark:bg-zinc-900">
					<BaseImg src={item.picture} alt="" class="block h-full w-full object-cover max-w-100 mx-auto" />
				</div>
			</div>
		{/if}

		<!-- Content -->
		<div class="order-2 space-y-3">
			<Text class="text-sm font-semibold tracking-wide text-primary-600 dark:text-primary-400">{item.name}</Text>
			<Text class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.title}</Text>
			<Text class="text-sm text-gray-600 italic dark:text-gray-400">{item.authors.map((author) => author.name).join(', ')}</Text>
			<Text class="leading-relaxed text-gray-700 dark:text-gray-300">{@html item.abstract}</Text>

			{#if item.tags.length}
				<ul class="flex flex-wrap gap-2 pt-1">
					{#each item.tags as tag}
						<li class="rounded-lg border px-2 py-1 text-xs text-gray-600 dark:border-gray-700 dark:text-gray-300">{tag.name}</li>
					{/each}
				</ul>
			{/if}

			<!-- Links -->
			<LinkList links={item.links} class="pt-2" />
		</div>

		<!-- Meta sidebar -->
		<aside class="order-3 h-fit lg:sticky lg:top-6">
			<div class="divide-y rounded-xl border bg-white/70 p-4 text-sm shadow-sm dark:divide-gray-800 dark:border-gray-800 dark:bg-zinc-900/70">
				<div class="pb-3">
					<p class="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">Venue</p>
					<p class="font-medium text-gray-900 dark:text-white">{item.conference}</p>
				</div>
				<div class="py-3">
					<p class="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">Location</p>
					<p class="font-medium text-gray-900 dark:text-white">{item.location}</p>
				</div>
				<div class="pt-3">
					<p class="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">Date</p>
					<p class="font-medium text-gray-900 dark:text-white">{formatDate(item.published)}</p>
				</div>
			</div>
		</aside>
	</div>
</BaseCard>

