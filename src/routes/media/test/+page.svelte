<script lang="ts">
	import { item } from './about';

	import Panel from '$lib/items/panel/Panel.svelte';
</script>

<Panel logo={item.logo} name={item.name} description={item.description} images={item.images} />