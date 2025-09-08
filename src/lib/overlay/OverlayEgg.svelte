<script lang="ts">
	import type { DefProps } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';
	import BaseLink from '$lib/components/interactive/BaseLink.svelte';
	import { type OverlayType } from '$lib/overlay/OverlayContainer.svelte';
	import { cn } from '$lib/utils/cn';

	type Props = DefProps & {
		action: string | (() => void);
		x: number;
		y: number;
		overlay: OverlayType;
	};

	const { action, x, y, overlay, ...props }: Props = $props();

	const leftPx = $derived(overlay.offsetX + overlay.renderedW * x);
	const topPx = $derived(overlay.offsetY + overlay.renderedH * y);

	const {class: _class, ...rest} = props;
	const classList = $derived(cn('absolute size-2 rounded-full cursor-pointer text-transparent shadow-none', _class));
</script>

{#if typeof action === 'string'}
	<BaseLink link={action} class={classList} style={`left: ${leftPx}px; top: ${topPx}px; transform: translate(-50%, -50%);`} {...rest} />
{:else}
	<button onclick={action} class={classList} style:left={`${leftPx}px`} style:top={`${topPx}px`} style:transform="translate(-50%, -50%)" {...rest}> </button>
{/if}
