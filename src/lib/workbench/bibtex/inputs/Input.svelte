<script lang="ts">
	import type { DefProps } from '$lib/utils';
	import type { HTMLInputAttributes } from 'svelte/elements';

	import HtmlInput from "./HTMLInput.svelte";

	type Props = DefProps & {
		value: string;
		label: string;
		input?: HTMLInputAttributes;
	};

	let { value = $bindable(), label, input, ...props }: Props = $props();
	const uid = $props.id();
</script>

<div {...props}>
	<label for={`input-${uid}`} class="mb-2 block text-sm/6 font-medium text-gray-900 dark:text-white">{label}</label>
	<HtmlInput {...input} bind:value id={`input-${uid}`} />
</div>
