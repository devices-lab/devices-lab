<script lang="ts">
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';
	import Breadcrumbs from '$lib/breadcrumbs/Breadcrumbs.svelte';
	import NavBar from '$lib/navbar/NavBar.svelte';
	import { onMount, type Snippet } from 'svelte';
	import 'tippy.js/dist/tippy.css';
	import '../app.css';
	import type { LayoutData } from './$types';

	interface Props {
		data: LayoutData;
		children: Snippet;
	}
	const { children, data }: Props = $props();

	onMount(() => {
		import('@tailwindplus/elements');
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>DevicesLab</title>
</svelte:head>

<div class="flex min-h-full flex-col">
	<NavBar />

	<div class="container mx-auto px-4 flex flex-col flex-1">
		<Breadcrumbs />

		{#if page.data.noHeader !== true && page.status === 200 && page.data.title}
			<div class="py-8 mb-8 text-center max-w-lg mx-auto overflow-hidden">
				<h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 text-wrap">{page.data.title}</h1>
				{#if page.data.subtitle}
					<p class="mx-auto mt-4 max-w-3xl text-base text-gray-500 dark:text-gray-400 text-wrap">{page.data.subtitle}</p>
				{/if}
			</div>
		{/if}

		{@render children?.()}
	</div>

	<footer class="mt-10 mb-2 py-1">
		<p class="mt-8 text-center text-sm/6 text-gray-600 md:order-1 md:mt-0 dark:text-gray-400">&copy; 2025 Lancaster University. All rights reserved.</p>
	</footer>
</div>
