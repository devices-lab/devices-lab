<script lang="ts">
	import BaseCard from '$lib/components/BaseCard.svelte';
	import BaseImg from '$lib/components/images/BaseImg.svelte';
	import Batch from '$lib/components/badges/BadgeLight.svelte';
	import Collapse from '$lib/components/Collapse.svelte';
	import RichText from '$lib/components/richtext/RichText.svelte';
	import { formatDate, type ResearchItem } from '$lib/data/research';
	import AwardList from '$lib/research/AwardList.svelte';
	import LinkList from '$lib/research/LinkList.svelte';

	const { item }: { item: ResearchItem } = $props();
</script>

<BaseCard class="relative rounded-3xl p-8 ">
	<!-- Awards float over the card -->
	<AwardList awards={item.awards} class="absolute top-0 left-4 -translate-y-1/2" />

	{#if item.conferenceShort}
		<div class="absolute top-0 right-0 flex text-slate-700 dark:text-slate-300">
			<Batch class="rounded-none rounded-tr-3xl rounded-bl-2xl bg-slate-50  outline-slate-200 dark:bg-slate-900/20  dark:outline-slate-900/40">
				<span class="flex-1 px-2 py-1 text-sm font-bold text-nowrap">{item.conferenceShort}</span>
			</Batch>
		</div>
	{/if}

	<!-- Main grid -->
	<div class="mt-6 flex flex-col gap-8 lg:flex-row">
		{#if item.picture}
			<!-- Media -->
			<div class="item order-1 mx-auto flex flex-2 items-start overflow-hidden rounded-lg lg:mt-0">
				<BaseImg src={item.picture} alt="" class="w-full max-w-md flex-0 grow rounded-lg" />
			</div>
		{/if}

		<!-- Content -->
		<div class="order-2 flex-3 space-y-2">
			<h2 class="text-xs font-semibold tracking-wide text-primary uppercase">{item.type}</h2>
			<h1 class="text-xl font-semibold">{item.title}</h1>
			<p class="text-xs text-current/70 italic">{item.authors.map((author) => author.name).join(', ')}</p>
			<p class="text-sm leading-relaxed whitespace-pre-wrap">
				<RichText source={item.abstract} />
			</p>

			<Collapse iconText={{ text: { text: 'More info', class: 'text-xs font-semibold' } }} class="hidden has-[span.item]:block" props={{ hidden: true }}>
				<div class="flex grid-cols-12 flex-col rounded-lg p-2 text-xs sm:grid">
					{#snippet ColItem(label: string, text: string | undefined)}
						{#if text}
							<span class="item col-span-3 text-current/50 sm:col-span-2">{label}:</span>
							<span class="item col-span-9 mb-2 text-current/70 sm:col-span-10 sm:mb-0">{text}</span>
						{/if}
					{/snippet}

					{@render ColItem('Conference', item.conference)}
					{@render ColItem('Location', item.location)}
					{@render ColItem('Date', formatDate(item.published))}
					{@render ColItem('Tags', item.tags.map((tag) => tag.name).join(', '))}
				</div>
			</Collapse>

			<!-- Links -->
			<div class="pt-3 lg:flex lg:items-center lg:justify-between">
				<LinkList links={item.links} class="" />
			</div>
		</div>
	</div>
</BaseCard>
