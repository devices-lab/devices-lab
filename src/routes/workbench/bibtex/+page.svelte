<script lang="ts">
	import BaseCard from '$lib/components/BaseCard.svelte';
	import DynamicList from '$lib/components/DynamicList.svelte';
	import Notification from '$lib/components/Notification.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import BaseButton from '$lib/components/base/BaseButton.svelte';
	import IconTextButton from '$lib/components/base/IconTextButton.svelte';
	import DateInput from '$lib/components/inputs/DateInput.svelte';
	import IconInput from '$lib/components/inputs/IconInput.svelte';
	import SelectInput from '$lib/components/inputs/SelectInput.svelte';
	import SelectTypeInput from '$lib/components/inputs/SelectTypeInput.svelte';
	import TextField from '$lib/components/inputs/TextField.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import type { Author, Award, Reference, Tag } from '$lib/data/data';
	import { type ResearchItem, DefaultResearchItem, fetchResearchDataDOI, generateAndDownloadCitation, ResearchTypeItems } from '$lib/data/research';
	import ResearchCard from '$lib/research/ResearchCard.svelte';
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

	let currentItem: ResearchItem = $state({ ...DefaultResearchItem });

	const clearData = () => {
		currentItem = { ...DefaultResearchItem };
		doi = '';
		selected = '';
		showFeedback = false;
		notification?.show('success', 'Data cleared');
	};
	const loadData = () => {
		if (selected && data.researchLibrary[selected]) {
			currentItem = { ...data.researchLibrary[selected] };
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

	const researchSelect = $derived([
		{ value: '', label: 'Choose option...' },
		...Object.entries(data.researchLibrary).map(([key, item]) => ({
			value: key,
			label: item.name
		}))
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
	<h1 class="my-2 mb-3 px-8 text-sm font-semibold text-primary-500">Select an existing item to get started:</h1>

	<div class="flex flex-col gap-x-3 px-8 sm:flex-row">
		<TextInput bind:value={doi} label="DOI" placeholder="Enter DOI" class="flex-1" />
		<BaseButton class="button-slate my-auto min-w-30 rounded-md py-1" onclick={importData}>Import</BaseButton>
	</div>

	<div class="flex flex-col gap-x-3 px-8 sm:flex-row">
		<SelectInput bind:value={selected} items={researchSelect} label="Research item" class="flex-1" />
		<BaseButton class="button-slate my-auto min-w-30 rounded-md py-1" onclick={loadData}>Load</BaseButton>
	</div>

	<div class="relative mt-2 flex items-center justify-center gap-8 border-t-1 border-slate-200 px-8 py-4">
		<IconTextButton onclick={clearData} class="absolute left-8 text-red-700" iconText={{ text: { text: 'Clear', class: 'text-sm' }, icon: { icon: X, class: 'size-4' } }} />
		<IconTextButton onclick={downloadData} class="rounded-xl bg-sky-600/30 px-4 py-1 font-semibold " iconText={{ text: { text: 'Generate File', class: 'text-sm/6 tracking-wide' }, icon: { icon: Download, class: 'size-4' } }} />
		<Spinner {loading} class="absolute right-8" />
	</div>
</BaseCard>

<!-- Item input form --->
<div class="divide-y divide-gray-900/10 text-gray-800 dark:divide-white/10 dark:text-gray-100">
	<div class="py-10">
		<div class="my-4 flex-1 font-semibold text-gray-600 dark:text-gray-300">Preview:</div>

		<div class="mt-6">
			<ResearchCard item={currentItem} />
		</div>
	</div>

	<div class="py-10">
		<BaseCard class="flex flex-col gap-y-2 px-4 py-6 sm:p-8">
			<div class="flex flex-col items-start gap-4 md:flex-row">
				<TextInput bind:value={currentItem.name} label="Key" sublabel="Internal key for the paper" class="flex-1" {validate} />
				<TextInput bind:value={currentItem.title} label="Title" sublabel="The full title of the paper" class="flex-3" {validate} />
			</div>
			<TextField bind:value={currentItem.abstract} label="Abstract" sublabel="A brief summary of the paper. Can be the paper abstract, but doesn't need to be.<br/>Supports richtext." {validate} />
			<TextInput bind:value={currentItem.doi} label="DOI" sublabel="DOI number for the paper" {validate} />
			<SelectTypeInput bind:value={currentItem.type} items={ResearchTypeItems} label="Type" sublabel="Type of the paper (research paper, poster, extended abstract, ...)" {validate} />

			<div class="mt-4 py-3 font-semibold">Publication:</div>

			<DateInput bind:value={currentItem.published} label="Publication date" {validate} />
			<div class="flex flex-col items-start gap-4 md:flex-row">
				<TextField bind:value={currentItem.conference} label="Conference" class="flex-3" {validate} />
				<TextField bind:value={currentItem.conferenceShort} label="Abbreviation" class="flex-1" {validate} />
			</div>
			<TextField bind:value={currentItem.location} label="Conference location" sublabel="City, country" class="flex-1" {validate} />

			<DynamicList bind:items={currentItem.authors} newItem={(): Author => ({ name: '', affiliation: '' })} title="Authors" class="my-4">
				{#snippet content(item: Author)}
					<TextInput bind:value={item.name} label="Name" class="flex-2" inputProps={{ placeholder: 'name' }} {validate} />
					<TextInput bind:value={item.affiliation} label="Affiliation" class="flex-3" inputProps={{ placeholder: 'affiliation' }} {validate} />
				{/snippet}
			</DynamicList>

			<DynamicList bind:items={currentItem.links} newItem={(): Reference => ({ text: '', icon: 'ScrollText', href: '' })} title="Links" gap="gap-8" class="my-4">
				{#snippet content(item: Reference)}
					<div class="flex w-full flex-row items-start gap-4 xl:flex-1">
						<TextInput bind:value={item.text} label="Title" sublabel="Name of the link" class="flex-1" inputProps={{ placeholder: 'title' }} {validate} />
						<IconInput bind:value={item.icon} label="Icon" class="flex-1" input={{ placeholder: 'icon' }} {validate} />
					</div>
					<TextInput bind:value={item.href} label="URL" sublabel="Can be external URL, or internal device / tool identifier" class="flex-1" inputProps={{ placeholder: 'https://example.com' }} {validate} />
				{/snippet}
			</DynamicList>

			<DynamicList bind:items={currentItem.awards} newItem={(): Award => ({ name: '', icon: 'Medal' })} title="Awards" class="my-4">
				{#snippet content(item: Award)}
					<TextInput bind:value={item.name} label="Name" sublabel="Name of the award, like 'Best Paper' or 'Honorable Mention'" class="flex-1" inputProps={{ placeholder: 'award' }} {validate} />
					<IconInput bind:value={item.icon} label="Icon" class="flex-1" input={{ placeholder: 'icon' }} {validate} />
				{/snippet}
			</DynamicList>

			<DynamicList bind:items={currentItem.tags} newItem={(): Tag => ({ name: '' })} title="Tags" class="my-4">
				{#snippet content(item: Tag)}
					<TextInput bind:value={item.name} label="" class="" inputProps={{ placeholder: 'tag' }} {validate} />
				{/snippet}
			</DynamicList>
		</BaseCard>
	</div>
</div>
