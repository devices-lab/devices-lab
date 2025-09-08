<script lang="ts">
	import BaseLink from '$lib/components/interactive/BaseLink.svelte';
	import type { Snippet } from 'svelte';

	const { children, href, isLast }: { children: Snippet; href: string; isLast?: boolean } = $props();
</script>

<li class="flex items-center">
	<BaseLink link={href} class="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" aria-current={isLast === true ? 'page' : undefined}>
		{@render children()}
	</BaseLink>
</li>
