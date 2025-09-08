<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import type { DefProps } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';

	type Props = DefProps & {
		children?: Snippet;
		items?: string[];
		bare?: boolean;
	};

	const { children, items, bare, ...props }: Props = $props();
</script>

{#snippet DefaultList(items: string[])}
	{#each items as item}
		<li>
			{item}
		</li>
	{/each}
{/snippet}

<ClassBox {props} tag="ul" role="list" class="{bare == true ? 'pl-2' : 'list-disc pl-5 *:pl-2'} space-y-1 text-sm/6 text-gray-700 marker:text-gray-300 dark:text-gray-300 dark:marker:text-gray-600 ">
	<!-- Handle snippet rendering -->
	{#if children}
		{@render children()}
	{/if}
	<!-- Handle string list rendering -->
	{#if items && items.length > 0}
		{@render DefaultList(items)}
	{/if}
</ClassBox>
