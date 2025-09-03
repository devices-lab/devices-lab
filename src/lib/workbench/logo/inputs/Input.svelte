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

<!--
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
-->

<div class="shadow-smp relative flex w-full items-center justify-between gap-3 rounded-lg border-0 bg-white outline-slate-200 dark:bg-gray-800/50 dark:shadow-none dark:outline-white/10">
	<div class="w-2/5 xl:w-1/3">
		<InputLabel {label} {initial}>
			<div class="flex items-center text-gray-500 dark:text-gray-300">
				<span class="font-normal italic"> ({initial}) </span>
			</div>
		</InputLabel>
	</div>
	<div class="mt-1 flex flex-1 items-center justify-between gap-3 rounded-lg">
		{@render children?.()}
	</div>

	{#if onreset}
		<div class="flex items-center text-gray-400 dark:text-gray-300">
			<Reset onclick={onreset} />
		</div>
	{/if}
</div>
