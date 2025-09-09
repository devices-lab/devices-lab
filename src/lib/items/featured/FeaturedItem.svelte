<script lang="ts">
	import BaseImg from '$lib/components/BaseImg.svelte';
	import BaseLink from '$lib/components/interactive/BaseLink.svelte';
	import FeaturedLabel from '$lib/items/featured/FeaturedLabel.svelte';
	import { type _ItemType } from '$lib/data/item';
	import type { Entry } from '$lib/data/indexer';

	type Props = {
		item: Entry;
	}
	const { item }: Props = $props();
</script>

<div class="group relative">
	<BaseLink link={item.path} class="isolate z-10 flex max-w-2xl flex-col gap-x-8 gap-y-2 transition-all duration-300 hover:translate-y-1 sm:flex-row sm:items-start lg:flex-col lg:items-stretch">
		<BaseImg src={item.thumb} alt="" class="aspect-2/1 w-full rounded-lg object-contain group-hover:opacity-70 sm:aspect-video sm:h-32 lg:h-auto" />
		<h4 class="text-center text-sm/6 font-semibold text-gray-900 dark:text-gray-300">{item.item.name}</h4>
	</BaseLink>

	<FeaturedLabel class="absolute top-1 left-1 sm:top-2 sm:left-2" />
</div>
