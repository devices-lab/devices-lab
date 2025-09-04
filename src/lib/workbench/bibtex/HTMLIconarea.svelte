<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import * as icons from '@lucide/svelte';

	let { value = $bindable(), ...props }: HTMLTextareaAttributes = $props();

	// Auto resize the text area
	let div: HTMLDivElement = $state() as HTMLDivElement;
	$effect(() => {
		div.dataset.clonedVal = String(value ?? '');
	});

	// Update the icon when the value changes
	const selectedIcon = $derived({ el: (icons as any)[value as string] });
</script>

<div
	bind:this={div}
	class="
		relative
		grid
		text-sm
		after:invisible
		after:border
		after:px-3.5
		after:py-2.5
		after:whitespace-pre-wrap
		after:text-inherit
		after:content-[attr(data-cloned-val)_'_']
		after:[grid-area:1/1/2/2]
		[&>textarea]:resize-none
		[&>textarea]:overflow-hidden
		[&>textarea]:text-inherit
		[&>textarea]:[grid-area:1/1/2/2]
		{props.class}"
>
	<textarea {...props} bind:value class="w-full appearance-none px-3.5 py-2.5 pe-20 {props.class}" rows="1"></textarea>

	<div class="absolute right-0 flex h-full items-center p-0.5">
		{#if selectedIcon.el}
			<selectedIcon.el class="aspect-square h-full w-15 rounded-e-lg  border-s-1 border-gray-300 p-1 text-gray-700 dark:border-gray-600 dark:text-gray-50" />
		{/if}
	</div>
</div>
