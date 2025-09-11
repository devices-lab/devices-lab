<script lang="ts">
	import banner from '$lib/assets/img/InfoLab-min.jpg?enhanced';
	import BaseImg from '$lib/components/BaseImg.svelte';
	import IconLink from '$lib/components/interactive/IconLink.svelte';
	import BaseLink from '$lib/components/interactive/BaseLink.svelte';
	import { Routes } from '$lib/data/routes';
	import OverlayContainer from '$lib/overlay/OverlayContainer.svelte';
	import { ArrowRight } from '@lucide/svelte';

</script>

<div class="static">
	<BaseImg src={banner} alt="" class="absolute inset-0 -z-10 size-full object-cover opacity-20" />
	<OverlayContainer imgWidth={banner.img.w} imgHeight={banner.img.h} />
</div>

<div class="flex grow flex-col items-center justify-center truncate p-5 text-center z-11">
	<h1 class="font-ocr text-6xl font-semibold -tracking-normal text-balance text-gray-900 lg:text-8xl dark:text-white">Devices Lab</h1>
	<p class="mt-8 text-lg font-medium text-pretty text-gray-600 sm:text-xl/8 dark:text-gray-400">Learn more about our research group and passion!</p>
	<div class="mt-10 flex items-center justify-center gap-x-6 sm:gap-x-10 w-full">
		<IconLink link={Routes.devices.id} class="bg-primary px-4 py-2 rounded-lg font-semibold shadow hover:bg-primary-hover hover:scale-101 transition-transform duration-200" icon={{icon: ArrowRight}} text={{text: 'Discover our projects', class: ''}} position='iconLast'/>
		<IconLink link={Routes.about.id} class="bg-secondary px-4 py-2 rounded-lg font-semibold shadow hover:bg-secondary-hover hover:scale-101 transition-transform duration-200" icon={{icon: ArrowRight}} text={{text: 'Learn more about us', class: ''}} position='iconLast'/>
	</div>
</div>