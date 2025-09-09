<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import type { ItemData } from '$lib/data/indexer';
	import FeaturedLabel from '$lib/items/featured/FeaturedLabel.svelte';
	import type { DefProps } from '$lib/utils/utils';

	type Props = DefProps & {
		item: ItemData;
	};

	const { item, ...props }: Props = $props();
</script>


<ClassBox {props} tag="h1" class="flex items-end text-2xl font-bold tracking-tight wrap-break-word text-gray-900 sm:text-3xl dark:text-white">
	{#if item.featured}
		<FeaturedLabel class="relative -ms-4 lg:-ms-7 me-1 pb-2" />
	{/if}

	{item.name}
</ClassBox>
