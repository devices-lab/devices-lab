<script lang="ts">
	import Collapse from '$lib/components/Collapse.svelte';
	import { ChevronDown } from '@lucide/svelte';
	import type { Snippet } from 'svelte';

	const { label: labelText, children, class: className = '', ...restProps }: { label: string; children: Snippet; class?: string; [key: string]: any } = $props();
</script>

<Collapse class="rounded-lg {className}" buttonClass="" {...restProps}>
	{#snippet label()}
		<span class="w-full flex items-center font-semibold not-in-aria-expanded:text-gray-900 in-aria-expanded:text-primary-600 dark:not-in-aria-expanded:text-gray-300 dark:in-aria-expanded:text-primary-400 border-b-0 border-gray-200 dark:border-gray-700">
			{labelText}
			<ChevronDown class="ml-2 size-4 not-in-aria-expanded:-rotate-180 transition duration-300" />
		</span>

	{/snippet}
	<div class="grid grid-cols-2 gap-4 mt-4">
		{@render children?.()}
	</div>
</Collapse>
