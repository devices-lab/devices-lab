<script lang="ts">
	import { cn } from '$lib/utils/cn'; // clsx + tailwind-merge helper
	import type { DefProps } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';

	type Props = DefProps & {
		children?: Snippet;
		tag?: keyof HTMLElementTagNameMap;
		props?: DefProps;
	};

	// Pull top-level props (component-level base class)
	const { children, tag = 'div', props = {}, ...attrs }: Props = $props();

	// Pull class out of attrs so we can merge it; spread the rest
	const { class: attrsClass, ...attrsRest } = attrs; // own properties
	const { class: propsClass, ...propsRest } = props; // passed properties
	
	// Merge base class (from component) with incoming attrs.class
	const mergedClass = $derived(cn(attrsClass, propsClass));
</script>

<svelte:element this={tag} {...attrsRest} {...propsRest} class={mergedClass}>
	{@render children?.()}
</svelte:element>
