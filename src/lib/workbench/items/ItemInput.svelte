<script lang="ts">
	import BaseCard from '$lib/components/BaseCard.svelte';
	import DynamicList from '$lib/components/DynamicList.svelte';
	import IconInput from '$lib/components/inputs/IconInput.svelte';
	import SelectInput from '$lib/components/inputs/SelectInput.svelte';
	import TextField from '$lib/components/inputs/TextField.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import BaseCheckbox from '$lib/components/interactive/BaseCheckbox.svelte';
	import type { Feature, Reference, Tag } from '$lib/data/data';
	import type { Entry, ItemData } from '$lib/data/indexer';
	import type { ResearchLibrary } from '$lib/data/research';
	import { Routes } from '$lib/data/routes';
	import ItemCard from '$lib/items/ItemCard.svelte';
	import ItemPage from '$lib/items/page/ItemPage.svelte';

	type Props = {
		entry: Entry;
		researchKeys: string[];
		showFeedback?: boolean;
		researchLibrary: ResearchLibrary;
	};

	let { entry = $bindable(), researchKeys = $bindable(), showFeedback = false, researchLibrary }: Props = $props();

	let item: ItemData = $derived(entry.item as ItemData);

	const validate = (value: string) => {
		if (!value && showFeedback) return false;
		return true;
	};

	// Prepare the list of publications for the select input
	const publicationItems = Object.entries(researchLibrary).map(([key, item]) => ({
		value: key,
		label: item.name
	}));

	$effect(() => {
		item.publications = researchKeys.filter(Boolean).map((p) => researchLibrary[p]);
	});
</script>

<div class="divide-y divide-gray-900/10 text-gray-800 dark:divide-white/10 dark:text-gray-100">
	<div class="py-10">
		<div class="my-4 flex-1 font-semibold text-gray-600 dark:text-gray-300">Preview:</div>

		<div class="mt-6 flex flex-col justify-center gap-8 lg:flex-row">
			<div class="mx-auto mt-6 max-w-80">
				<ItemCard {entry} />
			</div>
			<div class="flex-1">
				<ItemPage {entry} />
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

			<DynamicList bind:items={item.features} newItem={(): Feature => ({ text: '' })} title="Features">
				{#snippet content(item: Feature)}
					<TextInput bind:value={item.text} label="" class="" inputProps={{ placeholder: 'feature' }} {validate} />
				{/snippet}
			</DynamicList>

			<DynamicList bind:items={item.resources} newItem={(): Reference => ({ text: '', icon: 'ScrollText', href: '' })} title="Links" gap="gap-8">
				{#snippet content(item: Reference)}
					<div class="flex w-full flex-row items-start gap-4 xl:flex-1">
						<TextInput bind:value={item.text} label="Title" sublabel="Name of the link" class="flex-1" inputProps={{ placeholder: 'title' }} {validate} />
						<IconInput bind:value={item.icon} label="Icon" class="flex-1" input={{ placeholder: 'icon' }} {validate} />
					</div>
					<TextInput bind:value={item.href} label="URL" sublabel="Can be external URL, or internal device / tool identifier" class="flex-1" inputProps={{ placeholder: 'https://example.com' }} {validate} />
				{/snippet}
			</DynamicList>

			<DynamicList bind:items={researchKeys} newItem={(): string => publicationItems[0]?.value || ''} title="Publications">
				{#snippet content(_item: string, index: number)}
					<SelectInput bind:value={researchKeys[index]} items={publicationItems} {validate} />
				{/snippet}
			</DynamicList>

			<DynamicList bind:items={item.tags} newItem={(): Tag => ({ name: '' })} title="Tags">
				{#snippet content(item: Tag)}
					<TextInput bind:value={item.name} label="" class="" inputProps={{ placeholder: 'tag' }} {validate} />
				{/snippet}
			</DynamicList>

			<BaseCheckbox bind:checked={item.featured} label="Featured?" class="mt-6" />
		</BaseCard>
	</div>
</div>
