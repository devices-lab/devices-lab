<script lang="ts">
	import { type TooltipProps } from '$lib/components/base/Tooltip.svelte';
	import { cn } from '$lib/utils/cn';
	import { tooltip as tooltipAction } from '$lib/utils/tooltip';
	import type { DefProps2 } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';

	export type TextType = string | null | undefined | Snippet;
	export type TextTag = 'span' | 'div' | 'p' | 'label';
	export type TextProps = DefProps2 & {
		text?: TextType;
		tag?: TextTag;
		html?: boolean;
		fallback?: string;
		tooltip?: TooltipProps;
	};

	const { ...text }: TextProps = $props();
</script>

{#snippet Content()}
	{#if text.text}
		{#if typeof text.text === 'string'}
			{#if text.html}
				{@html text.text}
			{:else}
				{text.text}
			{/if}
		{:else if text.text}
			{@render text.text()}
		{/if}
	{:else if text.fallback}
		<!-- Fallback if text is not available -->
		<span {...text.props} class={cn('inline-flex items-center justify-center rounded-lg border border-current/50 font-ocr font-black', text?.class)}>
			{text.fallback}
		</span>
	{/if}
{/snippet}

{#if text.tooltip}
	<svelte:element this={text.tag ?? 'span'} {...text.props} class={text.class} use:tooltipAction={{ ...text.tooltip.params, content: text.tooltip.content }}>
		{@render Content()}
	</svelte:element>
{:else}
	<svelte:element this={text.tag ?? 'span'} {...text.props} class={text.class}>
		{@render Content()}
	</svelte:element>
{/if}
