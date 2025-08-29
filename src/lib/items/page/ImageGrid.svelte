<script lang="ts">
	import type { Picture } from 'vite-imagetools';
	import type { ItemImage } from '$lib/_data/item';

	const { images }: { images: ItemImage[] } = $props();
</script>

{#snippet ImageButton(image: Picture)}
	<button class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium text-gray-900 uppercase hover:bg-gray-50 focus:ring-3 focus:ring-indigo-500/50 focus:ring-offset-4 focus:outline-hidden">
		<span class="sr-only">Angled view</span>
		<span class="absolute inset-0 overflow-hidden rounded-md">
			<enhanced:img src={image} alt="" class="size-full object-cover" />
		</span>
		<span aria-hidden="true" class="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 in-aria-selected:ring-indigo-500"></span>
	</button>
{/snippet}

{#snippet ImagePanel(image: Picture)}
	<enhanced:img src={image} alt="" class="aspect-square w-full object-contain sm:rounded-lg" />
{/snippet}

{#if images.length > 0}
	<el-tab-group class="flex flex-col-reverse">
		<!-- Image selector -->
		<div class="mx-auto mt-6 block w-full max-w-2xl lg:max-w-none">
			<el-tab-list class="grid grid-cols-3 gap-6 sm:grid-cols-4">
				{#each images as { sm }}
					{@render ImageButton(sm)}
				{/each}
			</el-tab-list>
		</div>
		<!-- Image Panel -->
		<el-tab-panels>
			{#each images as { lg }}
				{@render ImagePanel(lg)}
			{/each}
		</el-tab-panels>
	</el-tab-group>
{:else}
	<!-- Placeholder -->
	<div class="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
		<svg class="mx-auto h-full w-full text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64">
			<rect width="100%" height="100%" fill="currentColor" />
			<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="10" fill="#ffffff">No Image</text>
		</svg>
	</div>
{/if}
