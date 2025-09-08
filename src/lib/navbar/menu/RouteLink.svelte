<script lang="ts">
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';
	import type { Route as RouteType } from '$lib/data/routes';

	import BaseLink from '$lib/components/interactive/BaseLink.svelte';
	import Route from '$lib/navbar/menu/Route.svelte';

	const { route, children, class: className, ...restProps }: { route: RouteType; children?: Snippet; class?: ClassValue; [key: string]: any } = $props();

	// Derive if we are the current (active) route
	$inspect(page.data.route);
	$inspect(route);
	const current = $derived(page.data.route.href === route.href);
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
	<Route {route}/>
</BaseLink>
