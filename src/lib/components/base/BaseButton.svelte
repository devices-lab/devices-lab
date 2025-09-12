<script lang="ts">
	import type { TooltipProps } from '$lib/components/base/Tooltip.svelte';
	import { cn } from '$lib/utils/cn';
	import { tooltip as tooltipAction } from '$lib/utils/tooltip';
	import type { DefProps2 } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';

	export type ButtonType = () => void;

	export type ButtonProps = DefProps2 & {
		onclick?: ButtonType;
		tooltip?: TooltipProps;
	};

	const { children, ...button }: ButtonProps & { children?: Snippet } = $props();
</script>

{#if button.tooltip}
	<button {...button.props} onclick={button.onclick} class={cn('cursor-pointer hover:opacity-70', button.class)} type="button" use:tooltipAction={{ ...button.tooltip.params, content: button.tooltip.content }}>
		{@render children?.()}
	</button>
{:else}
	<button {...button.props} onclick={button.onclick} class={cn('cursor-pointer hover:opacity-70', button.class)} type="button">
		{@render children?.()}
	</button>
{/if}
