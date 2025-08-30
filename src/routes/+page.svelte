<script lang="ts">
	import BaseImg from '$lib/components/BaseImg.svelte';
	import BaseLink from '$lib/components/BaseLink.svelte';
	import banner from '$lib/assets/img/InfoLab-min.jpg?enhanced';
	import { Routes } from '$lib/data/routes';

	import OverlayContainer from '$lib/overlay/OverlayContainer.svelte';
</script>

<div class="static">
	<BaseImg src={banner} alt="" class="absolute inset-0 -z-10 size-full object-cover opacity-20" />
	<OverlayContainer imgWidth={banner.img.w} imgHeight={banner.img.h} />
</div>

<div class="flex grow flex-col items-center justify-center truncate p-5 text-center">
	<h1 class="font-ocr text-6xl font-semibold -tracking-normal text-balance text-gray-900 lg:text-8xl dark:text-white">Devices Lab</h1>
	<p class="mt-8 text-lg font-medium text-pretty text-gray-600 sm:text-xl/8 dark:text-gray-400">Learn more about our research group and passion!</p>
	<div class="mt-10 flex items-center justify-center gap-x-6">
		<BaseLink href={Routes.devices.href} class="z-11 rounded-full bg-primary-600 px-4.5 py-3.5 font-semibold text-white shadow-xs hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:bg-primary-500 dark:hover:bg-primary-400 dark:focus-visible:outline-primary-500">
			Discover our projects
			<span aria-hidden="true">→</span>
		</BaseLink>
	</div>
</div>
