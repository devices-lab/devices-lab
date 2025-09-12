<script lang="ts">
	import BaseCard from '$lib/components/BaseCard.svelte';
	import DynamicList from '$lib/components/DynamicList.svelte';
	import Notification from '$lib/components/Notification.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import BaseButton from '$lib/components/base/BaseButton.svelte';
	import Checkbox from '$lib/components/base/Checkbox.svelte';
	import IconTextButton from '$lib/components/base/IconTextButton.svelte';
	import IconInput from '$lib/components/inputs/IconInput.svelte';
	import SelectInput from '$lib/components/inputs/SelectInput.svelte';
	import TextField from '$lib/components/inputs/TextField.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import type { Feature, Reference, Tag } from '$lib/data/data';
	import { DefaultItem, generateAndDownloadItem, type Entry, type ItemData } from '$lib/data/indexer';
	import ItemCard from '$lib/items/ItemCard.svelte';
	import ItemPage from '$lib/items/page/ItemPage.svelte';
	import { Download, X } from '@lucide/svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	let selected = $state('');
	let showFeedback = $state(false);
	let loading = $state(false);

	//======================================================================================//

	let notification: Notification = $state() as Notification;

	//======================================================================================//

	let currentItem: Entry = $state({ ...DefaultItem });
	let item: ItemData = $derived(currentItem.item as ItemData);

	let researchKeys: string[] = $state([]);

	const clearData = () => {
		currentItem = { ...DefaultItem };
		researchKeys = [];
		selected = '';
		showFeedback = false;
	};

	const loadData = () => {
		if (selected && data.itemLibrary[selected] && data.itemLibrary[selected].kind === 'item') {
			currentItem = { ...data.itemLibrary[selected] };
			researchKeys = [...(currentItem.item as ItemData).publications.map((pub) => pub.key)];
			notification?.show('success', 'Research data loaded');
			showFeedback = true;
		}
	};

	//researchKeys: [...item.publications.map(pub => pub.key)

	const downloadData = () => {
		generateAndDownloadItem(currentItem, researchKeys);
		notification?.show('success', 'Download ready!');
	};

	type EntrySelect = { value: string; label: string };

	// Helper to create select item from entry
	const createSelectItem = (key: string, entry: Entry): EntrySelect | undefined => {
		if (entry.kind === 'item') {
			return { value: key, label: entry.item.name };
		}
		return undefined;
	};
	// Prepare the list of items for the select input
	const itemSelect = $derived([
		{ value: '', label: 'Choose option...' },
		...(Object.entries(data.itemLibrary)
			.map(([key, entry]) => createSelectItem(key, entry))
			.filter(Boolean) as EntrySelect[])
	]);

	//======================================================================================//

	// Input validation
	const validate = (value: string) => {
		if (!value && showFeedback) return false;
		return true;
	};

	// Prepare the list of publications for the select input
	const publicationItems = Object.entries(data.researchLibrary).map(([key, item]) => ({
		value: key,
		label: item.name
	}));

	$effect(() => {
		item.publications = researchKeys.filter(Boolean).map((p) => data.researchLibrary[p]);
	});
</script>

<Notification bind:this={notification} />

<BaseCard class="mx-auto flex w-full max-w-3xl flex-col gap-3 pt-6 shadow-md">
	<h1 class="my-2 mb-3 px-8 text-sm font-semibold text-primary-500">Select an existing item to get started:</h1>

	<div class="flex flex-col gap-x-3 px-8 sm:flex-row">
		<SelectInput bind:value={selected} items={itemSelect} label="Device / tool / media item" class="flex-1" />
		<BaseButton class="button-slate my-auto min-w-30 rounded-md py-1" onclick={loadData}>Load</BaseButton>
	</div>

	<div class="relative mt-2 flex items-center justify-center gap-8 border-t-1 border-slate-200 px-8 py-4">
		<IconTextButton onclick={clearData} class="absolute left-8 text-red-700" iconText={{ text: { text: 'Clear', class: 'text-sm' }, icon: { icon: X, class: 'size-4' } }} />
		<IconTextButton onclick={downloadData} class="rounded-xl bg-sky-600/30 px-4 py-1 font-semibold " iconText={{ text: { text: 'Generate File', class: 'text-sm/6 tracking-wide' }, icon: { icon: Download, class: 'size-4' } }} />
		<Spinner {loading} class="absolute right-8" />
	</div>
