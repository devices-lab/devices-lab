<script lang="ts">
	import NoItems from '$lib/components/NoItems.svelte';
	import type { Entry, ItemData } from '$lib/data/indexer';
	import Filters from '$lib/items/filters/Filters.svelte';
	import ItemCard from '$lib/items/ItemCard.svelte';
	import { onMount } from 'svelte';
	import { SvelteMap, SvelteSet } from 'svelte/reactivity';

	type Props = {
		entries: Entry[];
		family: string;
	};

	const LOCAL_STORAGE_SORT_KEY = 'device-lab-sort-by';

	//========================================================================//

	export type Sorter = 'name' | 'newest' | 'type';

	function saveSortByToLocalStorage(sortBy: Sorter) {
		localStorage.setItem(LOCAL_STORAGE_SORT_KEY, sortBy);
	}

	function getSortByFromLocalStorage(defaultSorter: Sorter): Sorter {
		const raw = localStorage.getItem(LOCAL_STORAGE_SORT_KEY);
		return typeof raw === 'string' && (raw === 'name' || raw === 'newest' || raw === 'type') ? raw : defaultSorter;
	}

	//========================================================================//

	const { entries, family }: Props = $props();

	export type SorterItem = {
		label: string;
		key: Sorter;
	};

	export type FilterItem = {
		label: string;
		checked: boolean;
	};

	//========================================================================//

	let tags2 = new SvelteSet<FilterItem>();
	$effect(() => {
		tags2.clear();
		entries.forEach((entry) => {
			entry.item.tags?.forEach((tag) => {
				tags2.add({ label: tag.name, checked: false });
			});
		});
	});

	let tags: FilterItem[] = $state([]);
	$effect(() => {
		tags = [];
		tags = entries
			.map((e) => e.item.tags.map((tag) => tag.name))
			.flat()
			.filter((tag, index, array) => array.indexOf(tag) === index)
			.sort()
			.map((tag) => ({ label: tag, checked: false }));
	});

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
	<div class="pt-3 pb-6 text-center text-2xl font-semibold tracking-tight sm:text-3xl">
		{family}
	</div>

	<Filters {tags} {types} bind:sortBy {sortByList} class="col-span-full mb-10 w-full border-t border-gray-300 py-1" />
	<div class="mx-auto flex w-full grid-cols-1 flex-col content-end items-center gap-6 sm:grid sm:w-fit sm:grid-cols-2 sm:content-start sm:gap-10 lg:grid-cols-3">
		{#each items as entry}
			<ItemCard {entry} />
		{:else}
			<NoItems class="my-4 text-center w-full col-span-full" />
		{/each}
	</div>
</section>
