<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Snippet } from 'svelte';

	const { href, children, ...restProps }: { href: string; children?: Snippet; [key: string]: any } = $props();

	const resolvedHref = $derived(href.startsWith('/') ? resolve(href) : href);
</script>

<a href={resolvedHref} {...restProps}>
	{@render children?.()}
</a>
