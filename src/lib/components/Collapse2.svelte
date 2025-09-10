<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import BaseButton from '$lib/components/interactive/BaseButton.svelte';
	import type { DefProps } from '$lib/utils/utils';
	import { ChevronDown, ChevronUp } from '@lucide/svelte';
	import type { Snippet } from 'svelte';

	type Props = DefProps & {
		children: Snippet;
		label: string | Snippet;
	};

	const { children, label, ...props }: Props = $props();
	const uid = $props.id();
</script>

{#snippet defaultLabel(label: string)}
	<span class="text-xs font-semibold not-in-aria-expanded:text-gray-700 in-aria-expanded:text-primary-600 dark:not-in-aria-expanded:text-gray-300 dark:in-aria-expanded:text-primary-400">{label}</span>
	<span class="ml-1 flex cursor-pointer items-center">
		<ChevronDown class="size-5 text-gray-400 group-hover/collapse:text-gray-500 in-aria-expanded:hidden" />
		<ChevronUp class="size-5 text-primary-400 not-in-aria-expanded:hidden group-hover/collapse:text-primary-800" />
	</span>
{/snippet}

<ClassBox {props}>
	<BaseButton command="--toggle" commandfor={uid} class="group/collapse link-sky flex items-center">
		{#if typeof label === 'string'}
			{@render defaultLabel(label)}
		{:else}
			{@render label()}
		{/if}
	</BaseButton>

	<el-disclosure hidden id={uid} class="contents">
		{@render children()}
	</el-disclosure>
</ClassBox>
