<script lang="ts">
	import type { DefProps } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import type { HTMLSelectAttributes } from 'svelte/elements';

	import HtmlSelect from './HTMLSelect.svelte';

	type Props = DefProps & {
		value: string;
		items: {key: string, title: string}[];
		label?: string;
		input?: HTMLSelectAttributes;
	};

	let { value = $bindable(), items, label = '', input, ...props }: Props = $props();
	const uid = $props.id();
	const inputId = $derived(`input-${uid}`);
</script>

<div {...props}>
	<label for={inputId} class="block text-sm/6 font-medium text-gray-900 dark:text-white">{label}</label>
	<HtmlSelect
		{...input}
		id={inputId}
		bind:value
		{items}
		name={label}
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
			sm:text-sm/6.5
			dark:bg-white/5
			dark:text-white
			dark:outline-1
			dark:-outline-offset-1
			dark:outline-gray-600
			dark:placeholder:text-gray-500
			dark:focus:outline-primary-500"
	/>
</div>
