<script lang="ts">
	import BaseCard from '$lib/components/BaseCard.svelte';
	import BaseImg from '$lib/components/BaseImg.svelte';
	import type { Entry } from '$lib/data/indexer';
	import Badge from '$lib/items/Badge.svelte';
	import FeaturedLabel from '$lib/items/featured/FeaturedLabel.svelte';
	import { ChevronRight } from '@lucide/svelte';

	type Props = {
		entry: Entry;
	};

	const { entry }: Props = $props();

	const isFamily = $derived(entry.kind === 'family');
</script>

{#key entry}
	<BaseCard link={entry.path} hover class="flex aspect-square flex-col items-center justify-between sm:p-4 max-w-xs text-gray-900 ">
		<div class="flex-1 overflow-hidden pb-12">
			<BaseImg src={entry.thumb} alt="Item hero" class=" my-auto size-full flex-1 rounded-lg object-contain  group-hover:opacity-15 group-hover:grayscale-70 group-hover:blur-xs" />
		</div>

		{#if entry.item.featured}
			<FeaturedLabel class="absolute top-3 left-1 sm:top-4 sm:left-2" />
		{/if}
		{#if isFamily}
			<Badge text="Family" class="absolute top-0 right-0 rounded-bl-3xl px-4 py-3" />
		{/if}

		<div class="absolute inset-0 flex w-full flex-col justify-end bg-gradient-to-b from-slate-500/0 from-0% to-black/0 to-85% p-4 sm:p-6 text-sm opacity-0  group-hover:opacity-90">
			<div class="flex flex-row items-center gap-2">
				<p class="mt-4 line-clamp-3 flex-1 leading-6">{entry.item.teaser}</p>
				<ChevronRight class="size-6 text-current/70" />
			</div>
		</div>

		<div class="absolute inset-0 flex items-end group-hover:items-center justify-center pb-5">
			<h2 class="text-xl group-hover:text-2xl font-semibold tracking-wide text-current group-hover:font-bold">{entry.item.name}</h2>
		</div>
	</BaseCard>
{/key}

<!--

		<BaseLink link={entry.path}>
			<BaseImg src={entry.thumb} alt="Item hero" class="aspect-square w-full rounded-lg object-contain" />
			<div class="mt-4 flex items-center text-base font-medium text-gray-900 dark:text-white {isFamily ? 'mb-2' : ''}">
				{#if isFamily}
					<span class="me-2 inline-block rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-600 dark:text-white">Family</span>
				{/if}
				<h2 class="text-lg font-semibold">{entry.item.name}</h2>
			</div>
			<p class="mt-1 text-sm text-gray-600 dark:text-gray-400">{entry.item.teaser}</p>

			{#if entry.item.tags && entry.item.tags.length}
				<p class="mt-2 text-sm text-gray-400 italic dark:text-gray-600">tags: {entry.item.tags.join(', ')}</p>
			{/if}

			{#if entry.item.featured}
				<FeaturedLabel class="absolute top-3 left-1 sm:top-4 sm:left-2" />
			{/if}
		</BaseLink>

-->
