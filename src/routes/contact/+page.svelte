<script lang="ts">
	import banner from '$lib/assets/img/InfoLab-min.jpg?enhanced';
	import BaseCard from '$lib/components/BaseCard.svelte';
	import BaseImg from '$lib/components/BaseImg.svelte';
	import { Check, Copy, Mail, MapPin } from '@lucide/svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	let copied = $state(false);
	let copyTimeout: ReturnType<typeof setTimeout> | null = null;

	function copyEmail() {
		if (!data?.contact?.email) return;
		navigator.clipboard
			?.writeText(data.contact.email)
			.then(() => {
				copied = true;
				if (copyTimeout) clearTimeout(copyTimeout);
				copyTimeout = setTimeout(() => (copied = false), 2400);
			})
			.catch(() => {});
	}

	const addressLines = [data?.contact?.address_0, data?.contact?.address_1, data?.contact?.address_2, data?.contact?.address_3].filter(Boolean) as string[];
</script>

<section class="mx-auto max-w-5xl space-y-14 px-4 py-10 sm:px-6 lg:px-8">

	<div class="grid gap-8 sm:grid-cols-2">
		<!-- Email Card -->
		<BaseCard class="group relative flex flex-col gap-4 overflow-hidden rounded-xl border border-gray-200/60 bg-white/90 p-8 backdrop-blur dark:border-gray-700/60 dark:bg-gray-800/70">
			<div class="flex size-12 items-center justify-center rounded-lg bg-primary-50 text-primary-600 ring-1 ring-primary-200 transition group-hover:scale-105 dark:bg-primary-950 dark:text-primary-300 dark:ring-primary-800">
				<Mail class="size-6" aria-hidden="true" />
			</div>
			<h2 class="text-lg font-medium text-gray-900 dark:text-white">Email</h2>
			<p class="text-sm text-gray-600 dark:text-gray-400">General enquiries & collaboration.</p>

			{#if data?.contact?.email}
				<div class="mt-2 flex items-center gap-2">
					<a href={`mailto:${data.contact.email}`} class="font-mono text-sm font-semibold text-primary-600 underline-offset-2 hover:underline dark:text-primary-400" rel="noopener noreferrer">{data.contact.email}</a>


					<button type="button" class="inline-flex size-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring focus-visible:ring-primary-500/50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600" aria-label={copied ? 'Email copied' : 'Copy email'} onclick={copyEmail}>
						{#if copied}
							<Check class="size-4 text-green-600 dark:text-green-400" />
						{:else}
							<Copy class="size-4" />
						{/if}
					</button>
				</div>
				{#if copied}
					<p class="mt-1 text-xs font-medium text-green-600 dark:text-green-400">Copied!</p>
				{/if}
			{:else}
				<p class="mt-2 text-sm text-gray-400 italic">Email temporarily unavailable.</p>
			{/if}
		</BaseCard>

		<!-- Address Card -->
		<BaseCard class="group relative flex flex-col gap-4 overflow-hidden rounded-xl border border-gray-200/60 bg-white/90 p-8 backdrop-blur dark:border-gray-700/60 dark:bg-gray-800/70">
			<div class="flex size-12 items-center justify-center rounded-lg bg-primary-50 text-primary-600 ring-1 ring-primary-200 transition group-hover:scale-105 dark:bg-primary-950 dark:text-primary-300 dark:ring-primary-800">
				<MapPin class="size-6" aria-hidden="true" />
			</div>
			<h2 class="text-lg font-medium text-gray-900 dark:text-white">Visit us</h2>
			<p class="text-sm text-gray-600 dark:text-gray-400">You're welcome to drop by, just let us know ahead.</p>

			{#if addressLines.length > 0}
				<address class="text-sm leading-relaxed text-gray-800 not-italic dark:text-gray-300">
					{#each addressLines as line, i}
						<span itemprop="streetAddress" class="block {i === 0 ? 'font-semibold' : ''}">{line}</span>
					{/each}
				</address>
			{:else}
				<p class="mt-2 text-sm text-gray-400 italic">Address details coming soon.</p>
			{/if}

			<!-- Optional map placeholder (replace with real embed if desired) -->
			<div class="mt-4 aspect-[4/3] w-full overflow-hidden rounded-lg text-center text-xs text-gray-400 dark:text-gray-500">
				<BaseImg src={banner} alt="" class="size-full object-cover" />
			</div>
		</BaseCard>
	</div>
</section>
