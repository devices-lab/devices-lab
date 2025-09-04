<script lang="ts">
	import type { DefProps } from '$lib/utils';
	import type { Snippet } from 'svelte';

	type Props = DefProps & {
		children: Snippet;
	};

	const { children, ...props }: Props = $props();
</script>

<div {...props} class="flex gap-x-2 flex-col sm:flex-row {props.class}">
	{@render children()}
</div>
