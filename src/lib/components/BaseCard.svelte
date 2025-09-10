<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import BaseLink, { type LinkType } from '$lib/components/interactive/BaseLink.svelte';
	import type { DefProps } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';

	type Props = DefProps & {
		children: Snippet;
		hover?: boolean;
		link?: LinkType;
	};

	const { children, link, ...props }: Props = $props();

	const hoverClass = $derived(link ? 'cursor-pointer transition-transform duration-200 hover:scale-102 shadow' : '');

	// outline outline-gray-900/5 dark:-outline-offset-1 dark:outline-white/10
	// Gradient requires all images to have a transparant background: bg-gradient-to-b from-white to-slate-50 dark:from-gray-800 dark:to-gray-800
</script>

{#snippet Content()}
	<ClassBox {props} class="group relative overflow-hidden rounded-3xl bg-white text-gray-900 shadow dark:bg-gray-800 dark:text-gray-100 dark:shadow-none {hoverClass}">
		{@render children()}
	</ClassBox>
{/snippet}

{#if link}
	<BaseLink {link} class="contents">
		{@render Content()}
	</BaseLink>
{:else}
	{@render Content()}
{/if}
