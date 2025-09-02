<script lang="ts">
	import Collapse from '$lib/components/Collapse.svelte';
	import { ChevronDown, ChevronUp } from '@lucide/svelte';
	import type { Snippet } from 'svelte';

	const { label: labelText, children, class: className = '', ...props }: { label: string; children: Snippet; class?: string; [key: string]: any } = $props();
</script>

<Collapse class="bg-gray-50 rounded-lg p-4 shadow-sm {className}" buttonClass="" {...props}>
	{#snippet label()}
		<span class="text-sm font-semibold not-in-aria-expanded:text-gray-900 in-aria-expanded:text-primary-600 dark:not-in-aria-expanded:text-gray-300 dark:in-aria-expanded:text-primary-400">
			{labelText}
		</span>

	{/snippet}
	<div class="grid grid-cols-2 gap-x-6 gap-y-2 mt-4">
		{@render children?.()}
	</div>
</Collapse>
