<script lang="ts" generics="Item">
	import BaseCard from '$lib/components/BaseCard.svelte';
	import type { DefProps } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import DividerAction from './DividerAction.svelte';
	import ResetButton from './ResetButton.svelte';

	type Props = DefProps & {
		content: Snippet<[Item]>;
		items: Item[];
		title: string;
		subtitle: string;
		resetClass?: string;
	};

	let { content, items = $bindable(), title, subtitle, resetClass, ...props }: Props = $props();

	const add = () => {
		items = [...items, {} as Item];
	};

	const remove = (index: number) => {
		items.splice(index, 1);
		items = [...items];
	};
</script>

<div {...props} class="grid grid-cols-1 gap-x-8 gap-y-8 py-10 lg:grid-cols-3 {props.class}">
	<div class="px-4 sm:px-0">
		<h2 class="text-base/7 font-semibold text-gray-900 dark:text-white">{title}</h2>
		<p class="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">{subtitle}</p>
	</div>

	<BaseCard class="md:col-span-2">
		<div class="px-4 py-6 *:not-last:mb-6 sm:p-8">
			{#each items as item, i}
				<div class="relative flex flex-col flex-wrap gap-1 gap-x-2 pe-10 md:flex-row md:gap-x-4">
					{@render content(item)}
					<ResetButton onclick={() => remove(i)} class={resetClass} />
				</div>
			{/each}
			<DividerAction onclick={() => add()} class="py-2" />
		</div>
	</BaseCard>
</div>
