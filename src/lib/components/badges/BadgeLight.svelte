<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import type { ClassProp } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';

	type Props = ClassProp & {
		children?: Snippet;
		text?: string;
	};

	const { children, text, ...props }: Props = $props();
</script>

<ClassBox {props} tag="span" class="flex items-center rounded-xl bg-white px-3 py-1 text-sm/6 text-gray-500 shadow-xs outline outline-gray-200 dark:bg-gray-900 dark:text-gray-400 dark:outline-gray-700">
	{#if children}
		{@render children()}
	{:else if text}
		{text}
	{:else}
		Badge
	{/if}
</ClassBox>
