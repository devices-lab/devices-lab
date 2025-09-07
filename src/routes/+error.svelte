<script lang="ts">
	import BaseLink from '$lib/components/interactive/BaseLink.svelte';
	import { page } from '$app/state';
	import { Routes } from '$lib/data/routes';
</script>

<main class="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
	<div class="text-center">
		<p class="text-base font-semibold text-primary-600 dark:text-primary-400">{page.status}</p>
		<h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl dark:text-white">{page.error?.message}</h1>
		<p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">Sorry, we couldn’t find the page you’re looking for.</p>
		<div class="mt-10 flex items-center justify-center gap-x-6">
			<BaseLink href={Routes.home.href} class="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:bg-primary-500 dark:hover:bg-primary-400 dark:focus-visible:outline-primary-500">Go back home</BaseLink>
		</div>
	</div>
</main>
