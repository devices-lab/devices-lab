<script lang="ts">
	import BaseList from '$lib/components/BaseList.svelte';
	import type { ItemData } from '$lib/data/indexer';
	import BaseCollapse from '$lib/items/page/content/BaseCollapse.svelte';
	import type { DefProps } from '$lib/utils/utils';

	type Props = DefProps & {
		item: ItemData;
	};

	const { item, ...props }: Props = $props();
</script>

{#if item.features && item.features.length > 0}
	<BaseCollapse {...props} label="Key Features">
		<BaseList items={item.features} />
	</BaseCollapse>
{/if}
