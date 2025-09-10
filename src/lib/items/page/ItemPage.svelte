<script lang="ts">
	import BaseCard from '$lib/components/BaseCard.svelte';
	import ClassBox from '$lib/components/ClassBox.svelte';
	import NoItems from '$lib/components/NoItems.svelte';
	import type { Entry, ItemData } from '$lib/data/indexer';
	import Description from '$lib/items/page/content/Description.svelte';
	import Features from '$lib/items/page/content/Features.svelte';
	import Identifiers from '$lib/items/page/content/Identifiers.svelte';
	import Publications from '$lib/items/page/content/Publications.svelte';
	import Resources from '$lib/items/page/content/Resources.svelte';
	import Title from '$lib/items/page/content/Title.svelte';
	import ImageGrid from '$lib/items/page/ImageGrid.svelte';
	import type { DefProps } from '$lib/utils/utils';

	type Props = DefProps & {
		entry: Entry;
	};

	const { entry, ...props }: Props = $props();
	const item: ItemData = $derived(entry.item as ItemData);
</script>

<ClassBox {props}>
	{#if entry}
		<BaseCard class="mt-6 sm:px-6! sm:py-10! lg:px-8!">
			<div class="relative lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-10 xl:gap-x-20">
				<!-- Image gallery -->
				<ImageGrid images={entry.images} class="mx-auto mt-8 max-w-lg px-0 lg:mt-0" />

				<!-- Item info -->
				<div class="relative mt-10 px-2 sm:mt-16 md:px-4 lg:mt-0 lg:px-0 flex flex-col gap-y-6">
					<Title {item} />
					<Description {item} />
					<div class="border-t-1 border-gray-200 dark:border-gray-700"></div>
					<Features {item} />
					<Resources {item} />
					<Publications {item} />
					<Identifiers {item} />
				</div>
			</div>
		</BaseCard>
	{:else}
		<NoItems />
	{/if}
</ClassBox>
