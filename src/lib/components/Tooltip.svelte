<script lang="ts">
	import { tooltip } from '$lib/tooltip';
	import type { DefProps } from '$lib/utils';
	import type { Snippet } from 'svelte';

	type Props = DefProps & {
		children: Snippet;
		content: string;
		params?: Record<string, any>;
	};

	const { children, content, params, ...props }: Props = $props();
</script>

<div {...props} class="group/tooltip relative {props.class}" use:tooltip={{ content, ...params }}>
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
