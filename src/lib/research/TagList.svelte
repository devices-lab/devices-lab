<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import type { Tag } from '$lib/data/data';
	import type { ClassProp } from '$lib/utils/utils';

	type Props = ClassProp & {
		tags: Tag[];
	};

	const { tags, ...props }: Props = $props();
</script>

{#if tags.length}
	<ClassBox {props} tag="ul" class="flex flex-wrap gap-1" role="">
		{#each tags as tag}
			<li class="rounded-full bg-gray-100 px-1.5 py-0.5 text-[11px] text-gray-600 dark:bg-gray-900 dark:text-gray-300">{tag.name}</li>
		{/each}
	</ClassBox>
{/if}
