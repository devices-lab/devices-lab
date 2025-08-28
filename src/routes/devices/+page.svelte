<script lang="ts">
	import type { PageProps } from './$types';

	import ItemGrid from '$lib/items/Grid.svelte';
	import DeviceShop from '$lib/shop/Shop.svelte';

	const { data }: PageProps = $props();
</script>

<ItemGrid items={data.devices} />
<DeviceShop />
