<script lang="ts">
	import NoItems from '$lib/components/NoItems.svelte';
	import type { Entry, ItemData } from '$lib/data/indexer';
	import ItemCard from '$lib/items/ItemCard.svelte';
	import { onMount } from 'svelte';
	import Filters from './filters/Filters.svelte';

	type Props = {
		entries: Entry[];
	};

	const LOCAL_STORAGE_SORT_KEY = 'device-lab-sort-by';

	//========================================================================//

	export type Sorter = 'name' | 'newest' | 'type';

	function saveSortByToLocalStorage(sortBy: Sorter) {
		console.log('Saving sortBy to localStorage:', sortBy);
		localStorage.setItem(LOCAL_STORAGE_SORT_KEY, sortBy);
	}

	function getSortByFromLocalStorage(defaultSorter: Sorter): Sorter {
		const raw = localStorage.getItem(LOCAL_STORAGE_SORT_KEY);
		console.log('Retrieved sortBy from localStorage:', raw);
		return typeof raw === 'string' && (raw === 'name' || raw === 'newest' || raw === 'type') ? raw : defaultSorter;
	}
	
	//========================================================================//

	const { entries }: Props = $props();


	export type SorterItem = {
		label: string;
		key: Sorter;
	};

	export type FilterItem = {
		label: string;
		checked: boolean;
	};

	//========================================================================//

	let tags: FilterItem[] = $state(
		entries
			.map((e) => e.item.tags)
			.flat()
			.filter((tag, index, array) => array.indexOf(tag) === index)
			.sort()
			.map((tag) => ({ label: tag.name, checked: false }))
	);

	let types: FilterItem[] = $state([
		{ label: 'Item', checked: false },
		{ label: 'Family', checked: false }
	]);
	const sortByList: SorterItem[] = [
		{ label: 'Name', key: 'name' },
		{ label: 'Recently updated', key: 'newest' },
		{ label: 'Type', key: 'type' }
	];
	let sortBy: Sorter = $state(sortByList[0].key);

	//========================================================================//



	onMount(() => {
		console.log('ItemGrid onMount');
		sortBy = getSortByFromLocalStorage(sortBy);
	});

	$effect(() => {
		if (typeof window === 'undefined') return;
		saveSortByToLocalStorage(sortBy);
	});

	//========================================================================//

	let items: Entry[] = $derived(
		entries
			.filter((entry: Entry) => {
				// Filter by tags
				if (tags.some((tag) => tag.checked) && !entry.item.tags?.some((tag) => tags.find((t) => t.checked && t.label === tag.name))) {
					return false;
				}
				// Filter by types
				if (types.some((type) => type.checked)) {
					const selectedTypeLabels = types.filter((t) => t.checked).map((t) => t.label.toLowerCase());
					if (selectedTypeLabels.length > 0 && !selectedTypeLabels.includes(entry.kind)) {
						return false;
					}
				}
				return true;
			})
			.sort((a: Entry, b: Entry) => {
				if (sortBy === 'name') {
					return a.item.name.localeCompare(b.item.name);
				} else if (sortBy === 'newest') {
					const a_modified = a.kind === 'item' ? parseInt((a.item as ItemData).modified) : 0;
					const b_modified = b.kind === 'item' ? parseInt((b.item as ItemData).modified) : 0;
					return b_modified - a_modified;
				} else if (sortBy === 'type') {
					return a.kind.localeCompare(b.kind);
				}
				return 0;
			})
	);
</script>

<section aria-labelledby="items-heading" class="mt-6">
	<Filters {tags} {types} bind:sortBy {sortByList} class="mb-8 rounded-full bg-white px-4 py-1 shadow-sm dark:bg-gray-800" />
	{#if items.length}
		<div class="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
			{#each items as entry}
				<ItemCard {entry} />
			{/each}
		</div>
	{:else}
		<NoItems class="my-4 text-center" />
	{/if}
</section>
