<script lang="ts">
	import BaseImg from '$lib/components/BaseImg.svelte';
	import ClassBox from '$lib/components/ClassBox.svelte';
	import PlaceholderImage from '$lib/components/PlaceholderImage.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import type { DefProps } from '$lib/utils/utils';
	import { onMount } from 'svelte';
	import type { Picture } from 'vite-imagetools';

	type Props = DefProps & {
		images: Picture[];
	};

	const { images, ...props }: Props = $props();

	let mounted = $state(false);
	onMount(() => {
		mounted = true;
	});
</script>

{#snippet ImageButton(image: Picture)}
	<button class="max-h-24 cursor-pointer relative flex h-24 items-center justify-center rounded-md bg-white text-sm font-medium text-gray-900 uppercase hover:bg-gray-50 focus:ring-3 focus:ring-primary-500/50 focus:ring-offset-4 focus:outline-hidden">
		<span class="sr-only">Angled view</span>
		<span class="absolute inset-0 overflow-hidden rounded-md">
			<BaseImg src={image} alt="" class="size-full object-cover" />
		</span>
		<span aria-hidden="true" class="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 in-aria-selected:ring-primary-500"></span>
	</button>
{/snippet}

{#snippet ImagePanel(image: Picture)}
	<div hidden>
		<BaseImg src={image} alt="" class="my-5 w-full object-contain sm:rounded-lg lg:aspect-square" />
	</div>
{/snippet}

<ClassBox {props} class="relative w-full">
	{#key mounted}
		<Spinner class="absolute top-1 left-1 size-16" loading={!mounted} />
	{/key}
	{#if images.length > 0}
		<el-tab-group class="flex flex-col-reverse">
			<!-- Image selector -->
			<div class="mx-auto mt-6 block w-full max-w-2xl lg:max-w-none">
				<el-tab-list class="grid grid-cols-3 gap-6 sm:grid-cols-4">
					{#each images as sm}
						{@render ImageButton(sm)}
					{/each}
				</el-tab-list>
			</div>
			<!-- Image Panel -->
			<el-tab-panels>
				{#each images as lg}
					{@render ImagePanel(lg)}
				{/each}
			</el-tab-panels>
		</el-tab-group>
	{:else}
		<!-- Placeholder -->
		<PlaceholderImage />
	{/if}
</ClassBox>
