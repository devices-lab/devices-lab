<script lang="ts">
	import { getIcon, type DefProps } from '$lib/utils';
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	

	import Textarea from './Textarea.svelte';

	type Props = DefProps & {
		value: string;
		label: string;
		input?: HTMLTextareaAttributes;
	};

	let { value = $bindable(), ...props }: Props = $props();

	// Update the icon when the value changes
	const selected = $derived({icon: getIcon(value)});
</script>

{#snippet post()}
	{#if selected.icon}
		<selected.icon class="aspect-square size-full rounded-e-lg p-1.5 text-gray-600 dark:text-gray-50" />
	{/if}
{/snippet}

<Textarea bind:value {post} {...props} />
