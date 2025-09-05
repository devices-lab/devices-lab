<script lang="ts">
	import type { Link } from '$lib/data/research';
	import { getIcon, type DefProps } from '$lib/utils';
	import BaseLink from '$lib/components/BaseLink.svelte';
	import IconLink from '$lib/components/IconLink.svelte';

	type Props = DefProps & {
		links: Link[];
	};

	const { links, ...props }: Props = $props();
</script>

{#if links.length}
	<div {...props} class="flex items-center justify-center gap-x-8 {props.class}">
		{#each links as link}
			<IconLink {...link} class="text-sm text-blue-500 underline-offset-2 hover:text-gray-600 hover:underline dark:text-blue-400 hover:dark:text-gray-300  " aria-label={link.title} target="_blank" rel="noopener noreferrer" />
		{/each}
	</div>
{/if}
