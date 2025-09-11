<script lang="ts">
	import BaseCard from '$lib/components/BaseCard.svelte';
	import Notification from '$lib/components/Notification.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import IconButton from '$lib/components/interactive/IconButton.svelte';
	import SelectInput from '$lib/components/inputs/SelectInput.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import BaseButton from '$lib/components/interactive/BaseButton.svelte';
	import ResearchInput from '$lib/workbench/bibtex/ResearchInput.svelte';
	import { Download, X } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import { DefaultItem, generateAndDownloadItem, type Entry, type ItemData, type ItemDataHelper } from '$lib/data/indexer';
	import ItemInput from '$lib/workbench/items/ItemInput.svelte';

	const { data }: PageProps = $props();

	let selected = $state('');
	let showFeedback = $state(false);
	let loading = $state(false);

	//======================================================================================//

	let notification: Notification = $state() as Notification;

	//======================================================================================//

	let currentItem: Entry = $state({ ...DefaultItem });
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
</script>

<Notification bind:this={notification} />

<!--<BaseCard class="flex flex-col items-center justify-between gap-3 rounded-full! border-1 border-gray-200 px-8 shadow-md! sm:flex-row ">-->
<BaseCard class="flex w-full flex-col gap-6 px-8 py-6 shadow-md!" scale="md:w-3/4">
	<div class="flex flex-col gap-x-3 sm:flex-row">
		<SelectInput bind:value={selected} items={itemSelect} label="Device / tool / media item" class="flex-1" />
		<BaseButton class="button-slate my-auto min-w-30 rounded-md py-1" onclick={loadData}>Load</BaseButton>
	</div>

	<div class="flex items-center gap-8">
		<IconButton onclick={downloadData} class="button-green mx-auto rounded-xl px-4 py-2 " text={{ text: 'Download', class: 'text-sm/6 tracking-wider uppercase' }} icon={{ icon: Download, iconClass: 'size-4' }} />
		<IconButton onclick={clearData} class="link-red absolute -bottom-10 left-0 m-1" text={{ text: 'Clear', class: 'text-sm' }} icon={{ icon: X, iconClass: 'size-4' }} />
	</div>

	<Spinner {loading} class="absolute right-0 bottom-0 m-3" />
</BaseCard>

<ItemInput bind:entry={currentItem} bind:researchKeys researchLibrary={data.researchLibrary} />
