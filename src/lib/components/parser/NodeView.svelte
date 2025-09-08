<!-- src/lib/components/richtext/NodeView.svelte -->
<script lang="ts">
	import { render, type TagMap, type Node, type TagNode } from '$lib/components/parser/customText';
	import NodeView from '$lib/components/parser/NodeView.svelte';
	import { cn, type cnType } from '$lib/cn';
	import type { Component } from 'svelte';
	import type { SvelteTagSpec } from '$lib/components/parser/maps-helpers';

	

	export type SvelteTagMap = Record<string, SvelteTagSpec<any>>;

	type Props = {
		node: Node;
		svelteMap: SvelteTagMap;
		tagMap: TagMap;
	};

	const { node, svelteMap, tagMap }: Props = $props();

	const isText = (n: Node): n is Extract<Node, { type: 'text' }> => n.type === 'text';
	const isTag = (n: Node): n is TagNode => n.type === 'tag';
</script>

{#if isText(node)}
	{@html node.value}
{:else if isTag(node)}
	{#if svelteMap[node.name]}
		{#key node}
			<!-- Render as Svelte component -->
			{@const nodeType = svelteMap[node.name]}
			<nodeType.component {...nodeType.props ? nodeType.props!({ node, cn }) : node.attrs}>
				{#if !nodeType.ignoreChildren}
					{#each node.children as child (child)}
						<NodeView node={child} {svelteMap} {tagMap} />
					{/each}
				{/if}
			</nodeType.component>
		{/key}
	{:else if tagMap[node.name]}
		{@html render([node], tagMap)}
	{:else}
		<!-- Unknown tag: drop wrapper, render children -->
		{#each node.children as child (child)}
			<NodeView node={child} {svelteMap} {tagMap} />
		{/each}
	{/if}

{/if}
