<script lang="ts">
	import { resolve } from '$app/paths';
	import type { DefProps } from '$lib/utils';
	import type { Snippet } from 'svelte';

	type Props = DefProps & {
		children: Snippet;
		href: string;
		external?: boolean;
	};

	const { children, href, external = false, ...props }: Props = $props();

	const resolvedHref = $derived(href.startsWith('/') ? resolve(href) : href);
	const linkProps = $derived({
		target: external ? '_blank' : undefined,
		rel: external ? 'noopener noreferrer' : undefined
	});
</script>

<a href={resolvedHref} {...props} {...linkProps}>
	{@render children?.()}
</a>
