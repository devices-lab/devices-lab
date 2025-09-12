<script lang="ts">
	import BaseButton from '$lib/components/base/BaseButton.svelte';
	import BaseLink from '$lib/components/base/BaseLink.svelte';
	import { type OverlayType } from '$lib/overlay/OverlayContainer.svelte';
	import { cn } from '$lib/utils/cn';
	import type { ClassProp } from '$lib/utils/utils';

	type Props = ClassProp & {
		action: string | (() => void);
		x: number;
		y: number;
		overlay: OverlayType;
	};

	const { action, x, y, overlay, ...rest }: Props = $props();

	const leftPx = $derived(overlay.offsetX + overlay.renderedW * x);
	const topPx = $derived(overlay.offsetY + overlay.renderedH * y);

	const classList = $derived(cn('absolute size-2 rounded-full cursor-pointer text-transparent shadow-none', rest.class));
</script>

{#if typeof action === 'string'}
	<BaseLink {...rest} href={action} class={classList} props={{ style: `left: ${leftPx}px; top: ${topPx}px; transform: translate(-50%, -50%);` }} />
{:else}
	<BaseButton {...rest} onclick={action} class={classList} props={{ style: { left: `${leftPx}px`, top: `${topPx}px`, transform: 'translate(-50%, -50%)' } }} />
{/if}
