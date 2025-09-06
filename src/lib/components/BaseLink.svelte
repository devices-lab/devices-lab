<script lang="ts">
	import { resolve } from '$app/paths';
	import type { DefProps } from '$lib/utils';
	import type { Snippet } from 'svelte';

	type Props = DefProps & {
		children: Snippet;
		href: string;
	};

	const { children, href, ...props }: Props = $props();

	const resolvedHref = $derived(href.startsWith('/') ? resolve(href) : href);
</script>

<a href={resolvedHref} {...props}>
	{@render children?.()}
</a>
