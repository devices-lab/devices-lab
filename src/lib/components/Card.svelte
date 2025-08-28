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
	divide-gray-100
	overflow-hidden
	rounded-lg
	border-1
	border-gray-100
	bg-white
	shadow-sm
	{hover ? 'hover:bg-gray-200' : ''}
	dark:divide-gray-700
	dark:border-gray-700
	dark:bg-gray-800
	dark:shadow-none
	{hover ? 'dark:hover:bg-gray-700' : ''}
	{hover ? 'transition-all duration-300 hover:translate-y-1' : ''}
	{className}
"
	{...restProps}
>
	{@render children()}
</svelte:element>
