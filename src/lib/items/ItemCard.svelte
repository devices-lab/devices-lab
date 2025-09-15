<script lang="ts">
	import { resolveCardLayout } from '$lib/data/layouts';
	import type { Entry } from '$lib/data/indexer';

	type Props = {
		entry: Entry;
	};

	const { entry }: Props = $props();

	const Layout = $derived(resolveCardLayout(entry));
</script>

<Layout {entry} />
