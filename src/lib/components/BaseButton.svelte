<script lang="ts">
	import type { DefProps } from '$lib/utils';
	import type { Snippet } from 'svelte';

	type Props = DefProps & {
		children: Snippet;
	};

	const { children, ...props }: Props = $props();
</script>

<button {...props} type="button" class="cursor-pointer rounded-full px-3 py-1.5 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 dark:shadow-none {props.class}">
	{@render children?.()}
</button>
