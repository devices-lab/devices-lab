<script lang="ts">
	import type { DefProps } from '$lib/utils';
	import type { Snippet } from 'svelte';

	type Props = DefProps & {
		children: Snippet;
	};

	const { children, ...props }: Props = $props();
</script>

<div {...props} class="grid grid-cols-1 md:gap-x-6 gap-y-3 md:grid-cols-12 {props.class}">
	{@render children()}
</div>
