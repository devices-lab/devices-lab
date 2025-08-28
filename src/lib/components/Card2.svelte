<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	interface Props {
		tag: string;
		children: Snippet;
		hover?: boolean;
		class?: ClassValue;
		[key: string]: any;
	}

	const { tag, children, hover = false, class: className = '', ...restProps }: Props = $props();
</script>

<svelte:element
	this={tag}
	class="
	group
	overflow-hidden
	bg-white
	shadow-md
	rounded-lg
	dark:bg-gray-800/50
	dark:shadow-none
	dark:inset-ring
	dark:inset-ring-white/10
	{hover ? 'transition-all duration-300 hover:translate-y-1 hover:bg-gray-200/50 dark:hover:bg-gray-700/50' : ''}
	{className}
"
	{...restProps}
>
	{@render children()}
</svelte:element>
