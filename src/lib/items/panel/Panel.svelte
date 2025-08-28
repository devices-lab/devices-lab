<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ItemImage } from '$lib/items/item';
	import SvgProject from '$lib/tools/logo/SVG_Project.svelte';

	import Title from '$lib/items/panel/Title.svelte';
	import Description from '$lib/items/panel/Description.svelte';
	import Collapse from '$lib/items/panel/Collapse.svelte';
	import ImageGrid from '$lib/items/panel/ImageGrid.svelte';
	import SvgVersion from '$lib/tools/logo/SVG_Version.svelte';

	interface Props {
		logo: string;
		name: string;
		description: string;
		images: ItemImage[];
		children?: Snippet;
	}

	const { logo, name, description, images, children }: Props = $props();
</script>

<section class="relative bg-white sm:px-6 sm:py-24 lg:px-8 dark:bg-gray-900">
	<div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-10 xl:gap-x-20">
		<!-- Image gallery -->
		<div class="px-4 sm:mt-16 sm:px-0 lg:mt-0">
			<ImageGrid {images} />
		</div>

		<!-- Item info -->
		<div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
			<Title title={name} />
			<Description {description} />

			<section aria-labelledby="details-heading" class="mt-12">
				<h2 id="details-heading" class="sr-only">Additional details</h2>
				<div class="divide-y divide-gray-200 border-t border-gray-200 dark:divide-gray-700 dark:border-gray-700">
					{@render children?.()}
					<Collapse label={'Identifier'}>
						
						<SvgProject uid={'dl-project'} projectName={logo} class="max-h-15 opacity-80" props={{ class: 'fill-white dark:fill-gray-300' }} />

						<SvgVersion uid={'dl-version-stack'} projectId="0032" projectVersion="v1.2"  class="max-h-15 opacity-80" />
					</Collapse>
				</div>
			</section>
		</div>
	</div>
</section>
