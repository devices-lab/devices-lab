<script lang="ts">
	import { page } from '$app/state';
	import { findFeaturedEntries } from '$lib/data/indexer';
	import type { Route } from '$lib/data/routes';
	import FeaturedList from '$lib/items/featured/FeaturedList.svelte';
	import RouteLink from '$lib/navbar/menu/RouteLink.svelte';
	import RoutePopover from '$lib/navbar/menu/RoutePopover.svelte';
	import type { DefProps } from '$lib/utils/utils';

	type Props = DefProps & {
		showFeaturedItems?: boolean;
	};

	const { showFeaturedItems = false, ...props }: Props = $props();
	const routes: Route[] = $derived(page.data.MainMenu);
</script>

{#each routes as route}
	{@const featuredItems = findFeaturedEntries(route.id)}
	{#if showFeaturedItems && featuredItems.length > 0}
		<RoutePopover {route} {...props}>
			{#snippet popover(id: string)}
				<FeaturedList {id} {route} items={featuredItems} />
			{/snippet}
		</RoutePopover>
	{:else}
		<RouteLink {route} {...props} />
	{/if}
{/each}
