<script lang="ts">
	import type { ClassProp } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';
	import ClassBox from '$lib/components/ClassBox.svelte';

	type Props = ClassProp & {
		children?: Snippet | string;
		text?: string;
	};

	const { children, text = 'No items found', ...props }: Props = $props();
</script>

<ClassBox {props} tag="p" class="text-sm text-gray-500 italic dark:text-gray-400">
	{#if children}
		{#if typeof children === 'string'}
			{children}
		{:else}
			{@render children?.()}
		{/if}
	{:else}
		{text}
	{/if}
</ClassBox>
