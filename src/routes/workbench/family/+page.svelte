<script lang="ts">
	import BaseCard from '$lib/components/BaseCard.svelte';
	import DynamicList from '$lib/components/DynamicList.svelte';
	import Notification from '$lib/components/Notification.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import BaseButton from '$lib/components/base/BaseButton.svelte';
	import Checkbox from '$lib/components/base/Checkbox.svelte';
	import IconTextButton from '$lib/components/base/IconTextButton.svelte';
	import SelectInput from '$lib/components/inputs/SelectInput.svelte';
	import TextField from '$lib/components/inputs/TextField.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import type { Tag } from '$lib/data/data';
	import { DefaultFamily, generateAndDownloadFamily, type Entry } from '$lib/data/indexer';
	import ItemCard from '$lib/items/ItemCard.svelte';
	import { Download, X } from '@lucide/svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	let selected = $state('');
	let showFeedback = $state(false);
	let loading = $state(false);

	//======================================================================================//

	let notification: Notification = $state() as Notification;

	//======================================================================================//

	let currentItem: Entry = $state({ ...DefaultFamily });

	const clearData = () => {
		currentItem = { ...DefaultFamily };
		selected = '';
		showFeedback = false;
	};
	const loadData = () => {
		if (selected && data.itemLibrary[selected]) {
			currentItem = { ...data.itemLibrary[selected] };
			notification?.show('success', 'Research data loaded');
			showFeedback = true;
		}
	};

	const downloadData = () => {
		generateAndDownloadFamily(currentItem);
		notification?.show('success', 'Download ready!');
	};

	type EntrySelect = { value: string; label: string };

	// Helper to create select item from entry
	const createSelectFamily = (key: string, entry: Entry): EntrySelect | undefined => {
		if (entry.kind === 'family') {
			return { value: key, label: entry.item.name };
		}
		return undefined;
	};
	// Prepare the list of items for the select input
	const familySelect = $derived([
		{ value: '', label: 'Choose option...' },
		...(Object.entries(data.itemLibrary)
			.map(([key, entry]) => createSelectFamily(key, entry))
			.filter(Boolean) as EntrySelect[])
	]);

	//======================================================================================//

	// Input validation
	const validate = (value: string) => {
		if (!value && showFeedback) return false;
		return true;
	};
</script>

<Notification bind:this={notification} />

<BaseCard class="mx-auto flex w-full max-w-3xl flex-col gap-3 pt-6 shadow-md">
	<h1 class="my-2 mb-3 px-8 text-sm font-semibold text-primary">Select an existing item to get started:</h1>

	<div class="flex flex-col gap-x-3 px-8 sm:flex-row">
		<SelectInput bind:value={selected} items={familySelect} label="Family item" class="flex-1" />
		<BaseButton class="button-slate my-auto min-w-30 rounded-md py-1" onclick={loadData}>Load</BaseButton>
	</div>

	<div class="relative mt-2 flex items-center justify-center gap-8 border-t-1 border-slate-200 px-8 py-4">
		<IconTextButton onclick={clearData} class="absolute left-8 text-red-700" iconText={{ text: { text: 'Clear', class: 'text-sm' }, icon: { icon: X, class: 'size-4' } }} />
		<IconTextButton onclick={downloadData} class="rounded-xl bg-sky-600/30 px-4 py-1 font-semibold " iconText={{ text: { text: 'Generate File', class: 'text-sm/6 tracking-wide' }, icon: { icon: Download, class: 'size-4' } }} />
		<Spinner {loading} class="absolute right-8" />
	</div>
</BaseCard>

<!-- Family input form --->
<div class="divide-y divide-gray-900/10 text-gray-800 dark:divide-white/10 dark:text-gray-100">
	<div class="py-10">
		<div class="my-4 flex-1 font-semibold text-gray-600 dark:text-gray-300">Preview:</div>

		<div class="mx-auto mt-6 max-w-80">
			<ItemCard entry={currentItem} />
		</div>
	</div>

	<div class="py-10">
		<BaseCard class="flex flex-col gap-y-2 px-4 py-6 sm:p-8">
			<TextInput bind:value={currentItem.item.name} label="Name" sublabel="Name of the item" class="flex-1" {validate} />
			<TextInput bind:value={currentItem.item.pathName} label="Path Name" sublabel="Name for the device / tool / media item that will be shown in paths" class="flex-1" {validate} />

			<TextField bind:value={currentItem.item.teaser} label="Teaser" sublabel="A very short teaser about the device / tool / media item" {validate} />

			<DynamicList bind:items={currentItem.item.tags} newItem={(): Tag => ({ name: '' })} title="Tags" class="my-4">
				{#snippet content(item: Tag)}
					<TextInput bind:value={item.name} label="" class="" inputProps={{ placeholder: 'tag' }} {validate} />
				{/snippet}
			</DynamicList>

			<Checkbox bind:checked={currentItem.item.featured} text={{ text: 'Featured', class: 'text-sm' }} class="mt-6 gap-3" />
		</BaseCard>
	</div>
</div>
