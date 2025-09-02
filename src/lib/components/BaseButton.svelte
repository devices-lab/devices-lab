<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	export type ButtonTheme = 'primary' | 'secondary' | 'link-primary' | 'link-secondary';

	interface Props {
		children: Snippet;
		theme?: ButtonTheme;
		class?: ClassValue;
		[key: string]: any;
	}

	const { children, theme = 'primary', class: className = '', ...props }: Props = $props();

	const buttonTheme: ClassValue = $derived.by(() => {
		switch (theme) {
			case 'primary':
				return 'bg-primary-600 hover:bg-primary-500 dark:bg-primary-600 dark:hover:bg-primary-400 dark:focus-visible:outline-primary-500 text-white shadow-xs';
			case 'secondary':
				return 'bg-secondary-500 hover:bg-secondary-400 dark:bg-secondary-500 dark:hover:bg-secondary-400 dark:focus-visible:outline-secondary-500 text-white shadow-xs';
			case 'link-primary':
				return 'bg-transparent text-primary-600 hover:bg-primary-100 dark:hover:bg-primary-700 dark:text-primary-100';
			case 'link-secondary':
				return 'bg-transparent text-secondary-600 hover:bg-secondary-100 dark:hover:bg-secondary-600 dark:text-secondary-100';
		}
	});
</script>

<button
	type="button"
	class={`cursor-pointer
		rounded-full
		px-3
		py-1.5
		font-semibold
		focus-visible:outline-2
		focus-visible:outline-offset-2
		dark:shadow-none
		${buttonTheme}
		${className}
	`}
	{...props}
>
	{@render children?.()}
</button>
