<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	import type { LayoutData } from './$types';
	import { onMount, type Snippet } from 'svelte';
	import { page } from '$app/state';

	import Header from '$lib/navbar/Header.svelte';
	import Breadcrumbs from '$lib/navbar/Breadcrumbs.svelte';

	interface Props {
		data: LayoutData;
		children: Snippet;
	}
	const { children, data }: Props = $props();

	onMount(() => {
		import('@tailwindplus/elements');
	});

	const hasBreadcrumbs = $derived(data.breadcrumbs.length > 0);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>DevicesLab</title>
</svelte:head>

<div class="flex min-h-full flex-col">
	<Header {data} />

	<div class="container mx-auto flex grow flex-col">
		{#if hasBreadcrumbs}
			<Breadcrumbs breadcrumbs={data.breadcrumbs} class="mt-6" />
		{/if}

		{#if !data.isHome && page.data.noHeader !== true && page.status === 200}
			<div class="mb-6 border-t-0 border-b-2 border-gray-200 py-8 text-center">
				<h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">{page.data.title}.</h1>
				<p class="mx-auto mt-4 max-w-3xl text-base text-gray-500 dark:text-gray-400">{page.data.description}</p>
			</div>
		{/if}

		{@render children?.()}
	</div>

	<footer class="mt-10 mb-2 py-1">
		<p class="mt-8 text-center text-sm/6 text-gray-600 md:order-1 md:mt-0 dark:text-gray-400">&copy; 2025 DevicesLab, Inc. All rights reserved.</p>
	</footer>
</div>
