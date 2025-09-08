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
	const tooltipClass = $derived(cn("group/tooltip relative z-1000", props.class));
</script>

<div {...props} class={tooltipClass} use:tooltip={{ ...defaultParams, content, ...params }}>
	{@render children()}
</div>
