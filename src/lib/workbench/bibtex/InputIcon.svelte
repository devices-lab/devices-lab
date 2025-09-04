<script lang="ts">
	import type { DefProps } from '$lib/utils';
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	
	import type { Icon } from '@lucide/svelte';
	import Iconarea from './HTMLIconarea.svelte';

	type Props = DefProps & {
		value?: string;
		label: string;
		input?: HTMLTextareaAttributes;
	};

	let { value = $bindable(), label, input, ...props }: Props = $props();
	const uid = $props.id();
	const inputId = $derived(`input-${uid}`);
</script>

<div {...props}>
	<label for={inputId} class="block text-sm/6 font-medium text-gray-900 dark:text-white">{label}</label>
	<Iconarea {...input} id={inputId} bind:value name={label} class="flex-1 rounded-lg bg-white text-base wrap-anywhere  text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-1 dark:-outline-offset-1 dark:outline-gray-600 dark:placeholder:text-gray-500 dark:focus:outline-primary-500 {input?.class}" />
</div>
