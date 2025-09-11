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
	<button class="relative flex max-h-24 cursor-pointer items-center justify-center overflow-hidden rounded-md bg-white text-sm font-medium text-gray-900 uppercase hover:bg-gray-50 focus:ring-3 focus:ring-primary-500/50 focus:ring-offset-4 focus:outline-hidden">
		<BaseImg src={image} alt="" class="aspect-square size-auto object-cover" />
		<span aria-hidden="true" class="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 in-aria-selected:ring-primary-500"></span>
	</button>
{/snippet}

{#snippet ImagePanel(image: Picture)}
	<div hidden class="m-auto flex aspect-square h-full w-full justify-center *:[picture]:flex">
		<BaseImg src={image} alt="" class="my-auto max-h-full w-fit max-w-full flex-1 rounded-lg object-contain" />
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
