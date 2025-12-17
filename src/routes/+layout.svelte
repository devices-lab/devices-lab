<script lang="ts">
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';
	import Breadcrumbs from '$lib/breadcrumbs/Breadcrumbs.svelte';
	import Navbar from '$lib/navbar/Navbar.svelte';
	import { onMount, type Snippet } from 'svelte';
	import 'tippy.js/dist/tippy.css';
	import '../app.css';
	import type { LayoutData } from './$types';
	import BaseLink from '$lib/components/base/BaseLink.svelte';
	import { Routes } from '$lib/data/routes';
	import { colorIndex } from '$lib/utils/utils';

	interface Props {
		data: LayoutData;
		children: Snippet;
	}
	const { children, data }: Props = $props();

	onMount(() => {
		import('@tailwindplus/elements');
	});

	const colorVar = $derived.by(() => {
		switch ($colorIndex) {
			case 0:
				return '--color-root: var(--color-lu-0);';
			case 1:
				return '--color-root: var(--color-lu-1);';
			case 2:
				return '--color-root: var(--color-lu-2);';
			case 3:
				return '--color-root: var(--color-lu-3);';
			case 4:
				return '--color-root: var(--color-lu-4);';
			case 5:
				return '--color-root: var(--color-lu-5);';
			default:
				return '--color-root: var(--color-lu-0);';
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>DevicesLab</title>
</svelte:head>

<div class="flex min-h-full flex-col" style={colorVar}>
	<Navbar />

	<div class="container mx-auto flex flex-1 flex-col px-2 sm:px-4">
		<Breadcrumbs />

		{#if page.data.noHeader !== true && page.status === 200 && page.data.title}
			<div class="mx-auto mb-8 max-w-lg overflow-hidden py-8 text-center">
				<h1 class="text-4xl font-bold tracking-tight text-wrap text-gray-900 dark:text-gray-100">{page.data.title}</h1>
				{#if page.data.subtitle}
					<p class="mx-auto mt-4 max-w-3xl text-base text-wrap text-gray-500 dark:text-gray-400">{page.data.subtitle}</p>
				{/if}
			</div>
		{/if}

		{@render children?.()}
	</div>

	<footer class="mt-10 mb-2 flex flex-col items-center py-1">
		<p class="mt-8 text-center text-sm/6 text-gray-600 md:mt-0 dark:text-gray-400">&copy; 2025 Lancaster University. All rights reserved.</p>
		<div class="flex gap-2">
			<BaseLink href={Routes.about.id} class="mt-4 text-sm text-gray-600 underline hover:underline md:order-2 md:mt-0 dark:text-gray-400 hover:dark:text-gray-200">About</BaseLink>
			<BaseLink href={Routes.contact.id} class="mt-4 text-sm text-gray-600 underline hover:underline md:order-3 md:mt-0 dark:text-gray-400 hover:dark:text-gray-200">Contact</BaseLink>
		</div>
	</footer>
</div>
