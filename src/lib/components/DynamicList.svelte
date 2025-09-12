<script lang="ts" generics="Item">
	import IconTextButton from '$lib/components/base/IconTextButton.svelte';
	import ClassBox from '$lib/components/ClassBox.svelte';
	import DeleteButton from '$lib/components/interactive/DeleteButton.svelte';
	import NoItems from '$lib/components/NoItems.svelte';
	import type { ClassProp } from '$lib/utils/utils';
	import { Plus } from '@lucide/svelte';
	import type { Snippet } from 'svelte';

	type Props = ClassProp & {
		content: Snippet<[Item, number]>;
		items: Item[];
		newItem: () => Item;
		title: string;
		listProps?: ClassProp;
	};

	let { content, items = $bindable(), newItem, title, listProps, ...props }: Props = $props();

	const add = () => {
		items = [...items, newItem()] as Item[];
	};

	const remove = (index: number) => {
		items.splice(index, 1);
		items = [...items];
	};
</script>

<ClassBox {props}>
	<div class="mb-4 flex items-center justify-between">
		<div class="font-semibold">{title}</div>
		<IconTextButton onclick={add} class="button-blue rounded-lg px-3 py-1 shadow-sm" iconText={{ text: { text: 'Add', class: 'text-xs tracking-wide uppercase' }, icon: { icon: Plus, class: 'size-4' }, position: 'iconLast' }} />
	</div>
	<ClassBox props={listProps} class="flex flex-1 flex-col flex-wrap gap-0">
		{#each items as item, i}
			<div class="flex flex-row">
				<div class="flex flex-1 flex-row flex-wrap gap-x-2 gap-y-1 sm:gap-x-4">
					{@render content(item, i)}
				</div>
				<DeleteButton onclick={() => remove(i)} class="my-auto flex-0" />
			</div>
		{:else}
			<NoItems />
		{/each}
	</ClassBox>
</ClassBox>
