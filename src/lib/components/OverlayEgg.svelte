<script lang="ts">
	import BaseLink from '$lib/components/BaseLink.svelte';
	import { type OverlayType } from '$lib/components/OverlayContainer.svelte';
	import type { ClassValue } from 'svelte/elements';

	interface Props {
		action: string | (() => void);
		x: number;
		y: number;
		overlay: OverlayType;
		class?: ClassValue;
		[key: string]: any;
	}

	const { action, x, y, overlay, class: className, ...restProps }: Props = $props();

	const leftPx = $derived(overlay.offsetX + overlay.renderedW * x);
	const topPx = $derived(overlay.offsetY + overlay.renderedH * y);

	const classList = $derived(['absolute', 'size-2', 'rounded-full', 'cursor-pointer', 'text-transparent', 'shadow-none', className]);
</script>

{#if typeof action === 'string'}
	<BaseLink href={action} class={classList} style={`left: ${leftPx}px; top: ${topPx}px; transform: translate(-50%, -50%);`} {...restProps}> </BaseLink>
{:else}
	<button onclick={action} class={classList} style:left={`${leftPx}px`} style:top={`${topPx}px`} style:transform="translate(-50%, -50%)" {...restProps}> </button>
{/if}
