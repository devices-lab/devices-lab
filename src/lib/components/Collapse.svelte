<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import type { DefProps } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';

	type Props = DefProps & {
		children: Snippet;
		label: string | Snippet;
	};

	const { children, label, ...props }: Props = $props();
	const uid = $props.id();
</script>

{#snippet defaultLabel(label: string)}
	<span class="text-sm font-medium not-in-aria-expanded:text-gray-900 in-aria-expanded:text-primary-600 dark:not-in-aria-expanded:text-gray-300 dark:in-aria-expanded:text-primary-400">{label}</span>
	<span class="ml-6 flex cursor-pointer items-center">
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 text-gray-400 group-hover:text-gray-500 in-aria-expanded:hidden">
			<path d="M12 4.5v15m7.5-7.5h-15" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 text-primary-400 not-in-aria-expanded:hidden group-hover:text-primary-500">
			<path d="M5 12h14" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	</span>
{/snippet}

<ClassBox {props}>
	<h3>
		<button type="button" command="--toggle" commandfor={uid} class="group relative mb-4 flex w-full cursor-pointer items-center justify-between text-left">
			{#if typeof label === 'string'}
				{@render defaultLabel(label)}
			{:else}
				{@render label()}
			{/if}
		</button>
	</h3>
	<el-disclosure id={uid} class="contents">
		{@render children()}
	</el-disclosure>
</ClassBox>
