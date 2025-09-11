<script lang="ts">
	import { page } from '$app/state';
	import IconLink from '$lib/components/interactive/IconLink.svelte';
	import { findFeaturedEntries } from '$lib/data/indexer';
	import type { Route } from '$lib/data/routes';
	import FeaturedItem from '$lib/items/featured/FeaturedItem.svelte';
	import RouteLink from '$lib/navbar/menu/RouteLink.svelte';
	import RoutePopover from '$lib/navbar/menu/RoutePopover.svelte';
	import type { DefProps } from '$lib/utils/utils';

	type Props = DefProps & {
		showFeaturedItems?: boolean;
	};

	const { showFeaturedItems = false, ...props }: Props = $props();
	const routes: Route[] = $derived(page.data.MainMenu);
</script>

<el-popover-group class={props.class}>
	{#each routes as route}
		{@const featuredItems = findFeaturedEntries(route.id)}
		{#if showFeaturedItems && featuredItems.length > 0}
			<RoutePopover {route} items={featuredItems}>
				<div class="grid grid-cols-1 gap-10 sm:gap-8 lg:grid-cols-4">
					{#each featuredItems as item}
						<FeaturedItem {item} />
					{/each}
				</div>
			</RoutePopover>
		{:else}
			<RouteLink component={IconLink} {route} />
		{/if}
	{/each}
</el-popover-group>
