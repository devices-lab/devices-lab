<script lang="ts">
	import { formatDate, type ResearchItem } from '$lib/data/research';

	import BaseCard from '$lib/components/BaseCard.svelte';
	import BaseImg from '$lib/components/BaseImg.svelte';
	import Text from '$lib/components/Text.svelte';
	import AwardList from '$lib/research/AwardList.svelte';
	import LinkList from '$lib/research/LinkList.svelte';

	const { item }: { item: ResearchItem } = $props();
</script>

<BaseCard class="rounded-3xl!">
	<div class="relative flex flex-col content-stretch items-stretch justify-items-stretch gap-x-8 p-1 md:p-4 lg:flex-row">
		{#if item.picture}
			<div class="mb-10 flex flex-1 flex-col md:mb-0">
				<BaseImg src={item.picture} alt="" class="mx-auto w-full max-w-100 rounded-lg border border-gray-300 dark:border-gray-700" />
			</div>
		{/if}

		<div class="flex flex-2 flex-col {item.picture ? '' : 'ps-4'}">
			<Text class="font-semibold tracking-wide text-primary-500 dark:text-primary-500">{item.name}</Text>
			<Text class="font-semibold text-gray-600 dark:text-gray-300">{item.title}</Text>
			<Text class="text-sm text-gray-600 italic dark:text-gray-400">{item.authors.map((author) => author.name).join(', ')}</Text>
			<Text class="text-md my-3 whitespace-pre-line text-gray-600 dark:text-gray-300">{@html item.abstract}</Text>
			{#if item.tags.length}
				<Text class="text-sm text-gray-400 italic dark:text-gray-500">Tags: {item.tags.map((tag) => tag.name).join(', ')}</Text>
			{/if}
		</div>

		<div class="order-first mb-2 flex flex-col items-end justify-end lg:order-last lg:mb-0 lg:justify-start">
			<Text class="text-sm/6 font-semibold text-nowrap text-gray-600 dark:text-gray-300">{item.conference}</Text>
			<Text class="text-sm/6 text-nowrap text-gray-600 dark:text-gray-400">{item.location}</Text>
			<Text class="text-xs/6 text-gray-400 dark:text-gray-400 ">{formatDate(item.published)}</Text>
		</div>
	</div>
	<AwardList awards={item.awards} class="absolute top-0 -translate-y-1/2" />
	<LinkList links={item.links} class="mt-4 " />
</BaseCard>

<BaseCard class="rounded-3xl! mt-6">
	<div class="relative flex flex-col content-stretch items-stretch justify-items-stretch gap-x-8 p-1 md:p-4 lg:flex-row">
		<div class="mb-3 flex flex-1 flex-col md:mb-0">
			
			<div class="flex flex-col items-start">
				<Text class="text-sm/6 font-semibold text-nowrap text-gray-600 dark:text-gray-300">{item.conference}</Text>
				<Text class="text-sm/6 text-nowrap text-gray-600 dark:text-gray-400">{item.location}</Text>
				<Text class="text-xs/6 text-gray-400 dark:text-gray-400 ">{formatDate(item.published)}</Text>
			</div>
			{#if item.picture}
				<BaseImg src={item.picture} alt="" class="mx-auto mb-5 w-full max-w-100 rounded-lg border border-gray-300 dark:border-gray-700" />
			{/if}
		</div>

		<div class="flex flex-2 flex-col {item.picture ? '' : 'ps-4'}">
			<Text class="font-semibold tracking-wide text-primary-500 dark:text-primary-500">{item.name}</Text>
			<Text class="font-semibold text-gray-600 dark:text-gray-300">{item.title}</Text>
			<Text class="text-sm text-gray-600 italic dark:text-gray-400">{item.authors.map((author) => author.name).join(', ')}</Text>
			<Text class="text-md my-3 whitespace-pre-line text-gray-600 dark:text-gray-300">{@html item.abstract}</Text>
			{#if item.tags.length}
				<Text class="text-sm text-gray-400 italic dark:text-gray-500">Tags: {item.tags.map((tag) => tag.name).join(', ')}</Text>
			{/if}
		</div>
	</div>
	<AwardList awards={item.awards} class="absolute top-0 -translate-y-1/2" />
	<LinkList links={item.links} class="mt-4 " />
</BaseCard>

<article class="group grid grid-cols-1 gap-4 rounded-xl border p-4 sm:grid-cols-[120px,1fr,auto] sm:gap-6 hover:bg-zinc-50 dark:hover:bg-zinc-900/40">
  <img src="/your-screenshot.png" alt="Preview" class="h-28 w-full rounded-lg object-cover sm:w-32" />
  <div>
    <h3 class="text-lg font-semibold group-hover:underline decoration-2 underline-offset-4">LogicGlue</h3>
    <p class="text-sm text-zinc-600 dark:text-zinc-400">Mannu Lambrichts, Raf Ramakers, Steve Hodges</p>
    <p class="mt-2 line-clamp-2 text-sm text-zinc-800 dark:text-zinc-200">
      Platform-independent drivers that decouple application logic from hardware specifics…
    </p>
    <div class="mt-2 flex flex-wrap gap-2">
      <span class="rounded-md border px-2 py-0.5 text-xs">EICS 2025</span>
      <span class="rounded-md border px-2 py-0.5 text-xs">Trier, Germany</span>
      <span class="rounded-md border px-2 py-0.5 text-xs">2025-06-15</span>
    </div>
  </div>
  <div class="flex items-start gap-2 sm:flex-col sm:items-end">
    <a class="rounded-lg border px-3 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800" href="#">DOI</a>
    <a class="rounded-lg border px-3 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800" href="#">Video</a>
  </div>
</article>

<article class="relative overflow-hidden rounded-2xl border bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md transition dark:bg-zinc-900/60 dark:border-zinc-800">
  <!-- Top badges -->
  <div class="flex flex-wrap gap-2 p-4 sm:p-5">
    <span class="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium bg-white/70 dark:bg-zinc-900/70">
      🏅 Test Award
    </span>
    <span class="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium bg-white/70 dark:bg-zinc-900/70">
      🏅 Test
    </span>
    <span class="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium bg-white/70 dark:bg-zinc-900/70">
      🏅 Test Award fas saf a dfasds
    </span>
  </div>

  <!-- Main grid -->
  <div class="grid gap-6 p-4 sm:p-6 lg:grid-cols-[360px,1fr,220px] lg:gap-8">
    <!-- Media -->
    <div class="order-1">
      <div class="aspect-[4/3] overflow-hidden rounded-xl border bg-white shadow-sm dark:bg-zinc-900">
        <img class="h-full w-full object-cover" src="/your-screenshot.png" alt="LogicGlue demo UI" />
      </div>
    </div>

    <!-- Content -->
    <div class="order-2 space-y-3">
      <a href="#" class="group inline-flex items-baseline gap-2">
        <h2 class="text-2xl font-semibold tracking-tight group-hover:underline decoration-2 underline-offset-4">
          LogicGlue
        </h2>
        <span class="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-900/40">
          Platform-Independent Drivers
        </span>
      </a>

      <p class="text-sm text-zinc-600 dark:text-zinc-400">
        Mannu Lambrichts, Raf Ramakers, Steve Hodges
      </p>

      <p class="text-zinc-800 dark:text-zinc-200 leading-relaxed">
        LogicGlue is a platform-independent driver system that decouples application logic from hardware specifics, enabling embedded programs to run across different microcontrollers without modification. It preserves native component features and protocols, simplifying prototyping while maintaining flexibility in hardware choice.
      </p>

      <!-- Tags -->
      <ul class="flex flex-wrap gap-2 pt-1">
        <li class="rounded-lg border px-2 py-1 text-xs text-zinc-700 dark:text-zinc-300">example</li>
        <li class="rounded-lg border px-2 py-1 text-xs text-zinc-700 dark:text-zinc-300">research</li>
      </ul>

      <!-- Actions -->
      <div class="flex flex-wrap gap-3 pt-2">
        <a href="#" class="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800">
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none"><path d="M12 3v18m9-9H3" stroke="currentColor" stroke-width="2"/></svg>
          DOI
        </a>
        <a href="#" class="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800">
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none"><path d="M15 10l4.553 2.276a1 1 0 010 1.788L15 16.34V10zM5 6h6v12H5z" stroke="currentColor" stroke-width="2" /></svg>
          Video
        </a>
      </div>
    </div>

    <!-- Meta sidebar -->
    <aside class="order-3 lg:sticky lg:top-6 h-fit">
      <div class="divide-y rounded-xl border bg-white/70 p-4 text-sm shadow-sm dark:bg-zinc-900/70">
        <div class="pb-3">
          <p class="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Venue</p>
          <p class="font-medium">EICS 2025</p>
        </div>
        <div class="py-3">
          <p class="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Location</p>
          <p class="font-medium">Trier, Germany</p>
        </div>
        <div class="pt-3">
          <p class="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Date</p>
          <p class="font-medium">2025-06-15</p>
        </div>
      </div>
    </aside>
  </div>
</article>


<!--
<BaseCard class="mt-10 rounded-3xl!">
	<div class="relative flex flex-col content-stretch items-stretch justify-items-stretch gap-x-8 p-4">
		<div class="flex w-full flex-1 items-start justify-between">
			<div>
				<Text class="text-md font-semibold tracking-wide text-primary-500 dark:text-primary-500">{item.name}</Text>
				<Text class="text-md font-semibold text-gray-600 dark:text-gray-300">{item.title}</Text>
				<Text class="text-sm text-gray-600 italic dark:text-gray-400">{item.authors.map((author) => author.name).join(', ')}</Text>
			</div>
			<div class="flex flex-col items-end justify-end">
				<Text class="text-sm font-semibold text-nowrap text-gray-600 dark:text-gray-300">{item.conference}</Text>
				<Text class="text-sm text-nowrap text-gray-600 dark:text-gray-400">{item.location}</Text>
				<Text class="text-xs/6 text-gray-400 dark:text-gray-400 ">{formatDate(item.published)}</Text>
			</div>
		</div>
		<div class="flex w-full flex-1 items-start justify-between pt-5 gap-x-8">
			{#if item.picture}
				<div class="mb-10 md:mb-0 flex flex-1 flex-col">
					<BaseImg src={item.picture} alt="" class="mx-auto w-full max-w-100 rounded-lg border border-gray-300 dark:border-gray-700" />
				</div>
			{/if}

			<div class="flex flex-2 flex-col">
				<Text class="text-md whitespace-pre-line text-gray-600 dark:text-gray-300">{@html item.abstract}</Text>
				{#if item.tags.length}
					<Text class="text-sm text-gray-400 italic dark:text-gray-500 mt-3">Tags: {item.tags.map((tag) => tag.name).join(', ')}</Text>
				{/if}
			</div>
		</div>

		
	</div>
	<AwardList awards={item.awards} class="absolute top-0 -translate-y-1/2" />
	<LinkList links={item.links} class="" />
</BaseCard>
-->
