<script lang="ts">
	import type { DefProps } from '$lib/utils';
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	import HTMLTextarea from './HTMLTextarea.svelte';

	type Props = DefProps & {
		value: string;
		label: string;
		sublabel?: string;
		input?: HTMLTextareaAttributes;
	};

	let { value = $bindable(), label, sublabel, input, ...props }: Props = $props();
	const uid = $props.id();
	const inputId = $derived(`input-${uid}`);
</script>

<div {...props}>
	<label for={inputId} class="block text-sm/6 font-medium text-gray-900 dark:text-white">{label}</label>
	<HTMLTextarea {...input} id={inputId} bind:value name={label} class="wrap-anywhere rounded-md bg-white text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-1 dark:-outline-offset-1 dark:outline-gray-600 dark:placeholder:text-gray-500 dark:focus:outline-primary-500 {input?.class}" />

	{#if sublabel}
		<p class="mt-3 text-sm/6 text-gray-600 dark:text-gray-400">{sublabel}</p>
	{/if}
</div>
