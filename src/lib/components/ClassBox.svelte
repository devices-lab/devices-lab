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
</script>

<svelte:element this={tag} {...attrsRest} {...propsRest} class={cn(attrsClass, propsClass)}>
	{@render children?.()}
</svelte:element>
