<script lang="ts">
	import type { DefProps } from '$lib/utils';
	import type { Snippet } from 'svelte';

	type Props = DefProps & {
		children: Snippet;
		inputId: string;
		label?: string;
		sublabel?: string;
	};

	const { children, inputId, label, sublabel, ...props }: Props = $props();
</script>

<div {...props} class="flex flex-1 flex-col {props.class}">
	{#if label}
		<label for={inputId} class="order z-10 ms-2 -mb-2 flex w-max items-center rounded-md bg-white px-1 text-xs font-normal tracking-wide text-gray-500 uppercase dark:bg-gray-800 dark:text-white">
			{label}
		</label>
	{/if}

	{@render children()}

	{#if sublabel}
		<span class="ms-3 text-xs font-normal text-gray-400 dark:text-gray-400">{sublabel}</span>
	{/if}
</div>
