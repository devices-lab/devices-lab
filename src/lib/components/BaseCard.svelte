<script lang="ts">
	import BaseLink, { type LinkProps } from '$lib/components/base/BaseLink.svelte';
	import { cn } from '$lib/utils/cn';
	import type { DefProps2 } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';

	type Props = DefProps2 & {
		children: Snippet;
		link?: LinkProps;
	};

	const { children, link, ...rest }: Props = $props();

	const hoverClass = $derived(link ? 'cursor-pointer transition-transform duration-200 hover:scale-101 shadow' : '');

	// outline outline-gray-900/5 dark:-outline-offset-1 dark:outline-white/10
	// Gradient requires all images to have a transparant background: bg-gradient-to-b from-white to-slate-50 dark:from-gray-800 dark:to-gray-800
</script>

{#snippet Content()}
	<div {...rest.props} class={cn('relative rounded-3xl bg-white text-gray-900 shadow dark:bg-gray-800 dark:text-gray-100 dark:shadow-none', hoverClass, rest.class)}>
		{@render children()}
	</div>
{/snippet}

{#if link}
	<BaseLink {...link}>
		{@render Content()}
	</BaseLink>
{:else}
	{@render Content()}
{/if}
