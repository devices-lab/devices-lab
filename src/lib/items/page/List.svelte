<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	const { children, items, bare, class: className, ...restProps }: { children?: Snippet; items?: string[]; bare?: boolean, class?: ClassValue, [key: string]: any } = $props();
</script>

{#snippet DefaultList(items: string[])}
	{#each items as item}
		<li>
			{item}
		</li>
	{/each}
{/snippet}

<ul role="list" class="{bare == true ? 'pl-2' : 'list-disc pl-5 *:pl-2'} space-y-1 text-sm/6 text-gray-700 marker:text-gray-300 dark:text-gray-300 dark:marker:text-gray-600 {className}" {...restProps}>
	<!-- Handle snippet rendering -->
	{#if children}
		{@render children()}
	{/if}
	<!-- Handle string list rendering -->
	{#if items && items.length > 0}
		{@render DefaultList(items)}
	{/if}
</ul>