</BaseCard>

<div class="divide-y divide-gray-900/10 text-gray-800 dark:divide-white/10 dark:text-gray-100">
	<div class="py-10">
		<div class="my-4 flex-1 font-semibold text-gray-600 dark:text-gray-300">Preview:</div>

		<div class="mt-6 flex flex-col justify-center gap-8 lg:flex-row">
			<div class="mx-auto mt-6 max-w-80">
				<ItemCard entry={currentItem} />
			</div>
			<div class="flex-1">
				<ItemPage entry={currentItem} />
			</div>
		</div>
	</div>

	<div class="py-10">
		<BaseCard class="flex flex-col gap-y-2 px-4 py-6 sm:p-8">
			<TextInput bind:value={item.name} label="Name" sublabel="Name of the item" class="flex-1" {validate} />
			<TextInput bind:value={item.pathName} label="Path Name" sublabel="Name for the device / tool / media item that will be shown in paths" class="flex-1" {validate} />

			<TextField bind:value={item.teaser} label="Teaser" sublabel="A very short teaser about the device / tool / media item" {validate} />
			<TextField bind:value={item.description} label="Description" sublabel="A detailed description of the device / tool / media item.<br/>Supports richtext." {validate} />

			<div class="mt-4 py-3 font-semibold">Project Information:</div>

			<div class="flex flex-col items-start gap-4 md:flex-row">
				<TextInput bind:value={() => item.projectName || '', (val) => (item.projectName = val || undefined)} label="Project name" sublabel="Public name for the device / tool" class="flex-1" {validate} />
				<TextInput bind:value={() => item.projectID || '', (val) => (item.projectID = val || undefined)} label="Project Id" sublabel="The internal identification number" class="flex-1" {validate} />
				<TextInput bind:value={() => item.projectVersion || '', (val) => (item.projectVersion = val || undefined)} label="Project version" sublabel="The version number of the device / tool" class="flex-1" {validate} />
			</div>

			<DynamicList bind:items={item.features} newItem={(): Feature => ({ text: '' })} title="Features" class="my-4">
				{#snippet content(item: Feature)}
					<TextInput bind:value={item.text} label="" class="" inputProps={{ placeholder: 'feature' }} {validate} />
				{/snippet}
			</DynamicList>

			<DynamicList bind:items={item.resources} newItem={(): Reference => ({ text: '', icon: 'ScrollText', href: '' })} title="Links" gap="gap-8" class="my-4">
				{#snippet content(item: Reference)}
					<div class="flex w-full flex-row items-start gap-4 xl:flex-1">
						<TextInput bind:value={item.text} label="Title" sublabel="Name of the link" class="flex-1" inputProps={{ placeholder: 'title' }} {validate} />
						<IconInput bind:value={item.icon} label="Icon" class="flex-1" input={{ placeholder: 'icon' }} {validate} />
					</div>
					<TextInput bind:value={item.href} label="URL" sublabel="Can be external URL, or internal device / tool identifier" class="flex-1" inputProps={{ placeholder: 'https://example.com' }} {validate} />
				{/snippet}
			</DynamicList>

			<DynamicList bind:items={researchKeys} newItem={(): string => publicationItems[0]?.value || ''} title="Publications" class="my-4">
				{#snippet content(_item: string, index: number)}
					<SelectInput bind:value={researchKeys[index]} items={publicationItems} {validate} />
				{/snippet}
			</DynamicList>

			<DynamicList bind:items={item.tags} newItem={(): Tag => ({ name: '' })} title="Tags" class="my-4">
				{#snippet content(item: Tag)}
					<TextInput bind:value={item.name} label="" class="" inputProps={{ placeholder: 'tag' }} {validate} />
				{/snippet}
			</DynamicList>

			<Checkbox bind:checked={currentItem.item.featured} text={{ text: 'Featured', class: 'text-sm' }} class="mt-6 gap-3" />
		</BaseCard>
	</div>
</div>
