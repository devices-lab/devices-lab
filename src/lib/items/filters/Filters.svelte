<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import BaseLink from '$lib/components/interactive/BaseLink.svelte';
	import { Routes } from '$lib/data/routes';
	import type { DefProps } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';
	import FiltersMobile from './FiltersMobile.svelte';
	import { Check, ChevronDown, Square, SquareCheck } from '@lucide/svelte';
	import FilterCheck from './FilterCheck.svelte';
	import IconButton from '$lib/components/icons/IconButton.svelte';
	import type { FilterItem, SorterItem, Sorter } from '$lib/items/ItemGrid.svelte';
	import BaseButton from '$lib/components/interactive/BaseButton.svelte';

	type Props = DefProps & {
		tags: FilterItem[];
		types: FilterItem[];
		sortByList: SorterItem[];
		sortBy: Sorter;
	};

	let { tags, types, sortByList, sortBy = $bindable(), ...props }: Props = $props();
	const uid = $props.id();

	const id_mobileFilters = $derived(`mobile-filters-${uid}`);
	const id_filterTags = $derived(`filter-tags-${uid}`);
	const id_filterType = $derived(`filter-type-${uid}`);
	const id_sortBy = $derived(`sort-by-${uid}`);
</script>

{#snippet FilterButton(target: string, label: string, items: FilterItem[])}
	{@const count = items.reduce((acc, tag) => acc + (tag.checked ? 1 : 0), 0)}
	<div>
		<IconButton popovertarget={target} class="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" icon={{ icon: ChevronDown, class: 'size-5 opacity-70' }} position="iconLast">
			<span>{@html label}</span>
			{#if count > 0}
				<span class="rounded-sm bg-gray-200 px-1.5 py-0.5 text-xs font-semibold text-gray-700 tabular-nums">{count}</span>
			{/if}
		</IconButton>
	</div>
{/snippet}

<FiltersMobile />

<!-- Filters -->
<ClassBox {props} tag="section" aria-labelledby="filter-heading" class="px-4">
	<div class="flex items-center justify-between">
		<el-dropdown class="relative inline-block text-left">
			{@render FilterButton(id_sortBy, `Sort by: <span class=" opacity-60 text-sm/6">[${sortByList.find(item => item.key === sortBy)?.label.toLowerCase()}]</span>`, [])}

			<el-menu id={id_sortBy} anchor="bottom start" popover="auto" class="max-w-50 min-w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition transition-discrete [--anchor-gap:--spacing(2)] focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-700">
				<div class="py-1">
					{#each sortByList as item}
						<IconButton onclick={() => (sortBy = item.key)} class="w-full px-4 py-2 text-gray-900 focus:bg-gray-100 focus:outline-hidden dark:text-gray-200 dark:focus:bg-gray-600" text={{ text: item.label, class: 'flex-1 text-sm font-medium flex-nowrap text-start' }} icon={{ icon: Check, class: 'size-5' + (sortBy === item.key ? ' text-primary-600' : ' text-transparent') }} align={'justify-start'} />
					{/each}
				</div>
			</el-menu>
		</el-dropdown>

		<button type="button" command="show-modal" commandfor={id_mobileFilters} class="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden">Filters</button>

		<el-popover-group class="hidden sm:flex sm:items-baseline sm:space-x-8">
			{#if tags.length > 0}
				<div class="relative inline-block text-left">
					{@render FilterButton(id_filterTags, 'Tags', tags)}

					<el-popover id={id_filterTags} anchor="bottom end" popover="auto" class="origin-top-right overflow-visible rounded-md bg-white p-4 shadow-2xl ring-1 ring-black/5 transition transition-discrete [--anchor-gap:--spacing(2)] backdrop:bg-transparent open:block focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
						<form class="space-y-4">
							{#each tags as item}
								<FilterCheck name="tag[]" label={item.label} bind:checked={item.checked} />
							{/each}
						</form>
					</el-popover>
				</div>
			{/if}
			{#if types.length > 0}
				<div class="relative inline-block text-left">
					{@render FilterButton(id_filterType, 'Type', types)}

					<el-popover id={id_filterType} anchor="bottom end" popover="auto" class="origin-top-right overflow-visible rounded-md bg-white p-4 shadow-2xl ring-1 ring-black/5 transition transition-discrete [--anchor-gap:--spacing(2)] backdrop:bg-transparent open:block focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
						<form class="space-y-4">
							{#each types as item}
								<FilterCheck name="type[]" label={item.label} bind:checked={item.checked} />
							{/each}
						</form>
					</el-popover>
				</div>
			{/if}
		</el-popover-group>
	</div>
</ClassBox>
