<script lang="ts">
	import type { ItemType } from '$lib/items/item';
	import { Star } from '@lucide/svelte';

	const { item }: { item: ItemType } = $props();
</script>

<div class="relative">
	<a href={item.href} class="group isolate flex max-w-2xl flex-col gap-x-8 gap-y-2 transition-all duration-300 hover:translate-y-1 sm:flex-row sm:items-start lg:flex-col lg:items-stretch">
		<div class="relative flex-none">
			<enhanced:img src={item.cover} alt="" class="aspect-2/1 w-full rounded-lg object-contain group-hover:opacity-70 sm:aspect-video sm:h-32 lg:h-auto" />
		</div>

		<h4 class="text-center text-sm/6 font-semibold text-gray-900 dark:text-gray-300">
			{item.name}
		</h4>
	</a>
	<Star class="absolute inset-1 size-8 motion-safe:animate-[wiggle_2s_ease-in-out_infinite] fill-current text-amber-300 lg:size-10 xl:inset-2" />
</div>
