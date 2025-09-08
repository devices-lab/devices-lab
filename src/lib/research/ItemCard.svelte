<script lang="ts">
	import BaseCard from '$lib/components/BaseCard.svelte';
	import BaseImg from '$lib/components/BaseImg.svelte';
	import RichText from '$lib/components/richtext/RichText.svelte';
	import { svelteMap, tagMap } from '$lib/components/richtext/maps';
	import { formatDate, type ResearchItem } from '$lib/data/research';
	import AwardList from '$lib/research/AwardList.svelte';
	import LinkList from '$lib/research/LinkList.svelte';
	import Batch from '../components/batches/Batch.svelte';
	import TagList from './TagList.svelte';

	const { item }: { item: ResearchItem } = $props();
</script>

<BaseCard class="relative rounded-3xl! p-8!">
	<!-- Awards float over the card -->
	<AwardList awards={item.awards} class="absolute top-0 left-4 -translate-y-1/2" />

	{#if item.conference}
		<div class="absolute top-0 right-0 flex">
			<Batch class="rounded-none! rounded-tr-3xl! rounded-bl-2xl! bg-slate-50! text-slate-700! outline-slate-200 dark:bg-slate-900/20! dark:text-slate-300! dark:outline-slate-900/40!">
				<span class="text-nowrapp flex-1 text-xs font-medium lg:text-sm/6">{item.conference}</span>
			</Batch>
		</div>
	{/if}

	<!-- Main grid -->
	<div class="mt-6 flex flex-col gap-8 lg:flex-row">
		{#if item.picture}
			<!-- Media -->
			<div class="order-1 mx-auto flex flex-2 items-start lg:mt-0 overflow-hidden rounded-lg">
				<BaseImg src={item.picture} alt="" class="w-full flex-0 grow rounded-lg" />
			</div>
		{/if}

		<!-- Content -->
		<div class="order-2 flex-3 space-y-2">
			<h2 class="text-xs font-semibold tracking-wide text-primary-600 uppercase dark:text-primary-400">{item.type}</h2>
			<h1 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.title}</h1>
			<p class="text-xs text-gray-600 italic dark:text-gray-400">{item.authors.map((author) => author.name).join(', ')}</p>
			<p class="text-sm leading-relaxed whitespace-pre-wrap text-gray-700 dark:text-gray-300">
				<RichText source={item.abstract} {svelteMap} {tagMap} />
			</p>

			<!-- Inline meta for wide screens -->
			<div class=" flex flex-col flex-wrap items-start gap-x-2 gap-y-1 pt-1 text-xs text-gray-600 sm:flex-row sm:items-center dark:text-gray-400">
				{#if item.conference}
					<span><span class="text-gray-500 dark:text-gray-400">Conference:</span> {item.conference}</span>
				{/if}
				{#if item.location}
					<span>
						{#if item.conference}
							<span class="hidden text-gray-300 sm:inline dark:text-gray-600">•</span>
						{/if}
						<span><span class="text-gray-500 dark:text-gray-400">Location:</span> {item.location}</span>
					</span>
				{/if}
				{#if item.published.year && item.published.month && item.published.day}
					<span>
						{#if item.conference || item.location}
							<span class="hidden text-gray-300 sm:inline dark:text-gray-600">•</span>
						{/if}
						<span class="text-gray-500 dark:text-gray-400">Date:</span>
						{formatDate(item.published)}
					</span>
				{/if}
			</div>

			<!-- Tags -->
			<div class="flex items-center justify-between">
				<TagList tags={item.tags} class="" />
			</div>

			<!-- Links -->
			<div class="pt-3 lg:flex lg:items-center lg:justify-between">
				<LinkList links={item.links} class="" />
			</div>
		</div>
	</div>
</BaseCard>
