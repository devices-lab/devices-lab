<script lang="ts">
	import type { DefProps } from '$lib/utils';
	import * as icons from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	import HtmlTextarea from './HTMLTextarea.svelte';

	type Props = DefProps & {
		value: string;
		label?: string;
		pre?: Snippet;
		post?: Snippet;
		input?: HTMLTextareaAttributes;
	};

	let { value = $bindable(), label = '', pre, post, input, ...props }: Props = $props();
	const uid = $props.id();
	const inputId = $derived(`input-${uid}`);

	// Update the icon when the value changes
	const selected = $derived({ icon: (icons as any)[value] });
</script>

<div {...props}>
	<label for={inputId} class="block text-sm/6 font-medium text-gray-900 dark:text-white">{label}</label>
	<HtmlTextarea
		{...input}
		id={inputId}
		bind:value
		name={label}
		{pre}
		{post}
		class="rounded-md
			bg-white
			wrap-anywhere
			text-gray-900
			outline-1
			-outline-offset-1
			outline-gray-300
			placeholder:text-gray-400
			focus:outline-2
			focus:-outline-offset-2
			focus:outline-primary-500
			sm:text-sm/6
			dark:bg-white/5
			dark:text-white
			dark:outline-1
			dark:-outline-offset-1
			dark:outline-gray-600
			dark:placeholder:text-gray-500
			dark:focus:outline-primary-500"
	/>
</div>
