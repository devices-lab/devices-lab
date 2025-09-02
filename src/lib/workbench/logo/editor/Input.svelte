<script lang="ts">
	import InputLabel, { type Label } from '$lib/workbench/logo/editor/InputLabel.svelte';
	import type { Snippet } from 'svelte';
	import Reset from './Reset.svelte';

	let { label, initial, children, onreset }: { label: Label; initial: number | string; children: Snippet; onreset?: () => void } = $props();
</script>

<div class="shadow-smp relative flex flex-col rounded-lg border-0 shadow-sm outline outline-slate-200 bg-slate-50 p-2 dark:outline-white/10 dark:bg-gray-800/50 dark:shadow-none">
	<InputLabel {label} {initial} />

	<div class="flex w-full items-center justify-between gap-3 rounded-lg">
		{@render children?.()}
	</div>

	{#if onreset}
		<div class="absolute end-0 top-0 m-1">
			<Reset onclick={onreset} />
		</div>
	{/if}
</div>
