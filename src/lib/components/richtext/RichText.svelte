<script lang="ts">
	import NodeView from '$lib/components/richtext/NodeView.svelte';
	import { parse, type Node } from '$lib/components/richtext/customText';
	import { svelteMap, tagMap } from '$lib/components/richtext/maps';

	type Props = {
		source?: string;
		nodes?: Node[];
	};

	const { source, nodes }: Props = $props();

	const tree = $derived.by(() => {
		try {
			return nodes ?? (source ? parse(source) : []);
		} catch (error) {
			console.error('Error parsing rich text:', error);
			return [];
		}
	});
</script>

{#each tree as n (n)}
	<NodeView node={n} {svelteMap} {tagMap} />
{/each}