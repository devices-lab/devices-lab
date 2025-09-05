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

{#each items as item, i}
	<div {...props} class="relative flex flex-col flex-wrap gap-x-2 pe-10 md:flex-row md:gap-x-4 *:not-last:mb-1 *:last:mb-4 {props.class}">
		{@render content(item)}
		<ResetButton onclick={() => remove(i)} class={resetClass} />
	</div>
{/each}
<DividerAction onclick={() => add()} class="py-2" />
