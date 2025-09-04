<script lang="ts">
	import type { DefProps } from '$lib/utils';
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import * as icons from '@lucide/svelte';

	import Textarea from './Textarea.svelte';

	type Props = DefProps & {
		value: string;
		label: string;
		input?: HTMLTextareaAttributes;
	};

	let { value = $bindable(), ...props }: Props = $props();

	// Update the icon when the value changes
	const selected = $derived({ icon: (icons as any)[value] });
</script>

{#snippet pre()}
	{#if selected.icon}
		<selected.icon class="aspect-square size-full rounded-e-lg p-1.5 text-gray-600 dark:text-gray-50" />
	{/if}
{/snippet}

<Textarea bind:value {pre} {...props} />
