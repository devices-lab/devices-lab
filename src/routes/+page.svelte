<script lang="ts">
	import banner from '$lib/assets/img/InfoLab-min.jpg?enhanced';
	import BaseImg from '$lib/components/BaseImg.svelte';
	import IconLink from '$lib/components/base/IconLink.svelte';
	import BaseLink from '$lib/components/base/BaseLink.svelte';
	import { Routes } from '$lib/data/routes';
	import OverlayContainer from '$lib/overlay/OverlayContainer.svelte';
	import { ArrowRight } from '@lucide/svelte';
	import IconTextLink from '$lib/components/base/IconTextLink.svelte';
</script>

<div class="static">
	<BaseImg src={banner} alt="" class="absolute inset-0 -z-10 size-full object-cover opacity-20" />
	<OverlayContainer imgWidth={banner.img.w} imgHeight={banner.img.h} />
</div>

<div class="z-11 flex grow flex-col items-center justify-center truncate p-5 text-center">
	<h1 class="font-ocr text-6xl font-semibold -tracking-normal text-balance text-gray-900 lg:text-8xl dark:text-white">Devices Lab</h1>
	<p class="mt-8 text-lg font-medium text-pretty text-gray-600 sm:text-xl/8 dark:text-gray-400">Learn more about our research group and passion!</p>
	<div class="mt-10 flex w-full items-center justify-center gap-x-6 sm:gap-x-10">
		<IconTextLink href={Routes.devices.id} class="rounded-lg bg-primary px-4 py-2 font-semibold shadow transition-transform duration-200 hover:scale-101 hover:bg-primary-hover" iconText={{ icon: { icon: ArrowRight }, text: { text: 'Discover our projects' }, position: "iconLast" }} />
		<IconTextLink href={Routes.about.id} class="rounded-lg bg-secondary px-4 py-2 font-semibold shadow transition-transform duration-200 hover:scale-101 hover:bg-secondary-hover" iconText={{ icon: { icon: ArrowRight }, text: { text: 'Learn more about us' }, position: "iconLast" }} />
	</div>
</div>
