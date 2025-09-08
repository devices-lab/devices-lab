<script lang="ts">
	import { page } from '$app/state';
	import ItemPage from '$lib/items/page/ItemPage.svelte';
</script>

<ItemPage item={page.data.item} />
