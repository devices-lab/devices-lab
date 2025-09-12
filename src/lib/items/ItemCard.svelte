<script lang="ts">
	import BadgeDark from '$lib/components/badges/BadgeDark.svelte';
	import BaseCard from '$lib/components/BaseCard.svelte';
	import BaseImg from '$lib/components/images/BaseImg.svelte';
	import type { Entry } from '$lib/data/indexer';
	import FeaturedLabel from '$lib/items/featured/FeaturedLabel.svelte';
	import { ChevronRight } from '@lucide/svelte';

	type Props = {
		entry: Entry;
	};

	const { entry }: Props = $props();
</script>

{#key entry}
	<BaseCard link={{href: entry.path}} class="flex aspect-square flex-col items-center justify-between sm:p-4 max-w-xs overflow-hidden">
		<div class="flex-1 overflow-hidden pb-12">
			<BaseImg src={entry.thumb} alt="Item hero" class=" my-auto size-full flex-1 rounded-lg object-contain  group-hover:opacity-15 group-hover:grayscale-70 group-hover:blur-xs" />
		</div>

		{#if entry.item.featured}
			<FeaturedLabel class="absolute top-3 left-1 sm:top-4 sm:left-2" />
		{/if}
		{#if entry.kind === 'family'}
			<BadgeDark text="Family" class="absolute top-0 right-0 rounded-bl-3xl px-4 py-3" />
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
