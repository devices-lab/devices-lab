<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import type { DefProps } from '$lib/utils/utils';
	import { Minus, Plus } from '@lucide/svelte';
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
		<Plus class="size-6 text-gray-400 group-hover:text-gray-500 in-aria-expanded:hidden" />
		<Minus class="size-6 text-primary-400 not-in-aria-expanded:hidden group-hover:text-primary-500" />
	</span>
{/snippet}

<ClassBox {props}>

	<button type="button" command="--toggle" commandfor={uid} class="group relative mb-4 flex w-full cursor-pointer items-center justify-between text-left">
		{#if typeof label === 'string'}
			{@render defaultLabel(label)}
		{:else}
			{@render label()}
		{/if}
	</button>

	<el-disclosure id={uid} class="contents">
		{@render children()}
	</el-disclosure>
</ClassBox>
