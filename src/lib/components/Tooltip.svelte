<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { tooltip } from '$lib/utils/tooltip';
	import type { DefProps } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';

	type Props = DefProps & {
		children: Snippet;
		content: string;
		params?: Record<string, any>;
	};

	const { children, content, params, ...props }: Props = $props();

	const defaultParams = { animation: 'fade', interactive: true, allowHTML: true, ignoreAttributes: true, appendTo: () => document.body, maxWidth: 260 };
</script>

<div {...props} class={cn("group/tooltip relative z-1000 inline-flex", props.class)} use:tooltip={{ ...defaultParams, content, ...params }}>
	{@render children()}
</div>
