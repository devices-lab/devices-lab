<script lang="ts">
	import banner from '$lib/assets/InfoLab.jpg?enhanced';
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

<div class="z-11 my-auto items-center justify-center truncate text-center">
	<h1 class="font-ocr text-5xl font-semibold -tracking-normal text-balance text-gray-900 sm:text-6xl lg:text-8xl dark:text-white">Devices Lab</h1>
	<p class="text-md dm:text-lg mt-8 font-medium text-pretty text-gray-600 sm:text-xl/8 dark:text-gray-400">Learn more about our research group and passion!</p>
	<div class="mt-10 flex w-full justify-center gap-x-2 sm:gap-x-10">
		<IconTextLink
			href={Routes.devices.id}
			class="flex overflow-hidden rounded-xl bg-white text-center text-xs font-semibold text-wrap shadow transition duration-200 hover:scale-101 hover:opacity-100 sm:rounded-full sm:text-center sm:text-sm md:text-base"
			iconText={{
				icon: { icon: ArrowRight },
				text: { text: 'Discover our devices' },
				position: 'iconLast',
				class: cn('flex-wrap gap-y-1 justify-center bg-focus px-2 py-1 sm:px-4 sm:py-2 ')
			}}
		/>
		<IconTextLink
			href={Routes.about.id}
			class="flex overflow-hidden rounded-xl bg-black text-center text-xs font-semibold text-wrap shadow transition duration-200 hover:scale-101 hover:opacity-100 sm:rounded-full sm:text-center sm:text-sm md:text-base"
			iconText={{
				icon: { icon: ArrowRight },
				text: { text: 'Learn more about us' },
				position: 'iconLast',
				class: cn('flex-wrap gap-y-1 justify-center bg-focus2 px-2 py-1 sm:px-4 sm:py-2 ')
			}}
		/>
	</div>
</div>
