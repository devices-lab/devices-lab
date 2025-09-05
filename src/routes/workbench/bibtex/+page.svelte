<script lang="ts">
	import BaseCard from '$lib/components/BaseCard.svelte';
	import { type Author, type Link, type ResearchItem, type ResearchType, DefaultResearchItem, fetchResearchDataDOI, generateAndDownloadCitation, generateKey } from '$lib/data/research';
	import ResearchInput from '$lib/workbench/bibtex/ResearchInput.svelte';
	import { Download, X } from '@lucide/svelte';

	import BaseButton from '$lib/components/BaseButton.svelte';
	import Selectarea from '$lib/workbench/bibtex/inputs/Selectarea.svelte';
	import Textarea from '$lib/workbench/bibtex/inputs/Textarea.svelte';
	import type { PageProps } from './$types';
	import Notification from '$lib/components/Notification.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import IconButton from '$lib/components/icons/IconButton.svelte';

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
		{ key: '', title: '' },
		...Object.entries(data.researchLibrary).map(([key, item]) => ({
			key,
			title: item.name
		}))
	]);
</script>

<Notification bind:this={notification} />

<!--<BaseCard class="flex flex-col items-center justify-between gap-3 rounded-full! border-1 border-gray-200 px-8 shadow-md! sm:flex-row ">-->
<BaseCard class="flex w-full flex-col gap-6 border-1 border-gray-200 shadow-md!" scale="md:w-3/4">
	<div class="flex flex-col gap-x-3 sm:flex-row">
		<Textarea bind:value={doi} label="DOI" placeholder="Enter DOI" class="flex-1" />
		<BaseButton class="button-slate mt-2 min-w-30 rounded-lg" onclick={importData}>Import</BaseButton>
	</div>

	<div class="flex flex-col gap-x-3 sm:flex-row">
		<Selectarea bind:value={selected} items={researchSelect} label="Research item" class="flex-1" />
		<BaseButton class="button-slate mt-2 min-w-30 rounded-lg" onclick={loadData}>Load</BaseButton>
	</div>

	<div class="flex items-center gap-8">
		<IconButton onclick={downloadData} class="button-green mx-auto py-1! text-sm/6! tracking-wider uppercase" text="Download" icon={Download} />
		<IconButton onclick={clearData} class="link-red absolute -bottom-10 left-0 m-1 text-sm" text="Clear" icon={X} />
	</div>

	<Spinner {loading} class="absolute right-0 bottom-0 m-3" />
</BaseCard>

<ResearchInput bind:research={currentItem} {showFeedback} />
