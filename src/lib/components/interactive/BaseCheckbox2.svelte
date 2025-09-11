<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import type { DefProps } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';

	export type CheckboxTheme = 'primary' | 'secondary';
	
	type Props = DefProps & {
		children?: Snippet;
		label?: string;
		checked: boolean;
		theme?: CheckboxTheme;
	};

	let { children, label, checked = $bindable(), theme = 'primary', ...props }: Props = $props();
	const uid = $props.id();

	const checkboxTheme: string = $derived.by(() => {
		switch (theme) {
			case 'primary':
				return `
					checked:border-primary-600
					checked:bg-primary-600
					indeterminate:border-primary-600
					indeterminate:bg-primary-600
					focus-visible:outline-primary-600
					dark:checked:border-primary-500
					dark:checked:bg-primary-500
					dark:indeterminate:border-primary-500
					dark:indeterminate:bg-primary-500
					dark:focus-visible:outline-primary-500
				`;
			case 'secondary':
				return `
					checked:border-secondary-600
					checked:bg-secondary-600
					indeterminate:border-secondary-600
					indeterminate:bg-secondary-600
					focus-visible:outline-secondary-600
					dark:checked:border-secondary-500
					dark:checked:bg-secondary-500
					dark:indeterminate:border-secondary-500
					dark:indeterminate:bg-secondary-500
					dark:focus-visible:outline-secondary-500
				`;
		}
	});

	const checkboxLabelTheme: string = $derived.by(() => {
		switch (theme) {
			case 'primary':
				return 'text-primary-500 group-has-checked:text-primary-600 dark:text-primary-100 dark:group-has-checked:text-primary-500';
			case 'secondary':
				return 'text-secondary-500 dark:text-secondary-100 group-has-checked:text-secondary-500';
		}
	});
</script>

<ClassBox {props} class="group flex items-center gap-2">
	<div class="grid size-4 grid-cols-1">
		<input
			id={uid}
			type="checkbox"
			bind:checked
			class="
				col-start-1
				row-start-1
				cursor-pointer
				appearance-none
				rounded-sm
				border
				border-gray-300
				bg-white
				focus-visible:outline-2
				focus-visible:outline-offset-2
				disabled:border-gray-300
				disabled:bg-gray-100
				disabled:checked:bg-gray-100
				dark:border-white/10
				dark:bg-white/5
				dark:disabled:border-white/5
				dark:disabled:bg-white/10
				dark:disabled:checked:bg-white/10
				forced-colors:appearance-auto
				{checkboxTheme}"
		/>

		<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25 dark:group-has-disabled:stroke-white/25">
			<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
			<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
		</svg>
	</div>

	<label for={uid} class="cursor-pointer {checkboxLabelTheme}">
		{#if children}
			{@render children()}
		{:else}
			{label}
		{/if}
	</label>
</ClassBox>
