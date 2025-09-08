<script lang="ts">
	import BaseImg from '$lib/components/BaseImg.svelte';
	import BaseLink from '$lib/components/interactive/BaseLink.svelte';

	const Shop = {
		name: 'Devices Lab',
		description: 'Explore the latest in device technology and research.',
		image: 'https://www.lancaster.ac.uk/images/people/21023.jpg',
		href: 'https://www.lancaster.ac.uk/sci-tech/about-us/people/mannu-lambrichts'
	};
</script>

<section aria-labelledby="featured-heading" class="group relative my-16 overflow-hidden rounded-lg bg-gray-100 lg:h-56 dark:bg-gray-800">
	<div class="absolute inset-0 transition-all duration-300 group-hover:translate-x-6">
		<BaseImg src={Shop.image} alt="shop illustration" class="size-full object-contain" />
	</div>
	<div aria-hidden="true" class="relative h-96 w-full lg:hidden"></div>
	<div aria-hidden="true" class="relative h-32 w-full lg:hidden"></div>
	<div class="absolute inset-x-0 bottom-0 rounded-br-lg rounded-bl-lg bg-black/70 p-6 backdrop-blur-sm backdrop-filter sm:flex sm:items-center sm:justify-between lg:inset-x-auto lg:inset-y-0 lg:w-96 lg:flex-col lg:items-start lg:rounded-tl-lg lg:rounded-br-none">
		<div>
			<span class="mb-3 inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700 dark:bg-red-400/10 dark:text-red-400">Coming soon!</span>
			<h2 id="featured-heading" class="text-xl font-bold text-white">{Shop.name}</h2>
			<p class="mt-1 text-sm text-gray-300">{Shop.description}</p>
		</div>
		<BaseLink href={Shop.href} class="disabled mt-6 flex shrink-0 items-center justify-center rounded-md border border-white/25 px-4 py-3 text-base font-medium text-white hover:bg-white/10 sm:mt-0 sm:ml-8 lg:ml-0 lg:w-full">Open shop</BaseLink>
	</div>
</section>
