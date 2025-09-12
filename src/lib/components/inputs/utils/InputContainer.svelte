<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import IconText from '$lib/components/base/IconText.svelte';
	import TextItem from '$lib/components/base/BaseText.svelte';
	import Select from '$lib/components/inputs/utils/Select.svelte';
	import SelectType from '$lib/components/inputs/utils/SelectType.svelte';
	import type { ClassProp, DefProps } from '$lib/utils/utils';
	import { CircleQuestionMarkIcon } from '@lucide/svelte';
	import type { Component, Snippet } from 'svelte';
	import { cn } from '$lib/utils/cn';

	// Props for the input container
	export type InputContainerProps = DefProps & {
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
	};

	type Props = ClassProp &
		InputContainerProps & {
			input: Component | 'textarea' | 'input' | 'select' | 'select2' | 'selectType';
		};

	// Input data
	let { value = $bindable(), input, inputProps, label, sublabel, pre, post, validate, ...props }: Props = $props();

	const validInput = $derived(!validate || validate(value));

	// Style for the input element
	const inputStyle = $derived(`
		px-5.5
		pt-3.5
		pb-2.5
		min-h-[50px]
		sm:text-sm/6
		flex
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
		group-has-focus/item:outline-primary
		disabled:cursor-not-allowed
		disabled:bg-gray-50
		disabled:text-gray-500
		disabled:outline-gray-200
		dark:bg-white/5
		dark:text-gray-300
		dark:outline-white/10
		dark:placeholder:text-gray-500
		dark:group-has-focus/item:outline-primary
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
		group-has-focus/item:text-primary
		group-has-focus/item:font-medium
		rounded-md
		-translate-y-1/2
		bg-white
		px-2
		py-0.5
		text-xs
		font-medium
		dark:bg-gray-800
		${validInput ? 'text-gray-900/60 dark:text-white' : 'text-red-600/60 dark:text-red-600/40'}
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

<ClassBox {props} class="w-full py-[10px]">
	<div class="group/item relative flex flex-1 flex-col">
		<!-- Input wrapper -->
		<div bind:this={div} class={wrapperStyle}>
			<!-- Input element -->
			{#if inputElement.el === 'textarea'}
				<!-- Textarea input -->
				<textarea bind:value rows={1} placeholder={label?.toLocaleLowerCase()} {...inputProps} id={inputId} class={cn(inputStyle, inputProps?.class)}></textarea>
			{:else if inputElement.el === 'input'}
				<!-- Input element -->
				<input bind:value placeholder={label?.toLocaleLowerCase()} {...inputProps} id={inputId} class={cn(inputStyle, inputProps?.class)} />
			{:else if inputElement.el === 'select'}
				<!-- Select element -->
				<select bind:value placeholder={label?.toLocaleLowerCase()} {...inputProps} id={inputId} class={cn(inputStyle, inputProps?.class)}>
					{#each inputProps?.options as option}
						<option value={option.value}>
							{option.label} [{option.value}]
						</option>
					{/each}
				</select>
			{:else if inputElement.el === 'select2'}
				<!-- Select2 element -->
				<Select bind:value items={[]} placeholder={label?.toLocaleLowerCase()} {...inputProps} id={inputId} class={cn(inputStyle, inputProps?.class)} />
			{:else if inputElement.el === 'selectType'}
				<!-- SelectType element -->
				<SelectType bind:value items={[]} placeholder={label?.toLocaleLowerCase()} {...inputProps} id={inputId} class={cn(inputStyle, inputProps?.class)} />
			{:else}
				<!-- Custom input -->
				<inputElement.el bind:value placeholder={label?.toLocaleLowerCase()} {...inputProps} id={inputId} class={cn(inputStyle, inputProps?.class)} />
			{/if}

			<!-- Side elements -->
			{@render sideContainer(pre, 'left-0 border-e-1 pe-0')}
			{@render sideContainer(post, 'right-0 border-s-1 ps-0')}
		</div>

		<!-- Label on the top -->
		{#if label}
			<div class={labelStyle}>
				{#if sublabel}
					<IconText text={{ text: label, class: 'tracking-wide uppercase' }} icon={{ icon: CircleQuestionMarkIcon, class: 'size-4 opacity-50' }} position="iconLast" tooltip={{ content: sublabel }} />
				{:else}
					<TextItem text={label} class="tracking-wide uppercase" />
				{/if}
			</div>
		{/if}
	</div>
</ClassBox>
