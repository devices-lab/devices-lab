<script lang="ts" generics="Item">
	import DeleteButton from '$lib/components/DeleteButton.svelte';
	import IconButton from '$lib/components/icons/IconButton.svelte';
	import type { DefProps } from '$lib/utils';
	import { Plus } from '@lucide/svelte';
	import type { Snippet } from 'svelte';

	type Props = DefProps & {
		content: Snippet<[Item]>;
		items: Item[];
		newItem: () => Item;
		gap?: 'gap-0' | 'gap-8';
		title: string;
	};

	let { content, items = $bindable(), newItem, gap = 'gap-0', title, ...props }: Props = $props();

	const add = () => {
		items = [...items, newItem()] as Item[];
	};

	const remove = (index: number) => {
		items.splice(index, 1);
		items = [...items];
	};
</script>

<div {...props} class="pt-4 {props.class}">
	<div class="my-4 flex items-center justify-between">
		<div class="font-semibold">{title}</div>
		<IconButton onclick={add} class="button-blue rounded-lg px-3 py-1 text-xs tracking-wide uppercase shadow-sm" text="Add" icon={Plus} iconClass="size-4" position="left" />
	</div>
	<div class="flex flex-1 flex-col flex-wrap {gap}">
		{#each items as item, i}
			<div class="flex flex-row">
				<div class="flex flex-1 flex-row flex-wrap gap-x-2 gap-y-1 sm:gap-x-4">
					{@render content(item)}
				</div>
				<DeleteButton onclick={() => remove(i)} class="my-auto flex-0" />
			</div>
		{:else}
			<p class="text-sm text-gray-500 dark:text-gray-400 italic mb-4">No items found</p>
		{/each}
	</div>
</div>
