<script lang="ts">
	import { page } from '$app/state';

	import type { Snippet } from 'svelte';
	import type { ItemType } from '$lib/data/item';
	import SVG_Stack from '$lib/workbench/logo/SVG_Stack.svelte';
	import SVG_StackPill from '$lib/workbench/logo/SVG_StackPill.svelte';

	import Title from '$lib/items/page/Title.svelte';
	import Description from '$lib/items/page/Description.svelte';
	import Collapse from '$lib/components/Collapse.svelte';
	import ImageGrid from '$lib/items/page/ImageGrid.svelte';
	
	import { ProjectProps, VersionProps } from '$lib/workbench/logo/utils';

	const { children }: { children?: Snippet } = $props();

	// Load the item data
	const item: ItemType = $derived(page.data.item);
</script>

{#if item}
	<section class="relative bg-white sm:px-6 sm:py-24 lg:px-8 dark:bg-gray-900">
		<div class="relative lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-10 xl:gap-x-20">
			<!-- Image gallery -->
			<div class="px-4 sm:mt-16 sm:px-0 lg:mt-0">
				<ImageGrid images={item.images} />
			</div>

			<!-- Item info -->
			<div class="relative mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
				<Title {item} />
				<Description description={item.description} />

				<section aria-labelledby="details-heading" class="mt-12">
					<h2 id="details-heading" class="sr-only">Additional details</h2>
					<div class="border-t-1 border-gray-200 dark:border-gray-700">
						{@render children?.()}
						<Collapse label={'Identifiers'}>
							<div class="flex justify-center gap-3">
								<div class="max-w-fit fill-white opacity-80 *:max-h-15 dark:fill-gray-300">
									<SVG_StackPill uid={'dl-version-stack'} {...VersionProps(item.projectID, item.projectVersion)} />
								</div>
								<div class="max-w-fit fill-white opacity-80 *:max-h-15 dark:fill-gray-300">
									<SVG_Stack uid={'dl-project'} {...ProjectProps(item.projectName)} />
								</div>
							</div>
						</Collapse>
					</div>
				</section>
			</div>
		</div>
	</section>
{:else}
	<p class="text-center text-sm text-gray-500 italic">No items found.</p>
{/if}
