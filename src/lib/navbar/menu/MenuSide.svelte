<script lang="ts">
	import { page } from '$app/state';

	import RouteLink from '$lib/navbar/menu/RouteLink.svelte';
	import ThemeToggle from '$lib/theme/ThemeToggle.svelte';

	const routes = $derived(page.data.SideMenu);
</script>

{#each routes as route}
	<div class="py-1">
		<RouteLink {route} />
	</div>
{/each}

<ThemeToggle />
