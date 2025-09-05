<!-- ResearchCard.svelte -->
<script lang="ts">
	type Badge = { label: string };
	export let badges: Badge[] = [];
	export let mediaSrc = '';
	export let title = 'LogicGlue';
	export let kicker = 'Hardware-Independent Embedded Programming Through Platform-Independent Drivers';
	export let authors = 'Mannu Lambrichts, Raf Ramakers, Steve Hodges';
	export let abstract = '';
	export let tags: string[] = [];
	export let venue = 'EICS 2025';
	export let location = 'Trier, Germany';
	export let date = '2025-06-15';
	export let doiHref = '#';
	export let videoHref = '#';
</script>

<article class="rounded-2xl border border-zinc-200/80 bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.04)] dark:border-zinc-800 dark:bg-zinc-900">
	<!-- badges -->
	{#if badges.length}
		<div class="flex flex-wrap gap-2 p-4 sm:p-5">
			{#each badges as b}
				<span class="inline-flex items-center gap-2 rounded-full border border-yellow-300 bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-800 shadow-[inset_0_1px_0_rgba(255,255,255,.7)] dark:border-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-200">
					<span class="inline-grid h-5 w-5 place-items-center rounded-full bg-yellow-200 text-yellow-900">🏅</span>
					{b.label}
				</span>
			{/each}
		</div>
	{/if}

	<!-- main grid -->
	<div class="grid gap-6 p-4 sm:p-6 lg:grid-cols-[360px,1fr,220px] lg:gap-8">
		<!-- media -->
		<div>
			<div class="aspect-[4/3] overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
				<img class="h-full w-full object-cover" src={mediaSrc} alt="Preview" />
			</div>
		</div>

		<!-- content -->
		<div class="space-y-3">
			<h2 class="text-2xl font-semibold tracking-tight text-sky-700 dark:text-sky-400">
				{title}
			</h2>

			<p class="text-xl font-medium text-zinc-900 dark:text-zinc-100">
				{kicker}
			</p>

			<p class="text-zinc-600 italic dark:text-zinc-400">{authors}</p>

			<p class="leading-relaxed text-zinc-800 dark:text-zinc-200">
				{abstract}
			</p>

			{#if tags.length}
				<ul class="flex flex-wrap gap-2 pt-1">
					{#each tags as t}
						<li class="rounded-lg border border-zinc-200 px-2.5 py-1 text-xs text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
							{t}
						</li>
					{/each}
				</ul>
			{/if}

			<!-- actions -->
			<div class="flex flex-wrap gap-3 pt-2">
				<a href={doiHref} class="inline-flex items-center gap-2 rounded-lg border border-sky-200 bg-white px-3 py-2 text-sm text-sky-700 hover:bg-sky-50 active:bg-sky-100 dark:border-sky-900/60 dark:bg-zinc-900 dark:text-sky-300 dark:hover:bg-zinc-800">
					<svg viewBox="0 0 24 24" class="h-4 w-4" fill="none"><path d="M12 3v18M3 12h18" stroke="currentColor" stroke-width="2" /></svg>
					DOI
				</a>
				<a href={videoHref} class="inline-flex items-center gap-2 rounded-lg border border-sky-200 bg-white px-3 py-2 text-sm text-sky-700 hover:bg-sky-50 active:bg-sky-100 dark:border-sky-900/60 dark:bg-zinc-900 dark:text-sky-300 dark:hover:bg-zinc-800">
					<svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor"><path d="M8 6l10 6-10 6V6z" /></svg>
					Video
				</a>
			</div>
		</div>

		<!-- meta -->
		<aside class="h-fit lg:sticky lg:top-6">
			<div class="rounded-xl border border-zinc-200 bg-zinc-50/60 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900/60">
				<div class="pb-3">
					<p class="text-xs tracking-wide text-zinc-500 uppercase dark:text-zinc-400">Venue</p>
					<p class="font-medium text-zinc-900 dark:text-zinc-100">{venue}</p>
				</div>
				<div class="border-t border-zinc-200 py-3 dark:border-zinc-800">
					<p class="text-xs tracking-wide text-zinc-500 uppercase dark:text-zinc-400">Location</p>
					<p class="font-medium text-zinc-900 dark:text-zinc-100">{location}</p>
				</div>
				<div class="border-t border-zinc-200 pt-3 dark:border-zinc-800">
					<p class="text-xs tracking-wide text-zinc-500 uppercase dark:text-zinc-400">Date</p>
					<p class="font-medium text-zinc-900 dark:text-zinc-100">{date}</p>
				</div>
			</div>
		</aside>
	</div>
</article>
