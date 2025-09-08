<script lang="ts">
	import NodeView, { type SvelteTagMap } from '$lib/components/parser/NodeView.svelte';
	import { parse, type Node, type TagMap } from '$lib/components/parser/customText';

	type Props = {
		source?: string; // raw text with ${tag}[...]
		nodes?: Node[]; // or pass a pre-parsed AST
		svelteMap: SvelteTagMap; // tag → Svelte component
		tagMap: TagMap; // tag → HTML renderer
	};

	const { source, nodes, svelteMap = {}, tagMap = {} }: Props = $props();

	const tree = $derived.by(() => {
		try {
			return nodes ?? (source ? parse(source) : []);
		} catch (error) {
			//console.error('Error parsing rich text:', error);
			return [];
		}
	});
</script>

{#each tree as n (n)}
	<NodeView node={n} {svelteMap} {tagMap} />
{/each}
