<script lang="ts">
	import type { TooltipProps } from '$lib/components/base/Tooltip.svelte';
	import Tooltip from '$lib/components/base/Tooltip.svelte';
	import { cn } from '$lib/utils/cn';
	import type { DefProps2 } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';

	export type ButtonType = () => void;

	export type ButtonProps = DefProps2 & {
		onclick?: ButtonType;
		tooltip?: TooltipProps;
	};

	const { children, ...button }: ButtonProps & { children?: Snippet } = $props();
</script>

{#snippet Content()}
	<button {...button.props} onclick={button.onclick} class={cn('cursor-pointer', button.class)} type="button">
		{@render children?.()}
	</button>
{/snippet}

{#if button.tooltip}
	<Tooltip tooltip={button.tooltip}>
		{@render Content()}
	</Tooltip>
{:else}
	{@render Content()}
{/if}
