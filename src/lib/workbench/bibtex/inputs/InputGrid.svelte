<script lang="ts" generics="Item">
	import type { DefProps } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import DividerAction from '../components/DividerAction.svelte';
	import ResetButton from '../components/ResetButton.svelte';

	type Props = DefProps & {
		content: Snippet<[Item]>;
		items: Item[];
		newItem: () => Item;
		title: string;
		subtitle: string;
		resetClass?: string;
	};

	let { content, items = $bindable(), newItem, title, subtitle, resetClass, ...props }: Props = $props();

	const add = () => {
		items = [...items, newItem()] as Item[];
	};

	const remove = (index: number) => {
		items.splice(index, 1);
		items = [...items];
	};
</script>

<div class="flex flex-col gap-y-6">
	<div class="grid grid-cols-3 gap-4">
		{#each items as item, i}
			<div {...props} class="flex flex-row *:overflow-hidden {props.class}">
				{@render content(item)}
				<ResetButton onclick={() => remove(i)} class="" />
			</div>
		{/each}
	</div>
	<DividerAction onclick={() => add()} class="py-2" />
</div>
