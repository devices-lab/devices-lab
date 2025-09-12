<script lang="ts">
	import { page } from '$app/state';
	import IconLink from '$lib/components/base/IconLink.svelte';
	import type { Route } from '$lib/data/routes';
	import RouteLink from '$lib/navbar/menu/RouteLink.svelte';
	import ThemeToggle from '$lib/theme/ThemeToggle.svelte';

	const routes: Route[] = $derived(page.data.SideMenu);
</script>

{#each routes as route}
	<RouteLink {route} link={{ href: route.id, class: 'hover:bg-gray-100 dark:hover:bg-gray-800' }} />
{/each}

<ThemeToggle />
