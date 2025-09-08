<script lang="ts">
	import ItemPage from '$lib/items/page/ItemPage.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ItemPage item={data.item} />
