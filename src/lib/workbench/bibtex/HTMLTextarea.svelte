<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	let { value = $bindable(), ...props }: HTMLTextareaAttributes = $props();

	// Auto resize the text area
	let div: HTMLDivElement = $state() as HTMLDivElement;
	$effect(() => {
		div.dataset.clonedVal = String(value ?? '');
	});
</script>

<div
	bind:this={div}
	class="
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
	<textarea {...props} bind:value class="w-full appearance-none px-3.5 py-2.5 {props.class}" rows=1></textarea>
</div>
