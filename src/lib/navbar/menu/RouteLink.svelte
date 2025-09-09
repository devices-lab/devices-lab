<script lang="ts">
	import { page } from '$app/state';
	import BaseLink from '$lib/components/interactive/BaseLink.svelte';
	import type { Route as RouteType } from '$lib/data/routes';
	import Route from '$lib/navbar/menu/Route.svelte';

	type Props = {
		route: RouteType;
	};

	const { route }: Props = $props();
	const current = $derived(page.data.route.id === route.id && !page.error);
</script>

{#key current}
	<BaseLink link={route.id} aria-current={current ? 'page' : undefined} class="group/item flex items-center px-4 py-2 text-sm text-gray-700 hover:not-aria-[current]:text-gray-400 aria-[current]:bg-gray-200/50 dark:text-gray-300 dark:hover:not-aria-[current]:text-gray-400 dark:aria-[current]:bg-gray-600/50">
		<Route {route} />
	</BaseLink>
{/key}
