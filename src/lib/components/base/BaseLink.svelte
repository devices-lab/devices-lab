<script lang="ts">
	import type { TooltipProps } from '$lib/components/base/Tooltip.svelte';
	import { resolveLink, type Link } from '$lib/data/routes';
	import { cn } from '$lib/utils/cn';
	import { tooltip as tooltipAction } from '$lib/utils/tooltip';
	import type { DefProps2 } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';

	export type LinkType = string | null | undefined;

	export type LinkProps = DefProps2 & {
		href: LinkType;
		tooltip?: TooltipProps;
	};

	const { children, ...link }: LinkProps & { children?: Snippet } = $props();

	const resolved: Link = $derived(resolveLink(link.href));
	const attributes = $derived({
		target: resolved.external ? '_blank' : undefined,
		rel: resolved.external ? 'noopener noreferrer' : undefined
	});
</script>

{#if link.tooltip}
	<a {...attributes} {...link.props} href={resolved.href} class={cn('cursor-pointer hover:opacity-70', link.class)} use:tooltipAction={{ ...link.tooltip.params, content: link.tooltip.content }}>
		{@render children?.()}
	</a>
{:else}
	<a {...attributes} {...link.props} href={resolved.href} class={cn('cursor-pointer hover:opacity-70', link.class)}>
		{@render children?.()}
	</a>
{/if}
