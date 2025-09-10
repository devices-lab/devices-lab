<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import type { DefProps } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';

	type Props = DefProps & {
		children?: Snippet;
		text?: string;
	};

	const { children, text, ...props }: Props = $props();
</script>

<ClassBox {props} tag="span" class="inline-block bg-slate-200 px-2 py-1 text-sm font-semibold text-gray-700 dark:bg-gray-600 dark:text-white">
	{#if children}
		{@render children()}
	{:else if text}
		{text}
	{:else}
		Badge
	{/if}
</ClassBox>
