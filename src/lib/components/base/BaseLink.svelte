<script lang="ts">
	import type { TooltipProps } from '$lib/components/base/Tooltip.svelte';
	import Tooltip from '$lib/components/base/Tooltip.svelte';
	import { resolveLink, type Link } from '$lib/data/routes';
	import { cn } from '$lib/utils/cn';
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

{#snippet Content()}
	<a {...attributes} {...link.props} href={resolved.href} class={cn('cursor-pointer', link.class)}>
		{@render children?.()}
	</a>
{/snippet}

{#if link.tooltip}
	<Tooltip tooltip={link.tooltip}>
		{@render Content()}
	</Tooltip>
{:else}
	{@render Content()}
{/if}
