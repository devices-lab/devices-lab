<script lang="ts">
	import BaseCard from '$lib/components/BaseCard.svelte';
	import Notification from '$lib/components/Notification.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import IconButton from '$lib/components/icons/IconButton.svelte';
	import SelectInput from '$lib/components/inputs/SelectInput.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import BaseButton from '$lib/components/interactive/BaseButton.svelte';
	import { type ResearchItem, DefaultResearchItem, fetchResearchDataDOI, generateAndDownloadCitation } from '$lib/data/research';
	import ResearchInput from '$lib/workbench/bibtex/ResearchInput.svelte';
	import { Download, X } from '@lucide/svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	let doi = $state('');
	let selected = $state('');
	let showFeedback = $state(false);
	let loading = $state(false);

	//======================================================================================//

	let notification: Notification = $state() as Notification;

	//======================================================================================//

	const clearData = () => {
		currentItem = { ...DefaultResearchItem };
		doi = '';
		selected = '';
		showFeedback = false;
	};
	const loadData = () => {
		if (selected && data.researchLibrary[selected]) {
			currentItem = data.researchLibrary[selected];
			notification?.show('success', 'Research data loaded');
			showFeedback = true;
		}
	};
	const importData = () => {
		loading = true;
		fetchResearchDataDOI(doi)
			.then((data: ResearchItem | undefined) => {
				if (data) {
					currentItem = { ...data };
					notification?.show('success', 'Research data imported');
					showFeedback = true;
					loading = false;
				}
			})
			.catch((error) => {
				console.error('Error fetching research data:', error);
				notification?.show('error', 'Failed to fetch research data');
				loading = false;
			});
	};

	const downloadData = () => {
		generateAndDownloadCitation(currentItem);
		notification?.show('success', 'Download ready!');
	};

	let currentItem: ResearchItem = $state({ ...DefaultResearchItem });

	const researchSelect = $derived([
		{ value: '', label: 'Choose option...' },
		...Object.entries(data.researchLibrary).map(([key, item]) => ({
			value: key,
			label: item.name
		}))
	]);

	let temp = $state('');
</script>

<Notification bind:this={notification} />

<!--<BaseCard class="flex flex-col items-center justify-between gap-3 rounded-full! border-1 border-gray-200 px-8 shadow-md! sm:flex-row ">-->
<BaseCard class="flex w-full flex-col gap-6 px-8 py-6 shadow-md!" scale="md:w-3/4">
	<div class="flex flex-col gap-x-3 sm:flex-row">
		<TextInput bind:value={doi} label="DOI" placeholder="Enter DOI" class="flex-1" />
		<BaseButton class="button-slate my-auto min-w-30 rounded-md py-1" onclick={importData}>Import</BaseButton>
	</div>

	<div class="flex flex-col gap-x-3 sm:flex-row">
		<SelectInput bind:value={selected} items={researchSelect} label="Research item" class="flex-1" />
		<BaseButton class="button-slate my-auto min-w-30 rounded-md py-1" onclick={loadData}>Load</BaseButton>
	</div>

	<div class="flex items-center gap-8">
		<IconButton onclick={downloadData} class="button-green mx-auto rounded-xl px-4 py-2 " text={{ text: 'Download', class: 'text-sm/6 tracking-wider uppercase' }} icon={{ icon: Download, iconClass: 'size-4' }} />
		<IconButton onclick={clearData} class="link-red absolute -bottom-10 left-0 m-1" text={{ text: 'Clear', class: 'text-sm' }} icon={{ icon: X, iconClass: 'size-4' }} />
	</div>

	<Spinner {loading} class="absolute right-0 bottom-0 m-3" />
</BaseCard>

<ResearchInput bind:research={currentItem} {showFeedback} />
