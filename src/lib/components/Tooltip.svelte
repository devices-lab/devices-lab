<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import { tooltip } from '$lib/tooltip';
	import type { DefProps } from '$lib/utils';
	import type { Snippet } from 'svelte';

	type Props = DefProps & {
		children: Snippet;
		content: string;
		params?: Record<string, any>;
	};

	const { children, content, params, ...props }: Props = $props();

	const defaultParams = { animation: 'fade', interactive: true, allowHTML: true, ignoreAttributes: true, appendTo: () => document.body, maxWidth: 260 };
</script>

<div {...props} class="group/tooltip relative {props.class}" use:tooltip={{ ...defaultParams, content, ...params }}>
	{@render children()}
	<!--
	<div class="absolute left-1/2 mt-1 hidden -translate-x-1/2 group-hover/tooltip:inline-flex">
		<div class="rounded-md bg-amber-200 p-2 text-gray-800 shadow-lg dark:bg-gray-800 dark:text-gray-200">
			{#if typeof tooltipContent === 'string'}
				{tooltipContent}
			{:else}
				{@render tooltipContent()}
			{/if}
		</div>
	</div>
	-->
</div>
