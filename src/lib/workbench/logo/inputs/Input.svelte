<script lang="ts">
	import type { Snippet } from 'svelte';
	import InputLabel, { type Label } from '$lib/workbench/logo/inputs/InputLabel.svelte';
	import Reset from '$lib/workbench/logo/editor/Reset.svelte';

	type Props = {
		label: Label;
		initial: number | string;
		children: Snippet;
		onreset?: () => void;
	};

	let { label, initial, children, onreset }: Props = $props();
</script>

<div class="shadow-smp relative flex flex-col rounded-lg border-0 bg-white p-2 outline-slate-200 dark:bg-gray-800/50 dark:shadow-none dark:outline-white/10">
	<InputLabel {label} {initial}>
		<div class="flex items-center text-gray-500 dark:text-gray-300">
			<span class="me-2 font-normal italic"> ({initial}) </span>
			{#if onreset}
				<Reset onclick={onreset} />
			{/if}
		</div>
	</InputLabel>
	<div class="mt-1 flex w-full items-center justify-between gap-3 rounded-lg">
		{@render children?.()}
	</div>
</div>
