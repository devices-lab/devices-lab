<script lang="ts">
	import type { DefProps } from '$lib/utils';
	import type { Snippet } from 'svelte';

	type ButtonTheme = 'primary' | 'secondary' | 'link-primary' | 'link-secondary' | 'danger' | 'link-danger' | undefined;

	type Props = DefProps & {
		children: Snippet;
		theme?: ButtonTheme;
	};

	const { children, theme, ...props }: Props = $props();

	const buttonTheme: string = $derived.by(() => {
		if (!theme) return '';
		switch (theme) {
			case 'primary':
				return 'bg-primary-600 hover:bg-primary-500 dark:bg-primary-600 dark:hover:bg-primary-400 dark:focus-visible:outline-primary-500 text-white shadow-xs';
			case 'secondary':
				return 'bg-secondary-500 hover:bg-secondary-400 dark:bg-secondary-500 dark:hover:bg-secondary-400 dark:focus-visible:outline-secondary-500 text-white shadow-xs';
			case 'link-primary':
				return 'bg-transparent text-primary-600 hover:bg-primary-100 dark:hover:bg-primary-700 dark:text-primary-100';
			case 'link-secondary':
				return 'bg-transparent text-secondary-600 hover:bg-secondary-100 dark:hover:bg-secondary-600 dark:text-secondary-100';
			case 'danger':
				return 'bg-red-600 hover:bg-red-500 dark:bg-red-600 dark:hover:bg-red-400 dark:focus-visible:outline-red-500 text-white shadow-xs';
			case 'link-danger':
				return 'bg-transparent text-red-600 hover:bg-red-100 dark:hover:bg-red-700 dark:text-red-100';
		}
	});
</script>

<button {...props} type="button" class="cursor-pointer rounded-full px-3 py-1.5 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 dark:shadow-none {buttonTheme} {props.class}">
	{@render children?.()}
</button>
