<script lang="ts">
	import { formatDate, type ResearchItem } from '$lib/data/research';

	import BaseCard from '$lib/components/BaseCard.svelte';
	import BaseImg from '$lib/components/BaseImg.svelte';
	import Text from '$lib/components/Text.svelte';
	import AwardList from '$lib/research/AwardList.svelte';
	import LinkList from '$lib/research/LinkList.svelte';

	const { item }: { item: ResearchItem } = $props();
</script>

<BaseCard class="relative rounded-3xl!">
	<!-- Awards float over the card -->
	<AwardList awards={item.awards} class="absolute top-0 left-4 -translate-y-1/2" />

	<!-- Main grid -->
	<div class="flex flex-col md:flex-row gap-4 p-3 sm:p-4 ">
		{#if item.picture}
			<!-- Media -->

			<div class="order-1 mx-auto flex items-center max-w-[40%] overflow-hidden rounded-lg border-0 bg-white border-gray-300 dark:border-gray-800 dark:bg-zinc-900">

					<BaseImg src={item.picture} alt="" class="rounded-lg" />
				
			</div>
		{/if}

		<!-- Content -->
		<div class="order-2 space-y-2">
			<Text class="text-xs font-semibold tracking-wide text-primary-600 uppercase dark:text-primary-400">{item.name}</Text>
			<div class="flex flex-wrap items-center gap-2">
				<Text class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.title}</Text>
				<span class="rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 dark:border-blue-900/40 dark:bg-blue-900/20 dark:text-blue-300">
					{item.conference}
				</span>
			</div>
			<Text class="text-xs text-gray-600 italic dark:text-gray-400">{item.authors.map((author) => author.name).join(', ')}</Text>
			<Text class="text-sm leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{@html item.abstract}</Text>

			<!-- Inline meta for wide screens -->
			<div class="hidden flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-gray-600 lg:flex dark:text-gray-400">
				<span><span class="text-gray-500 dark:text-gray-400">Venue:</span> {item.conference}</span>
				<span class="text-gray-300 dark:text-gray-600">•</span>
				<span><span class="text-gray-500 dark:text-gray-400">Location:</span> {item.location}</span>
				<span class="text-gray-300 dark:text-gray-600">•</span>
				<span><span class="text-gray-500 dark:text-gray-400">Date:</span> {formatDate(item.published)}</span>
			</div>

			{#if item.tags.length}
				<ul class="flex flex-wrap gap-1 pt-1 lg:pt-0">
					{#each item.tags as tag}
						<li class="rounded-md border px-1.5 py-0.5 text-[11px] text-gray-600 dark:border-gray-700 dark:text-gray-300">{tag.name}</li>
					{/each}
				</ul>
			{/if}

			<!-- Links -->
			<div class="lg:flex lg:items-center lg:justify-between pt-3">
				<LinkList links={item.links} class="" />
			</div>
		</div>

		<!-- Meta sidebar -->
		<aside class="order-3 h-fit lg:sticky lg:top-6 lg:hidden">
			<div class="rounded-lg border bg-white/60 p-3 text-xs shadow-sm dark:border-gray-800 dark:bg-zinc-900/60">
				<div class="space-y-2">
					<div>
						<p class="tracking-wide text-gray-500 uppercase dark:text-gray-400">Venue</p>
						<p class="font-semibold text-primary-600 dark:text-primary-400">{item.conference}</p>
					</div>
					<div>
						<p class="tracking-wide text-gray-500 uppercase dark:text-gray-400">Location</p>
						<p class="font-medium text-gray-900 dark:text-white">{item.location}</p>
					</div>
					<div>
						<p class="tracking-wide text-gray-500 uppercase dark:text-gray-400">Date</p>
						<p class="font-medium text-gray-900 dark:text-white">{formatDate(item.published)}</p>
					</div>
				</div>
			</div>
		</aside>
	</div>
</BaseCard>
