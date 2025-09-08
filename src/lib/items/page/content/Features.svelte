<script lang="ts">
	import BaseList from '$lib/components/BaseList.svelte';
	import ClassBox from '$lib/components/ClassBox.svelte';
	import Collapse from '$lib/components/Collapse.svelte';
	import type { ItemType } from '$lib/data/item';
	import type { DefProps } from '$lib/utils/utils';

	type Props = DefProps & {
		item: ItemType;
	};

	const { item, ...props }: Props = $props();
</script>

{#if item.features && item.features.length > 0}
	<ClassBox {props}>
		<Collapse label={'Features'}>
			<BaseList items={item.features} />
		</Collapse>
	</ClassBox>
{/if}
