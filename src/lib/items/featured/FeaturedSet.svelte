<script lang="ts">
	import { type ItemType } from '$lib/data/item';

	import FeaturedItem from '$lib/items/featured/FeaturedItem.svelte';
	import BaseLink from '$lib/components/BaseLink.svelte';

	import { ChevronRight } from '@lucide/svelte';
	import type { Route } from '$lib/data/routes';

	const { id, route, items = [] }: { id: string; route: Route; items?: ItemType[] } = $props();
</script>

<!-- Popover content -->
<el-popover {id} anchor="bottom" popover="auto" class="w-full overflow-visible bg-white text-sm text-gray-500 transition transition-discrete [--anchor-gap:1px] backdrop:bg-transparent open:block data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in dark:bg-gray-800">
	<!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow -->
	<div aria-hidden="true" class="absolute inset-0 top-1/2 bg-white shadow-lg ring-1 ring-gray-900/5 dark:bg-gray-900 dark:shadow-none dark:ring-white/10"></div>
	<div class="relative bg-white p-8 dark:bg-gray-900">
		<div class="mx-auto flex max-w-3xl justify-start sm:px-6 lg:max-w-7xl lg:px-8">
			<div class="grid grid-cols-1 gap-10 sm:gap-8 lg:grid-cols-4">
				{#each items as item}
					<FeaturedItem {item} />
				{/each}
			</div>

			<BaseLink
				href={route.href}
				class="group
				flex
				flex-none
				items-center
				gap-x-2.5
				self-end
				rounded-full
				bg-indigo-200
				px-4
				py-2
				font-semibold
				text-indigo-600
				transition-all
				duration-300
				hover:bg-indigo-600
				hover:text-white
				focus-visible:outline-2
				focus-visible:outline-offset-2
				focus-visible:outline-indigo-600
				dark:text-indigo-400
				dark:hover:bg-indigo-400
				dark:hover:text-indigo-900
				dark:focus-visible:outline-indigo-500"
			>
				See all items
				<ChevronRight class="size-7 transition-all duration-300 group-hover:translate-x-1" />
			</BaseLink>
		</div>
	</div>
</el-popover>
