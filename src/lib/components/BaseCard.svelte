<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import type { DefProps } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';

	type Props = DefProps & {
		children: Snippet;
		hover?: boolean;
		scale?: 'full' | 'small' | string;
	};

	const { children, hover = false, scale = 'full', ...props }: Props = $props();

	const hoverClass = $derived(hover ? 'cursor-pointer transition-transform duration-100 hover:scale-101 hover:bg-white/40 dark:hover:bg-neutral-50/10' : '');
	const scaleClass = $derived(scale === 'small' ? 'md:max-w-2/3' : scale === 'full' ? 'w-full' : scale);
</script>

<ClassBox {props} class="group relative mx-auto rounded-md bg-white p-4 shadow-xs outline outline-gray-900/5 sm:rounded-lg dark:bg-gray-800/50 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10 {hoverClass} {scaleClass}">
	{@render children()}
</ClassBox>
