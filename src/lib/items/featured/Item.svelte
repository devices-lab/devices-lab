<script lang="ts">
	import BaseLink from '$lib/components/BaseLink.svelte';
	import { type ItemType, getItemPath } from '$lib/_data/item';
	import { Star } from '@lucide/svelte';

	const { item }: { item: ItemType } = $props();
</script>

<div class="group relative">
	<BaseLink href={getItemPath(item)} class="isolate z-10 flex max-w-2xl flex-col gap-x-8 gap-y-2 transition-all duration-300 hover:translate-y-1 sm:flex-row sm:items-start lg:flex-col lg:items-stretch">
		<enhanced:img src={item.cover} alt="" class="aspect-2/1 w-full rounded-lg object-contain group-hover:opacity-70 sm:aspect-video sm:h-32 lg:h-auto" />
		<h4 class="text-center text-sm/6 font-semibold text-gray-900 dark:text-gray-300">{item.name}</h4>
	</BaseLink>

	<div class="absolute top-1 left-1 motion-safe:animate-[wiggle_2s_ease-in-out_infinite] sm:top-2 sm:left-2">
		<span class="inline-flex -rotate-45 items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-400/10 dark:text-yellow-500">New!</span>
	</div>
</div>
