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
	class={`block
		rounded-md
		bg-white
		${props.type === 'range' ? 'px-0' : 'px-3'}
		py-1.5
		text-base
		text-gray-900
		outline-1
		-outline-offset-1
		outline-gray-300
		${props.type === 'range' ? 'not-disabled:cursor-pointer ' : 'not-disabled:cursor-initial'}
		placeholder:text-gray-400
		focus:outline-2
		focus:-outline-offset-2
		focus:outline-primary-600
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
		dark:focus:outline-primary-500
		dark:disabled:border-gray-700
		dark:disabled:bg-gray-800/20
		${className}
	`}
	{...props}
/>

