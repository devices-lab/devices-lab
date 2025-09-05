<script lang="ts">
	import type { Author, Award, Link, ResearchItem, Tag } from '$lib/data/research';

	import BaseCard from '$lib/components/BaseCard.svelte';
	import ItemCard from '$lib/research/ItemCard.svelte';
	import Datearea from '$lib/workbench/bibtex/inputs/Datearea.svelte';
	import Iconarea from '$lib/workbench/bibtex/inputs/Iconarea.svelte';
	import Textarea from '$lib/workbench/bibtex/inputs/Textarea.svelte';
	import InputList from './inputs/InputList.svelte';

	let { research = $bindable() }: { research: ResearchItem } = $props();
</script>

<div class="divide-y divide-gray-900/10 dark:divide-white/10">
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
					<Textarea bind:value={research.name} label="Name" sublabel="A very short title for the paper, typically one or two words." class="flex-1" />
					<Textarea bind:value={research.title} label="Title" sublabel="The full title of the paper." class="flex-3" />
				</div>
				<Textarea bind:value={research.abstract} label="Abstract" sublabel="A brief summary of the paper. Can be the paper abstract, but doesn't need to be." />

				<div class="py-3 font-semibold">Publication:</div>

				<Datearea bind:value={research.published} label="Publication date" />
				<div class="flex flex-col items-start gap-4 lg:flex-row">
					<Textarea bind:value={research.conference} label="Conference" class="w-full lg:flex-1" />
					<Textarea bind:value={research.location} label="Conference location" sublabel="City, country." class="w-full lg:flex-1" />
				</div>

				<div class="py-3 font-semibold">Authors:</div>

				<InputList bind:items={research.authors} newItem={(): Author => ({ name: '', affiliation: '' })} title="Authors" subtitle="Information about the authors.">
					{#snippet content(item: Author)}
						<Textarea bind:value={item.name} label="Name" class="flex-1" input={{ placeholder: 'name' }} />
						<Textarea bind:value={item.affiliation} label="Affiliation" class="flex-1" input={{ placeholder: 'affiliation' }} />
					{/snippet}
				</InputList>

				<div class="py-3 font-semibold">Links:</div>

				<InputList bind:items={research.links} newItem={(): Link => ({ title: '', icon: '', href: '' })} title="Links" subtitle="Information about the links.">
					{#snippet content(item: Link)}
						<Textarea bind:value={item.title} label="Title" class="md:flex-1 xl:flex-2" input={{ placeholder: 'title' }} />
						<Iconarea bind:value={item.icon} label="Icon" sublabel="See lucide.dev/icons." class="truncate text-nowrap md:flex-1 xl:flex-2" input={{ placeholder: 'icon' }} />
						<Textarea bind:value={item.href} label="URL" sublabel="Can be external URL, or internal device / tool identifier." class="w-full xl:flex-3" input={{ placeholder: 'https://example.com' }} />
					{/snippet}
				</InputList>

				<div class="py-3 font-semibold">Awards:</div>

				<InputList bind:items={research.awards} newItem={(): Award => ({ name: '' })} title="Awards" subtitle="Awards received by the paper." resetClass="-mt-1.5">
					{#snippet content(item: Award)}
						<Textarea bind:value={item.name} label="" class="flex-1" input={{ placeholder: 'award' }} />
					{/snippet}
				</InputList>

				<div class="py-3 font-semibold">Tags:</div>

				<InputList bind:items={research.tags} newItem={(): Tag => ({ name: '' })} title="Tags" subtitle="Relevant tags for the paper." resetClass="-mt-1.5">
					{#snippet content(item: Tag)}
						<Textarea bind:value={item.name} label="" class="flex-1" input={{ placeholder: 'tag' }} />
					{/snippet}
				</InputList>
			</div>
		</BaseCard>
	</div>
</div>
