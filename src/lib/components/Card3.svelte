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
		{hover ? 'transition-all duration-300 hover:translate-y-1 hover:opacity-70' : ''}
		{className}
	"
	{...restProps}
>
	{@render children()}
</svelte:element>
