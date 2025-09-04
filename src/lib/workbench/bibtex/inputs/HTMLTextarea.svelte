<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	interface Props extends HTMLTextareaAttributes {
		value: string;
		pre?: Snippet;
		post?: Snippet;
	}

	let { value = $bindable(), pre, post, ...props }: Props = $props();

	// Auto resize the text area
	let div: HTMLDivElement = $state() as HTMLDivElement;
	$effect(() => {
		div.dataset.clonedVal = value;
	});
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
		after:py-1.5
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
	<textarea {...props} bind:value class="w-full appearance-none px-3.5 py-1.5 {props.class} {pre ? 'pl-20' : ''} {post ? 'pr-20' : ''}" rows="1"></textarea>

	{#if pre}
		<div class="absolute left-0 flex h-full w-15 items-center border-e-1 border-gray-300 p-0.5 pe-0 text-gray-700 dark:border-gray-600">
			{@render pre()}
		</div>
	{/if}

	{#if post}
		<div class="absolute right-0 flex h-full w-15 items-center border-s-1 border-gray-300 p-0.5 ps-0 text-gray-700 dark:border-gray-600">
			{@render post()}
		</div>
	{/if}
</div>
