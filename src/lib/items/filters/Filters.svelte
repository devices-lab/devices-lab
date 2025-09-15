<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import Checkbox from '$lib/components/base/Checkbox.svelte';
	import Dropdown from '$lib/components/interactive/Dropdown.svelte';
	import IconTextButton from '$lib/components/base/IconTextButton.svelte';
	import Popover from '$lib/components/interactive/Popover.svelte';
	import type { FilterItem, Sorter, SorterItem } from '$lib/data/data';
	import type { ClassProp } from '$lib/utils/utils';
	import { Check } from '@lucide/svelte';
	import FiltersMobile from './FiltersMobile.svelte';

	type Props = ClassProp & {
		tags: FilterItem[];
		types: FilterItem[];
		sortByList: SorterItem[];
		sortBy: Sorter;
	};

	let { tags, types, sortByList, sortBy = $bindable(), ...props }: Props = $props();
	const uid = $props.id();

	const id_mobileFilters = $derived(`mobile-filters-${uid}`);
</script>

<!-- Filters -->
<ClassBox {props} tag="section" aria-labelledby="filter-heading" class="">
	<!-- Mobile filters modal -->
	<FiltersMobile id={id_mobileFilters} {tags} {types} />

	<div class="relative flex items-center justify-between">
		{#snippet SortLabel()}
			<span class="flex items-center">
				Sort by
				<span class="hidden text-xs text-current/60 sm:inline-flex">: [{sortByList.find((item) => item.key === sortBy)?.label.toLowerCase()}]</span>
			</span>
		{/snippet}

		<!-- Sort by -->
		<Dropdown label={{ text: SortLabel, class: 'font-medium text-gray-900 text-sm', html: true }}>
			<div class="flex flex-col space-y-0">
				{#each sortByList as item}
					<IconTextButton onclick={() => (sortBy = item.key)} class="px-2 focus:bg-gray-100 focus:outline-hidden dark:focus:bg-gray-600" iconText={{ text: { text: item.label, class: 'p-2 text-sm first-letter:uppercase' }, icon: { icon: Check, class: 'size-5' + (sortBy === item.key ? ' text-primary' : ' text-transparent') }, position: 'iconFirst' }} />
				{/each}
			</div>
		</Dropdown>

		<!-- Mobile filter button -->
		<button type="button" command="show-modal" commandfor={id_mobileFilters} class="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden">Filters</button>

		<!-- Desktop filters -->
		<el-popover-group class="float-end hidden sm:flex sm:items-baseline sm:space-x-8">
			<Popover label={{ text: 'Tags', class: 'font-medium text-sm' }}>
				<div class="space-y-4">
					{#each tags as item}
						<Checkbox name="tags[]" text={{ text: item.label, class: 'text-sm first-letter:uppercase' }} bind:checked={item.checked} class="" />
					{/each}
				</div>
			</Popover>
			<Popover label={{ text: 'Types', class: 'font-medium text-sm' }}>
				<div class="space-y-4">
					{#each types as item}
						<Checkbox name="types[]" text={{ text: item.label, class: 'text-sm first-letter:uppercase' }} bind:checked={item.checked} class="" />
					{/each}
				</div>
			</Popover>
		</el-popover-group>
	</div>
</ClassBox>
