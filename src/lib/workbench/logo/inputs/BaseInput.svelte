<script lang="ts">
	import type { ClassValue } from 'svelte/elements';

	interface Props {
		value?: string | number;
		class?: ClassValue;
		[key: string]: any;
	}

	let { value = $bindable(), class: className = '', ...props }: Props = $props();
</script>

<input
	bind:value
	name="base-input"
	class={`not-disabled:cursor-initial
		block
		rounded-md
		bg-white
		text-base
		text-gray-900
		outline-1
		-outline-offset-1
		outline-gray-300
		placeholder:text-gray-400
		focus:outline-2
		focus:-outline-offset-2
		focus:outline-primary
		disabled:border-gray-50
		disabled:bg-gray-50
		disabled:text-gray-500
		disabled:opacity-45
		disabled:shadow-none
		sm:text-sm/6
		dark:bg-white/5
		dark:text-white
		dark:outline-white/10
		dark:placeholder:text-gray-500
		dark:focus:outline-primary
		dark:disabled:border-gray-700
		dark:disabled:bg-gray-800/20
		${className}
	`}
	{...props}
/>
