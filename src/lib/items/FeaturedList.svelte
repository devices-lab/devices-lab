<script lang="ts">
	import { type ItemType } from '$lib/items/item';

	import Featured from '$lib/items/Featured.svelte';
	import Button from '$lib/items/panel/Button.svelte';

	export interface FeaturedListProps {
		label: string;
		items: ItemType[];
	}

	const { href, props }: { href: string; props: FeaturedListProps } = $props();
</script>

<!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow -->
<div aria-hidden="true" class="absolute inset-0 top-1/2 bg-white shadow-lg ring-1 ring-gray-900/5 dark:bg-gray-900 dark:shadow-none dark:ring-white/10"></div>
<div class="relative bg-white p-8 dark:bg-gray-900">
	<div class="mx-auto flex max-w-3xl justify-start sm:px-6 lg:max-w-7xl lg:px-8">
		<div class="grid grid-cols-1 gap-10 sm:gap-8 lg:grid-cols-4">
			{#each props.items as item}
				<Featured {item} />
			{/each}
		</div>

		<div class="flex flex-none">
			<Button {href} label={props.label} class="self-end" />
		</div>
	</div>
</div>
