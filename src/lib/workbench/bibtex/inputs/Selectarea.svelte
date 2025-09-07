
<!--
<InputWrapper {inputId} {label} {...props}>
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
</InputWrapper>
-->

<script lang="ts">
	import InputContainer, { type InputContainerProps } from '$lib/components/inputs/InputContainer.svelte';
	import type { DefProps } from '$lib/utils';
	import HtmlSelect from '$lib/workbench/bibtex/inputs/HTMLSelect.svelte';

	type Props = DefProps & InputContainerProps & {
		items: { value: string; label: string }[];
	};

	let { value = $bindable(), items, ...props }: Props = $props();
</script>


<InputContainer {...props} bind:value input="select" inputProps={{options: items}} />
