<script lang="ts">
	import Breadcrumb from '$lib/navbar/Breadcrumb.svelte';
	import type { ClassValue } from 'svelte/elements';
	import { Routes } from '$lib/_data/routes';

	export interface BreadcrumbType {
		title: string;
		href: string;
	}

	interface Props {
		breadcrumbs: BreadcrumbType[];
		class?: ClassValue;
		[key: string]: any;
	}
	const { breadcrumbs, class: className = '', ...restProps }: Props = $props();
</script>

<nav aria-label="Breadcrumb">
	<ol role="list" class="flex flex-wrap items-center space-x-0 px-4 py-2 sm:space-x-3 {className}" {...restProps}>
		<Breadcrumb href={Routes.home.href}>
			<svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5 shrink-0">
				<path d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clip-rule="evenodd" fill-rule="evenodd" />
			</svg>
			<span class="sr-only">Home</span>
		</Breadcrumb>

		{#each breadcrumbs as crumb, i}
			{@const isLast = i === breadcrumbs.length - 1}
			<!-- Divider -->
			<li class="flex items-center">
				<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="size-5 shrink-0 text-gray-300 dark:text-gray-600">
					<path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
				</svg>
			</li>
			<!-- Link -->
			<Breadcrumb href={crumb.href} {isLast}>
				{crumb.title}
			</Breadcrumb>
		{/each}
	</ol>
</nav>
