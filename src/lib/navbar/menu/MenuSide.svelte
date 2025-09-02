<script lang="ts">
	import { page } from '$app/state';

	import RouteLink from '$lib/navbar/menu/RouteLink.svelte';
	import ThemeToggle from '$lib/theme/ThemeToggle.svelte';

	const routes = $derived(page.data.SideMenu);
</script>

{#each routes as route}
	<RouteLink {route} class="py-3"/>
{/each}

<ThemeToggle />
