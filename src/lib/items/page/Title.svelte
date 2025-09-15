<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import type { ItemData } from '$lib/data/data';
	import FeaturedLabel from '$lib/items/featured/FeaturedLabel.svelte';
	import type { ClassProp } from '$lib/utils/utils';

	type Props = ClassProp & {
		item: ItemData;
	};

	const { item, ...props }: Props = $props();
</script>

<ClassBox {props} tag="h1" class="flex items-end text-2xl font-bold tracking-tight wrap-break-word sm:text-3xl ">
	{#if item.featured}
		<FeaturedLabel class="relative -ms-4 me-1 pb-2 lg:-ms-7" />
	{/if}
	{item.name}
</ClassBox>
