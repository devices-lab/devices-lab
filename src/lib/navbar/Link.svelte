<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	const { href, children, class: className, current = false, ...restProps }: { href: string; children: Snippet; class?: ClassValue; current?: boolean; [key: string]: any } = $props();
</script>

<a
	{href}
	aria-current={current ? 'page' : undefined}
	class={`
		group/item
		flex
		items-center
		px-4
		py-2
		text-sm
		text-gray-700
		hover:not-aria-[current]:text-gray-400
		aria-[current]:bg-gray-200/50
		dark:text-gray-300
		dark:hover:not-aria-[current]:text-gray-400
		dark:aria-[current]:bg-gray-600/50
		${className}
		`}
	{...restProps}
>
	{@render children()}
</a>
