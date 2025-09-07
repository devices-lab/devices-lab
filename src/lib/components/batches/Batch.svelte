<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import type { DefProps } from '$lib/utils';
	import type { Snippet } from 'svelte';

	type Props = DefProps & {
		children: Snippet;
	};

	const { children, ...props }: Props = $props();
</script>

<ClassBox {props} class="flex items-center rounded-xl bg-white px-3 py-1 text-sm/6 text-gray-500 shadow-xs outline outline-gray-200 dark:bg-gray-900 dark:text-gray-400 dark:outline-gray-700">
	{@render children()}
</ClassBox>
