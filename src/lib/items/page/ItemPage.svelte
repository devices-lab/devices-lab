<script lang="ts">
	import BaseCard from '$lib/components/BaseCard.svelte';
	import BaseList from '$lib/components/BaseList.svelte';
	import ClassBox from '$lib/components/ClassBox.svelte';
	import Collapse from '$lib/components/Collapse.svelte';
	import IconSublink from '$lib/components/icons/IconSublink.svelte';
	import type { ItemType } from '$lib/data/item';
	import Description from '$lib/items/page/Description.svelte';
	import ImageGrid from '$lib/items/page/ImageGrid.svelte';
	import Title from '$lib/items/page/Title.svelte';
	import type { DefProps } from '$lib/utils/utils';
	import SVG_Stack from '$lib/workbench/logo/SVG_Stack.svelte';
	import SVG_StackPill from '$lib/workbench/logo/SVG_StackPill.svelte';
	import { ProjectProps, VersionProps } from '$lib/workbench/logo/utils';

	import Features from './collapses/Features.svelte';
	import Identifiers from './collapses/Identifiers.svelte';
	import Publications from './collapses/Publications.svelte';
	import Resources from './collapses/Resources.svelte';

	type Props = DefProps & {
		item: ItemType;
	};

	const { item, ...props }: Props = $props();
</script>

<ClassBox {props}>
	{#if item}
		<BaseCard class="sm:px-6! sm:py-10! lg:px-8!">
			<div class="relative lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-10 xl:gap-x-20">
				<!-- Image gallery -->
				<ImageGrid images={item.images} class="px-0 mt-8 lg:mt-0 max-w-lg mx-auto"/>
			

				<!-- Item info -->
				<div class="relative mt-10 px-2 sm:mt-16 md:px-4 lg:px-0 lg:mt-0">
					<Title {item} />
					<Description description={item.description} />

					<section aria-labelledby="details-heading" class="mt-12">
						<h2 id="details-heading" class="sr-only">Additional details</h2>
						<div class="border-t-1 border-gray-200 dark:border-gray-700">
							<Features {item} />
							<Resources {item} />
							<Publications {item} />
							<Identifiers {item} />
						</div>
					</section>
				</div>
			</div>
		</BaseCard>
	{:else}
		<p class="text-center text-sm text-gray-500 italic">No items found.</p>
	{/if}
</ClassBox>
