<script lang="ts">
	import type { Snippet } from 'svelte';
	import Link from './Link.svelte';

	const { label, sublabel, children, ...props }: { label: string; sublabel?: string; children?: Snippet; href: string } = $props();
</script>

<li class="space-x- flex flex-row items-start space-x-2">
	<div class="self-center">
		{@render children?.()}
	</div>

	<div class="flex flex-1 flex-col">
		<span class="font-semibold">{label}</span>

		<Link {...props} />
	</div>

	{#if sublabel}
		<span class="text-sm font-light text-gray-400">({sublabel})</span>
	{/if}
</li>
