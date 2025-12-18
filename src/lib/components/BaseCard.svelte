<script lang="ts">
	import BaseLink, { type LinkProps } from '$lib/components/base/BaseLink.svelte';
	import { cn } from '$lib/utils/cn';
	import { cardStackLayers } from "$lib/utils/cardstack";
	import type { DefProps2 } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';

	type Props = DefProps2 & {
		children: Snippet;
		link?: LinkProps;
		stacked?: boolean;
	};

	const { children, link, stacked, ...rest }: Props = $props();

	const hoverClass = $derived(link ? 'cursor-pointer transition-transform duration-200 hover:scale-101' : '');
	const stackClass = $derived(stacked ? `origin-top-left scale-96 hover:scale-97 ${link ? 'hover:scale-97 hover:-translate-0.5' : ''}` : '');

	const stack = cardStackLayers({
		depth: 3,
		density: "normal",
		style: "paper",
		radiusClass: "rounded-3xl",
		hoverSpread: true
	});
</script>

{#snippet Content()}
	<!--
		<div {...rest.props} class={cn('relative rounded-3xl bg-white text-gray-900 shadow dark:bg-gray-800 dark:text-gray-100 dark:shadow-none', hoverClass, rest.class)}>
			{@render children()}
		</div>
	-->
	<div class={cn('relative group')}>
		{#if stacked}
		<div class="absolute pointer-events-none translate-1 scale-100 inset-1">
			{#each stack as layer}
				<div aria-hidden="true" class={layer.class} style={layer.style}></div>
			{/each}
			</div>
		{/if}

		<!-- front surface -->
		<div {...rest.props} class={cn('relative z-20 h-full w-full overflow-hidden rounded-3xl bg-white text-gray-900 shadow dark:bg-gray-800 dark:text-gray-100 dark:shadow-none ring-2 ring-slate-800/10 dark:ring-white/10', hoverClass, stackClass, rest.class)}>
			{@render children()}
		</div>
	</div>
{/snippet}

{#if link}
	<BaseLink {...link}>
		{@render Content()}
	</BaseLink>
{:else}
	{@render Content()}
{/if}
