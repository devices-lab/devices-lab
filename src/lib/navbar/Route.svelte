<script lang="ts">
	import type { Route } from '$lib/_data/routes';
	import BaseLink from '$lib/components/BaseLink.svelte';
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';


	const { route, current = false, children, class: className, ...restProps }: { route: Route; current?: boolean; children?: Snippet; class?: ClassValue; [key: string]: any } = $props();
</script>

<BaseLink
	href={route.href}
	aria-current={current ? 'page' : undefined}
	class={`
		group/item
		flex
		items-center
		px-4
		py-2
		text-sm
		text-gray-700
		hover:not-aria-[current]:text-gray-400
		aria-[current]:bg-gray-200/50
		dark:text-gray-300
		dark:hover:not-aria-[current]:text-gray-400
		dark:aria-[current]:bg-gray-600/50
		${className}
		`}
	{...restProps}
>
	{#if children}
		<!-- Content is provided -->
		{@render children()}
	{:else}
		<!-- Fallback content -->
		{#if route.icon}
			<route.icon class="me-3 size-5 opacity-50" aria-hidden="true" />
		{/if}
		{route.title}
	{/if}
</BaseLink>
