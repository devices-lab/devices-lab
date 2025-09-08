<script lang="ts">
	import { page } from '$app/state';

	import RouteLink from '$lib/navbar/menu/RouteLink.svelte';
	import RoutePopover from '$lib/navbar/menu/RoutePopover.svelte';
	import FeaturedSet from '$lib/items/featured/FeaturedSet.svelte';
	import type { ClassValue } from 'svelte/elements';

	const { showFeaturedItems = false, class: className = '' }: { showFeaturedItems?: boolean; class?: ClassValue } = $props();
	const featuredItems = $derived(page.data.featuredItems);
	const routes = $derived(page.data.MainMenu);
</script>

{#each routes as route}
	{#if showFeaturedItems && featuredItems[route.id] && featuredItems[route.id].length > 0}
		<RoutePopover {route} class={className}>
			{#snippet popover(id: string)}
				<FeaturedSet {id} {route} items={featuredItems[route.id]} />
			{/snippet}
		</RoutePopover>
	{:else}
		<RouteLink {route} />
	{/if}
{/each}
