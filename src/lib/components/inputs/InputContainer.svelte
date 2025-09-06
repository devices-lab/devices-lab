<script lang="ts">
	import type { DefProps } from '$lib/utils';
	import type { Component, Snippet } from 'svelte';

	// Props for the input container
	export type InputContainerProps = {
		value: string;
		// Properties for the input element
		inputProps?: Record<string, any>;
		// Labels
		label?: string;
		sublabel?: string;
		// Side elements
		pre?: Snippet;
		post?: Snippet;
		// Input validation
		validate?: (value: string) => boolean;
		// Additional props for the wrapping element
		[key: string]: any;
	};

	type Props = DefProps &
		InputContainerProps & {
			input: Component | 'textarea' | 'input' | 'select';
		};

	// Input data
	let { value = $bindable(), input, inputProps, label, sublabel, pre, post, validate, ...props }: Props = $props();

	const validInput = $derived(validate && validate(value));

	// Style for the input element
	const inputStyle = $derived(`
		px-5.5
		pt-3.5
		pb-2.5
		sm:text-sm/6
		block
		w-full
		rounded-md
		bg-white
		text-gray-900
		wrap-anywhere
		outline-1
		-outline-offset-1
		outline-gray-300
		placeholder:text-gray-400
		focus:outline-2
		focus:-outline-offset-2
		focus:outline-primary-500
		disabled:cursor-not-allowed
		disabled:bg-gray-50
		disabled:text-gray-500
		disabled:outline-gray-200
		dark:bg-white/5
		dark:text-gray-300
		dark:outline-white/10
		dark:placeholder:text-gray-500
		dark:focus:outline-primary-500
		dark:disabled:bg-white/10
		dark:disabled:text-gray-500
		dark:disabled:outline-white/5
		${pre ? 'pl-20' : ''}
		${post ? 'pr-20' : ''}
		${validInput ? '' : 'outline-red-400'}
	`);

	// Style for the wrapper element for the input
	const wrapperStyle = $derived(`
		overflow-hidden
		after:px-5.5
		after:pt-3.5
		after:pb-2.5
		text-sm/6
		relative
		grid
		after:invisible
		after:border
		after:whitespace-pre-wrap
		after:text-inherit
		after:content-[attr(data-cloned-val)_'_']
		after:[grid-area:1/1/2/2]
		[&>*]:resize-none
		[&>*]:overflow-hidden
		[&>*]:text-inherit
		[&>*]:[grid-area:1/1/2/2]
	`);

	const labelStyle = $derived(`
		absolute
		top-0
		group-has-focus/item:text-primary-500
		group-has-focus/item:font-medium
		left-1.5
		rounded-md
		z-10
		-translate-y-1/2
		bg-white
		px-2
		py-0.5
		text-xs
		font-light
		tracking-wide
		uppercase
		dark:bg-gray-800
		${validInput ? 'text-gray-900/60 dark:text-white' : 'text-red-600/40 dark:text-red-600/40 font-semibold'}
	`);

	const uid = $props.id();
	const inputId = $derived(`input-${uid}`);
	const inputElement = $derived({ el: input });

	// Auto resize the text area
	let div: HTMLDivElement = $state() as HTMLDivElement;
	$effect(() => {
		if (inputElement.el === 'textarea') div.dataset.clonedVal = value;
	});
</script>

{#snippet sideContainer(content: Snippet | undefined, className: string)}
	{#if content}
		<div class="absolute flex h-full w-15 items-center border-gray-300 p-0.5 text-gray-700 dark:border-gray-600 {className}">
			{@render content()}
		</div>
	{/if}
{/snippet}

<div {...props} class="w-full pt-[20px] {sublabel ? '' : 'pb-[20px]'} {props.class}">
	<div class="group/item relative flex flex-1 flex-col">
		<!-- Label on the top -->
		<label for={inputId} class={labelStyle}>
			{label}
		</label>

		<!-- Input wrapper -->
		<div bind:this={div} class={wrapperStyle}>
			<!-- Input element -->
			{#if inputElement.el === 'textarea'}
				<!-- Textarea input -->
				<textarea bind:value rows={1} placeholder={label?.toLocaleLowerCase()} {...inputProps} id={inputId} class={inputStyle}></textarea>
			{:else if inputElement.el === 'input'}
				<!-- Input element -->
				<input bind:value placeholder={label?.toLocaleLowerCase()} {...inputProps} id={inputId} class={inputStyle} />
			{:else if inputElement.el === 'select'}
				<!-- Select element -->
				<select bind:value placeholder={label?.toLocaleLowerCase()} {...inputProps} id={inputId} class={inputStyle}>
					{#each inputProps?.options as option}
						<option value={option.value}>{option.label}</option>
					{/each}
				</select>
			{:else}
				<!-- Custom input -->
				<inputElement.el bind:value placeholder={label?.toLocaleLowerCase()} {...inputProps} id={inputId} class={inputStyle} />
			{/if}

			<!-- Side elements -->
			{@render sideContainer(pre, 'left-0 border-e-1 pe-0')}
			{@render sideContainer(post, 'right-0 border-s-1 ps-0')}
		</div>

		<!-- Sublabel on the bottom -->
		<div class=" ms-3.5 text-start text-xs/5 font-normal text-gray-900/40 dark:text-gray-400">{sublabel}</div>
	</div>
</div>
