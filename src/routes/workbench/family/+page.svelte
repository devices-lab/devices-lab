<script lang="ts">
	import BaseCard from '$lib/components/BaseCard.svelte';
	import Notification from '$lib/components/Notification.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import IconButton from '$lib/components/base/IconButton.svelte';
	import SelectInput from '$lib/components/inputs/SelectInput.svelte';
	import BaseButton from '$lib/components/base/BaseButton.svelte';
	import { DefaultFamily, generateAndDownloadFamily, type Entry, type FamilyData } from '$lib/data/indexer';
	import FamilyInput from '$lib/workbench/items/FamilyInput.svelte';
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
			.filter(Boolean) as EntrySelect[]),
	]);
</script>

<Notification bind:this={notification} />

<!--<BaseCard class="flex flex-col items-center justify-between gap-3 rounded-full! border-1 border-gray-200 px-8 shadow-md! sm:flex-row ">-->
<BaseCard class="flex w-full flex-col gap-6 px-8 py-6 shadow-md!" scale="md:w-3/4">
	<div class="flex flex-col gap-x-3 sm:flex-row">
		<SelectInput bind:value={selected} items={familySelect} label="Device / tool / media item" class="flex-1" />
		<BaseButton class="button-slate my-auto min-w-30 rounded-md py-1" onclick={loadData}>Load</BaseButton>
	</div>

	<div class="flex items-center gap-8">
		<IconButton onclick={downloadData} class="button-green mx-auto rounded-xl px-4 py-2 " text={{ text: 'Download', class: 'text-sm/6 tracking-wider uppercase' }} icon={{ icon: Download, iconClass: 'size-4' }} />
		<IconButton onclick={clearData} class="link-red absolute -bottom-10 left-0 m-1" text={{ text: 'Clear', class: 'text-sm' }} icon={{ icon: X, iconClass: 'size-4' }} />
	</div>

	<Spinner {loading} class="absolute right-0 bottom-0 m-3" />
</BaseCard>

<FamilyInput bind:entry={currentItem} {showFeedback} />
