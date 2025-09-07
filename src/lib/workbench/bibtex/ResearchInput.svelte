<script lang="ts">
	import { researchTypeItems } from '$lib/_content/workbench';
	import BaseCard from '$lib/components/BaseCard.svelte';
	import DynamicList from '$lib/components/DynamicList.svelte';
	import Datearea from '$lib/components/inputs/DateInput.svelte';
	import IconInput from '$lib/components/inputs/IconInput.svelte';
	import SelectTypeInput from '$lib/components/inputs/SelectTypeInput.svelte';
	import TextField from '$lib/components/inputs/TextField.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import type { Author, Award, Link, ResearchItem, Tag } from '$lib/data/research';
	import ItemCard from '$lib/research/ItemCard.svelte';

	let { research = $bindable(), showFeedback = false }: { research: ResearchItem; showFeedback?: boolean } = $props();

	const validate = (value: string) => {
		if (!value && showFeedback) return false;
		return true;
	};


</script>

<div class="divide-y divide-gray-900/10 text-gray-800 dark:divide-white/10 dark:text-gray-100">
	<div class="py-10">
		<div class="my-4 flex-1 font-semibold text-gray-600 dark:text-gray-300">Preview:</div>

		<div class="mt-6">
			<ItemCard item={research} />
		</div>
	</div>

	<div class="py-10">
		<BaseCard class="flex flex-col gap-y-2 px-4 py-6 sm:p-8">
			<div class="flex flex-col items-start gap-4 md:flex-row">
				<TextInput bind:value={research.name} label="Key" sublabel="Internal key for the paper <i>key</i>" class="flex-1" {validate} />
				<TextInput bind:value={research.title} label="Title" sublabel="The full title of the paper" class="flex-3" {validate} />
			</div>
			<TextField bind:value={research.abstract} label="Abstract" sublabel="A brief summary of the paper. Can be the paper abstract, but doesn't need to be." {validate} />
			<TextInput bind:value={research.doi} label="DOI" sublabel="DOI number for the paper" {validate} />
			<SelectTypeInput bind:value={research.type} items={researchTypeItems} label="Type" sublabel="Type of the paper (research paper, poster, extended abstract, ...)" {validate} />

			<div class="mt-4 py-3 font-semibold">Publication:</div>

			<Datearea bind:value={research.published} label="Publication date" {validate} />
			<TextField bind:value={research.conference} label="Conference" class="flex-1" {validate} />
			<TextField bind:value={research.location} label="Conference location" sublabel="City, country" class="flex-1" {validate} />

			<DynamicList bind:items={research.authors} newItem={(): Author => ({ name: '', affiliation: '' })} title="Authors">
				{#snippet content(item: Author)}
					<TextInput bind:value={item.name} label="Name" class="flex-2" inputProps={{ placeholder: 'name' }} {validate} />
					<TextInput bind:value={item.affiliation} label="Affiliation" class="flex-3" inputProps={{ placeholder: 'affiliation' }} {validate} />
				{/snippet}
			</DynamicList>

			<DynamicList bind:items={research.links} newItem={(): Link => ({ text: '', icon: 'ScrollText', href: '' })} title="Links" gap="gap-8">
				{#snippet content(item: Link)}
					<div class="flex w-full flex-row items-start gap-4 xl:flex-1">
						<TextInput bind:value={item.text} label="Title" sublabel="Name of the link" class="flex-1" inputProps={{ placeholder: 'title' }} {validate} />
						<IconInput bind:value={item.icon} label="Icon" class="flex-1" input={{ placeholder: 'icon' }} {validate} />
					</div>
					<TextInput bind:value={item.href} label="URL" sublabel="Can be external URL, or internal device / tool identifier" class="flex-1" inputProps={{ placeholder: 'https://example.com' }} {validate} />
				{/snippet}
			</DynamicList>

			<DynamicList bind:items={research.awards} newItem={(): Award => ({ name: '', icon: 'Medal' })} title="Awards">
				{#snippet content(item: Award)}
					<TextInput bind:value={item.name} label="Name" sublabel="Name of the award, like 'Best Paper' or 'Honorable Mention'" class="flex-1" inputProps={{ placeholder: 'award' }} {validate} />
					<IconInput bind:value={item.icon} label="Icon" class="flex-1" input={{ placeholder: 'icon' }} {validate} />
				{/snippet}
			</DynamicList>

			<DynamicList bind:items={research.tags} newItem={(): Tag => ({ name: '' })} title="Tags">
				{#snippet content(item: Tag)}
					<TextInput bind:value={item.name} label="" class="" inputProps={{ placeholder: 'tag' }} {validate} />
				{/snippet}
			</DynamicList>
		</BaseCard>
	</div>
</div>
