<script lang="ts">
	import type { DefProps } from '$lib/utils';
	import type { Snippet } from 'svelte';

	export type Color = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950';

	type Props = DefProps & {
		children: Snippet;
		color?: Color;
	};

	const { children, color, ...props }: Props = $props();

	const textClass = $derived.by(() => {
		switch (color) {
			case '50':
				return 'text-gray-50 dark:text-gray-950';
			case '100':
				return 'text-gray-100 dark:text-gray-900';
			case '200':
				return 'text-gray-200 dark:text-gray-800';
			case '300':
				return 'text-gray-300 dark:text-gray-700';
			case '400':
				return 'text-gray-400 dark:text-gray-400';
			case '500':
				return 'text-gray-500 dark:text-gray-500';
			case '600':
				return 'text-gray-600 dark:text-gray-400';
			case '700':
				return 'text-gray-700 dark:text-gray-300';
			case '800':
				return 'text-gray-800 dark:text-gray-200';
			case '900':
				return 'text-gray-900 dark:text-gray-100';
			case '950':
				return 'text-gray-950 dark:text-gray-50';
		}
	});
</script>

<div {...props} class="{textClass} {props.class}">
	{@render children()}
</div>
