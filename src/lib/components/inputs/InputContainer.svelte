<script lang="ts">
	import type { DefProps } from '$lib/utils';
	import type { Component, Snippet } from 'svelte';
	import Tooltip from '../Tooltip.svelte';
	import { CircleQuestionMarkIcon } from '@lucide/svelte';
	import IconLink from '../icons/IconLink.svelte';
	import IconButton from '../icons/IconButton.svelte';
	import IconItem from '../icons/IconItem.svelte';
	import IconText from '../icons/IconText.svelte';

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

	const validInput = $derived(!validate || validate(value));

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
		placeholder:text-gray-500/50
		group-has-focus/item:outline-2
		group-has-focus/item:-outline-offset-2
		group-has-focus/item:outline-primary-500
		disabled:cursor-not-allowed
		disabled:bg-gray-50
		disabled:text-gray-500
		disabled:outline-gray-200
		dark:bg-white/5
		dark:text-gray-300
		dark:outline-white/10
		dark:placeholder:text-gray-500
		dark:group-has-focus/item:outline-primary-500
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
		flex
		gap-2
		absolute top-0 left-1.5 -translate-y-1/2
		group-has-focus/item:text-primary-500
		group-has-focus/item:font-medium
		rounded-md
		-translate-y-1/2
		bg-white
		px-2
		py-0.5
		text-xs
		font-medium
		dark:bg-gray-800
		${validInput ? 'text-gray-900/60 dark:text-white' : 'text-red-600/40 dark:text-red-600/40 font-semibold'}
	`);

	const sublabelStyle = $derived(`
		absolute
		top-full
		left-1.5
		px-2
		text-start
		text-xs/5
		font-normal
		text-gray-900/40
		dark:text-gray-400
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

<div {...props} class="w-full py-[10px] {props.class}">
	<div class="group/item relative flex flex-1 flex-col">
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
						<option value={option.value}>
							{option.label} [{option.value}]
						</option>
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

		<!-- Label on the top -->
		{#if label}
			<div class={labelStyle}>
				<span class="tracking-wide uppercase">{label}</span>
				{#if sublabel}
					<Tooltip content={sublabel} params={{ animation: 'fade', interactive: true, ignoreAttributes: true, appendTo: () => document.body, maxWidth: 260 }}>
						<IconItem icon={CircleQuestionMarkIcon} class="size-4 opacity-50" />
					</Tooltip>
				{/if}
			</div>

			<!--
			<Tooltip class="absolute top-0 left-1.5">
				{#snippet tooltip()}
					<span>{sublabel}</span>
				{/snippet}
				<label for={inputId} class={labelStyle}>
					{label}
					{#if sublabel}
						<CircleQuestionMarkIcon class="ml-1 h-4 w-4" />
					{/if}
				</label>
			</Tooltip>-->
		{/if}

		<!-- Sublabel on the bottom -->
		{#if false}
			<div class={sublabelStyle}>
				{sublabel}
			</div>
		{/if}
	</div>
</div>
