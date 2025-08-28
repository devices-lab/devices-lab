<script lang="ts">
	import type { Snippet } from 'svelte';
	import { resolve } from '$app/paths';

	const { children, href, isLast }: { children: Snippet; href: string; isLast?: boolean } = $props();
</script>

<li class="flex items-center">
	<a href={href} aria-current={isLast === true ? 'page' : undefined} class="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
		{@render children()}
	</a>
</li>
