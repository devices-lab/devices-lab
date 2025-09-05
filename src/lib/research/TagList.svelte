<script lang="ts">
	import type { Tag } from '$lib/data/research';
	import { type DefProps } from '$lib/utils';

	type Props = DefProps & {
		tags: Tag[];
	};

	const { tags, ...props }: Props = $props();
</script>

{#if tags.length}
	<ul {...props} class="flex flex-wrap gap-1 {props.class}" role="">
		{#each tags as tag}
			<li class="rounded-full bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 text-[11px] text-gray-600 dark:text-gray-300">{tag.name}</li>
		{/each}
	</ul>
{/if}
