<script lang="ts">
	import type { Route } from '$lib/data/routes';
	import type { Snippet } from 'svelte';

	const { route, children }: { route: Route; children?: Snippet } = $props();
</script>

{#if children}
	<!-- Content is provided -->
	{@render children()}
{:else}
	<!-- Fallback content -->
	{#if route.icon}
		<route.icon class="me-3 size-5 opacity-50" aria-hidden="true" />
	{/if}
	{route.title}
{/if}
