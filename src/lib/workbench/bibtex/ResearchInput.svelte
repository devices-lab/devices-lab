<script lang="ts">
	import type { Author, Award, Link, ResearchItem, Tag } from '$lib/data/research';

	import BaseCard from '$lib/components/BaseCard.svelte';
	import ItemCard from '$lib/research/ItemCard.svelte';
	import Datearea from '$lib/workbench/bibtex/inputs/Datearea.svelte';
	import Iconarea from '$lib/workbench/bibtex/inputs/Iconarea.svelte';
	import Textarea from '$lib/workbench/bibtex/inputs/Textarea.svelte';
	import InputList from './inputs/InputList.svelte';
	import InputGrid from './inputs/InputGrid.svelte';

	let { research = $bindable(), showFeedback = false }: { research: ResearchItem; showFeedback?: boolean } = $props();

	const evaluate = (value: string) => {
		if (!value && showFeedback) return false;
		return true;
	};
</script>

<div class="divide-y divide-gray-900/10 text-gray-800 dark:divide-white/10 dark:text-gray-100">
	<div class="py-10">
		<div class="flex-1 font-semibold text-gray-600 dark:text-gray-300">Preview:</div>

		<div class="mt-6">
			<ItemCard item={research} />
		</div>
	</div>

	<div class="py-10">
		<div class="flex-1 font-semibold text-gray-600 dark:text-gray-300">Edit:</div>

		<BaseCard class="">
			<div class="px-4 py-6 *:mb-4 sm:p-8">
				<div class="flex flex-col items-start gap-4 md:flex-row">
					<Textarea bind:value={research.name} label="Name" sublabel="Internal key for the paper." class="flex-1" {evaluate} />
					<Textarea bind:value={research.title} label="Title" sublabel="The full title of the paper." class="flex-3" {evaluate} />
				</div>
				<Textarea bind:value={research.abstract} label="Abstract" sublabel="A brief summary of the paper. Can be the paper abstract, but doesn't need to be." {evaluate} />
				<Textarea bind:value={research.doi} label="DOI" sublabel="DOI number for the paper." area={research.doi ? '' : 'outline-red-400'} {evaluate} />
				<Textarea bind:value={research.type} label="Type" sublabel="Type of the paper (research paper, poster, extended abstract, ...)." area={research.type ? '' : 'outline-red-400'} {evaluate} />

				<div class="py-3 font-semibold">Publication:</div>

				<Datearea bind:value={research.published} label="Publication date" {evaluate} />
				<div class="flex flex-col items-start gap-4 lg:flex-row">
					<Textarea bind:value={research.conference} label="Conference" class="w-full lg:flex-1" {evaluate} />
					<Textarea bind:value={research.location} label="Conference location" sublabel="City, country." class="w-full lg:flex-1" {evaluate} />
				</div>

				<div class="py-3 font-semibold">Authors:</div>

				<InputList bind:items={research.authors} newItem={(): Author => ({ name: '', affiliation: '' })} title="Authors" subtitle="Information about the authors.">
					{#snippet content(item: Author)}
						<Textarea bind:value={item.name} label="Name" class="flex-1" input={{ placeholder: 'name' }} {evaluate} />
						<Textarea bind:value={item.affiliation} label="Affiliation" class="flex-1" input={{ placeholder: 'affiliation' }} {evaluate} />
					{/snippet}
				</InputList>

				<div class="py-3 font-semibold">Links:</div>

				<InputList bind:items={research.links} newItem={(): Link => ({ text: '', icon: '', href: '' })} title="Links" subtitle="Information about the links.">
					{#snippet content(item: Link)}
						<div class="flex flex-row items-start gap-4 w-full xl:flex-1">
							<Textarea bind:value={item.text} label="Title" class="flex-1" input={{ placeholder: 'title' }} {evaluate} />
							<Iconarea bind:value={item.icon} label="Icon" sublabel="See lucide.dev/icons." class="flex-1" input={{ placeholder: 'icon' }} {evaluate} />
						</div>
						<Textarea bind:value={item.href} label="URL" sublabel="Can be external URL, or internal device / tool identifier." class="flex-1" input={{ placeholder: 'https://example.com' }} {evaluate} />
					{/snippet}
				</InputList>

				<div class="py-3 font-semibold">Awards:</div>

				<InputList bind:items={research.awards} newItem={(): Award => ({ name: '', icon: '' })} title="Awards" subtitle="Awards received by the paper.">
					{#snippet content(item: Award)}
						<Textarea bind:value={item.name} label="Name" class="flex-1" input={{ placeholder: 'award' }} {evaluate} />
						<Iconarea bind:value={item.icon} label="Icon" sublabel="See lucide.dev/icons." class="flex-1" input={{ placeholder: 'icon' }} {evaluate} />
					{/snippet}
				</InputList>

				<div class="py-3 font-semibold">Tags:</div>

				<InputGrid bind:items={research.tags} newItem={(): Tag => ({ name: '' })} title="Tags" subtitle="Relevant tags for the paper.">
					{#snippet content(item: Tag)}
						<Textarea bind:value={item.name} label="" class="" input={{ placeholder: 'tag' }} {evaluate} />
					{/snippet}
				</InputGrid>
			</div>
		</BaseCard>
	</div>
</div>
