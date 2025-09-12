<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { tooltip as tooltipAction } from '$lib/utils/tooltip';
	import type { DefProps2 } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';

	export type TooltipProps = DefProps2 & {
		content?: string;
		params?: Record<string, any>; // tooltip.js options (without 'content')
	};

	const { children, tooltip }: { children: Snippet; tooltip: TooltipProps } = $props();
</script>

{#if tooltip.content}
	<div {...tooltip.props} class={cn('group/tooltip relative z-1000 inline-flex', tooltip.class)} use:tooltipAction={{ ...tooltip.params, content: tooltip.content }}>
		{@render children()}
	</div>
{/if}
