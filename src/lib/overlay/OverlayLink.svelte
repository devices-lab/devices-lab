<script lang="ts">
	import BaseLink from '$lib/components/interactive/BaseLink.svelte';
	import { type OverlayType } from '$lib/overlay/OverlayContainer.svelte';
	import type { ClassValue } from 'svelte/elements';

	interface Props {
		href: string;
		label: string;
		x: number;
		y: number;
		overlay: OverlayType;
		class?: ClassValue;
		[key: string]: any;
	}

	const { href, label, x, y, overlay, class: className, ...restProps }: Props = $props();

	const leftPx = $derived(overlay.offsetX + overlay.renderedW * x);
	const topPx = $derived(overlay.offsetY + overlay.renderedH * y);
</script>

<BaseLink
	link={href}
	class="
		absolute
		rounded-full
		bg-primary-600
		px-2
		py-1
		text-xs
		font-semibold
		text-white
		shadow-xs
		hover:bg-primary-500
		focus-visible:outline-2
		focus-visible:outline-offset-2
		focus-visible:outline-primary-600
		dark:bg-primary-500
		dark:shadow-none
		dark:hover:bg-primary-400
		dark:focus-visible:outline-primary-500
		{className}
	"
	style={`left: ${leftPx}px; top: ${topPx}px; transform: translate(-50%, -50%);`}
	{...restProps}
>
	{label}
</BaseLink>
