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

	const stackClass = $derived(entry.kind === 'family' ? `
		before:content-[''] 
		before:absolute 
		before:inset-0 
		before:-translate-x-2.5 
		before:-translate-y-2.5 
		before:rounded-3xl 
		before:bg-slate-100/60
		before:shadow
		before:-z-10 
		after:content-[''] 
		after:absolute 
		after:inset-0 
		after:-translate-x-5
		after:-translate-y-5
		after:rounded-3xl 
		after:opacity-50
		after:bg-slate-400/30
		after:shadow
		after:-z-20
		border-4 border-slate-200 ms-10 mt-10` : '');
</script>

{#key entry}
	<BaseCard link={{ href: entry.path }} stacked={entry.kind === 'family'} class="group flex aspect-square max-w-xs flex-col items-center justify-between">

		<div class="flex-1 overflow-hidden pb-12">
			<BaseImg src={entry.thumb} alt="Item hero" class="my-auto size-full flex-1 rounded-lg object-contain group-hover:opacity-15 group-hover:blur-xs group-hover:grayscale-70" />
		</div>

		{#if entry.item.featured}
			<FeaturedLabel class="absolute top-3 left-1 sm:top-4 sm:left-2" />
		{/if}


		{#if entry.kind === 'family'}
			<BadgeDark text="Family" class="absolute top-0 w-full rounded-t-3xl px-4 py-2" />
		{/if}


		<!--
		{#if entry.kind === 'family'}
			<BadgeDark text="Family" class="absolute top-0 right-0 rounded-bl-3xl px-4 py-3" />
		{/if}
		-->

		<div class="absolute inset-0 flex w-full flex-col justify-end bg-gradient-to-b p-4 opacity-0 group-hover:opacity-90 sm:p-6">
			<div class="flex flex-row items-center gap-2">
				<p class="mt-4 line-clamp-4 flex-1 leading-6">{entry.item.teaser}</p>
				<ChevronRight class="size-6 text-current/70" />
			</div>
		</div>

		<div class="absolute inset-0 flex items-end justify-center pb-5 group-hover:items-center">
			<h2 class="text-xl font-semibold tracking-wide text-current group-hover:text-2xl group-hover:font-bold">{entry.item.name}</h2>
		</div>




	</BaseCard>
{/key}
