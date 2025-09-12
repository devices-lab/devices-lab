<script lang="ts">
	import banner from '$lib/assets/img/InfoLab-min.jpg?enhanced';
	import IconTextLink from '$lib/components/base/IconTextLink.svelte';
	import BaseImg from '$lib/components/images/BaseImg.svelte';
	import { Routes } from '$lib/data/routes';
	import OverlayContainer from '$lib/overlay/OverlayContainer.svelte';
	import { cn } from '$lib/utils/cn';
	import { ArrowRight } from '@lucide/svelte';
</script>

<div class="static">
	<BaseImg src={banner} alt="" class="absolute inset-0 -z-10 size-full object-cover opacity-20" />
	<OverlayContainer imgWidth={banner.img.w} imgHeight={banner.img.h} />
</div>

<div class="z-11 flex grow flex-col items-center justify-center truncate p-5 text-center">
	<h1 class="font-ocr text-6xl font-semibold -tracking-normal text-balance text-gray-900 lg:text-8xl dark:text-white">Devices Lab</h1>
	<p class="mt-8 text-lg font-medium text-pretty text-gray-600 sm:text-xl/8 dark:text-gray-400">Learn more about our research group and passion!</p>
	<div class="mt-10 flex w-full items-center justify-center gap-x-6 sm:gap-x-10">
		<IconTextLink
			href={Routes.devices.id}
			class="overflow-hidden rounded-full bg-white font-semibold shadow transition duration-200 hover:scale-101 hover:opacity-100"
			iconText={{
				icon: { icon: ArrowRight },
				text: { text: 'Discover our projects' },
				position: 'iconLast',
				class: cn('px-4 py-2 bg-focus')
			}}
		/>
		<IconTextLink
			href={Routes.about.id}
			class="overflow-hidden rounded-full bg-black font-semibold shadow transition duration-200 hover:scale-101 hover:opacity-100"
			iconText={{
				icon: { icon: ArrowRight },
				text: { text: 'Learn more about us' },
				position: 'iconLast',
				class: cn('px-4 py-2 bg-focus2')
			}}
		/>
	</div>
</div>
