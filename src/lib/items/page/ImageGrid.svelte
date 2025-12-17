<script lang="ts">
	import BaseImg from '$lib/components/images/BaseImg.svelte';
	import ClassBox from '$lib/components/ClassBox.svelte';
	import PlaceholderImage from '$lib/components/images/PlaceholderImage.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import type { ClassProp } from '$lib/utils/utils';
	import { onMount } from 'svelte';
	import type { PictureWithAlt } from '$lib/data/indexer';

	import BiggerPicture from 'bigger-picture';

	type Props = ClassProp & {
		images: PictureWithAlt[];
	};

	const { images, ...props }: Props = $props();

	let mounted = $state(false);
	onMount(() => {
		mounted = true;
	});

	$effect(() => {
		// Listen for image changes
		images;

		console.log('update');

		// initialize
		let bp = BiggerPicture({
			target: document.body
		});

		const imageLinks = document.querySelectorAll('#images a');

		// add click listener to open BiggerPicture
		for (let link of imageLinks) {
			link.addEventListener('click', openGallery);
		}

		// open BiggerPicture
		function openGallery(e: Event) {
			e.preventDefault();
			bp.open({
				items: imageLinks,
				el: e.currentTarget as HTMLElement
			});
		}
	});
</script>

{#snippet ImageButton(image: PictureWithAlt)}
	<button class="relative flex max-h-24 cursor-pointer items-center justify-center overflow-hidden rounded-md bg-white hover:bg-gray-50 focus:ring-3 focus:ring-primary/50 focus:ring-offset-4 focus:outline-hidden">
		<BaseImg src={image} alt="" class="aspect-square size-auto object-cover" />
		<span aria-hidden="true" class="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 in-aria-selected:ring-primary"></span>
	</button>
{/snippet}

{#snippet ImagePanel(image: PictureWithAlt)}
	<div hidden class="relative mb-5 overflow-hidden">
		<a href={image.img.src} data-img={image.img.src} data-alt={image.alt} data-height={image.img.h} data-width={image.img.w} data-caption={image.alt} class="flex aspect-square justify-center *:[picture]:flex">
			<BaseImg src={image} alt={image.alt} class="my-auto max-h-full w-fit max-w-full flex-1 rounded-lg object-contain" />
		</a>
		{#if image.alt}
			<div class="text-dark wrap-whitespace absolute bottom-0 bg-gray-100/90 px-4 py-2 text-center text-sm break-words italic dark:bg-gray-900/70">
				{image.alt}
			</div>
		{/if}
	</div>
{/snippet}

<ClassBox {props} class="relative w-full">
	{#key mounted}
		<Spinner class="absolute top-1 left-1 z-200 size-16" loading={!mounted} />
	{/key}
	{#key images}
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
				<!-- Image Panels -->
				<el-tab-panels id="images">
					{#each images as lg}
						{@render ImagePanel(lg)}
					{/each}
				</el-tab-panels>
			</el-tab-group>
		{:else}
			<!-- Placeholder -->
			<PlaceholderImage />
		{/if}
	{/key}
</ClassBox>
