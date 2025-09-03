<script lang="ts">
	import type { Icon } from '@lucide/svelte';
	import type { ClassValue } from 'svelte/elements';

	const props: { icon?: typeof Icon; fallback?: string; class?: ClassValue } = $props();
</script>

<div class="text-gray-600 dark:text-gray-200">
	{#if props.icon}
		<props.icon class="{props.class ?? 'size-8'} flex-none" />
	{:else}
		<div class="{props.class ?? 'size-8'} flex flex-none items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-600">{props.fallback?.charAt(0)}</div>
	{/if}
</div>
