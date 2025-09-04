<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	type Props = {
		children: Snippet;
		class?: ClassValue;
		hover?: boolean;
		scale?: 'full' | 'small' | string;
	};

	const { children, class: className = '', hover = false, scale = 'full' }: Props = $props();

	const hoverClass = $derived(hover ? 'cursor-pointer transition-transform duration-100 hover:scale-101 hover:bg-white/40 dark:hover:bg-neutral-50/10' : '');
	const scaleClass = $derived(scale === 'small' ? 'md:max-w-2/3' : scale === 'full' ? 'w-full' : scale);
</script>

<!--<div
	class="relative group rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 mx-auto text-gray-900 dark:text-gray-50
	{className}
	{hover ? 'cursor-pointer transition-transform duration-100 hover:scale-101 hover:bg-white/40 dark:hover:bg-neutral-50/10' : ''}
	{scale === 'small' ? 'md:max-w-2/3' : scale === 'full' ? 'w-full' : scale}
	"
>
	{@render children()}
</div>-->

<div class="group relative mx-auto rounded-md bg-white p-4 shadow-xs outline outline-gray-900/5 sm:rounded-lg dark:bg-gray-800/50 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10 {className} {hoverClass} {scaleClass}">
	{@render children()}
</div>
