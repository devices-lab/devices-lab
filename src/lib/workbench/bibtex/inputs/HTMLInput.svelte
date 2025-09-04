<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	let { value = $bindable(), ...props }: HTMLInputAttributes = $props();
</script>

<div class="flex items-center rounded-lg bg-white px-2 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary-500 dark:bg-white/5 dark:outline-1 dark:-outline-offset-1 dark:outline-gray-600 dark:focus-within:outline-primary-500">
	<input bind:value {...props} class="block grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 dark:bg-transparent dark:text-white dark:placeholder:text-gray-500 {props.class}" />
</div>
