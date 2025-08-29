<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	const { href, children, class: classList = '', ...restProps }: { href: string; classList?: ClassValue; children?: Snippet; [key: string]: any } = $props();

	const resolvedHref = $derived(href.startsWith('/') ? resolve(href) : href);
</script>

<a href={resolvedHref} class={classList} {...restProps}>
	{@render children?.()}
</a>
