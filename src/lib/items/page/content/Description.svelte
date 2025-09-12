<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import RichText from '$lib/components/richtext/RichText.svelte';
	import type { ItemData } from '$lib/data/indexer';
	import type { DefProps } from '$lib/utils/utils';

	type Props = DefProps & {
		item: ItemData;
	};

	const { item, ...props }: Props = $props();
</script>

<ClassBox {props} tag="p">
	<RichText source={item.description} />
</ClassBox>
