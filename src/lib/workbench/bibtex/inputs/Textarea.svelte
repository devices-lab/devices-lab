<script lang="ts">
	import type { DefProps } from '$lib/utils';
	import * as icons from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	import HtmlTextarea from './HTMLTextarea.svelte';
	import InputWrapper from './InputWrapper.svelte';

	type Props = DefProps & {
		value: string;
		label?: string;
		sublabel?: string;
		pre?: Snippet;
		post?: Snippet;
		input?: HTMLTextareaAttributes;
		area?: string;
		evaluate?: (value: string) => boolean;
	};

	let { value = $bindable(), label = '', sublabel = '', pre, post, input, area, evaluate = () => true, ...props }: Props = $props();
	const uid = $props.id();
	const inputId = $derived(`input-${uid}`);
</script>

<InputWrapper {inputId} {label} {sublabel} {...props}>
	<HtmlTextarea
		{...input}
		bind:value
		id={inputId}
		name={label}
		{pre}
		{post}
		class="rounded-md
			bg-white
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
			dark:focus:outline-primary-500
			{evaluate(value) ? '' : 'outline-red-400'}"
	/>
</InputWrapper>
