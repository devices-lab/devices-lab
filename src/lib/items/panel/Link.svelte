<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	const { href, children, class: className, ...restProps }: { href: string; children?: Snippet; class?: ClassValue; [key: string]: any } = $props();
</script>

<a
	{href}
	class={`
		group/item
		flex
		items-center
		wrap-anywhere
		text-blue-500
		underline
		hover:text-blue-300
		dark:text-blue-400
		dark:hover:text-blue-300
		${className}
		`}
	target="_blank"
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else if href}
		{href}
	{:else}
		'Link'
	{/if}
</a>
