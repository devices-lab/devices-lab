<script lang="ts">
	import IconList from './IconList.svelte';

	import type { ResearchType } from '$lib/data/research';
	import Text from '$lib/workbench/logo/components/Text.svelte';
	import InputText from '$lib/workbench/bibtex/InputText.svelte';
	import InputArea from './InputArea.svelte';
	import BaseCard from '$lib/components/BaseCard.svelte';
	import BaseButton from '$lib/components/BaseButton.svelte';
	import { CirclePlus, CircleQuestionMark, Icon, X } from '@lucide/svelte';
	import DividerAction from '$lib/workbench/bibtex/DividerAction.svelte';
	import InputLine from './InputLine.svelte';
	import HtmlInput from './HTMLInput.svelte';
	import InputIcon from './InputIcon.svelte';

	/*
	export interface Research {
	// core information
	title: string;
	abstract: string;
	picture: string | Picture;
	authors: Author[];
	// published
	published: string;
	conference: string;
	location: string;
	// additional information
	links: Link[];
	tags: string[];
}
	*/

	let { research = $bindable() }: { research: ResearchType } = $props();

	const addAuthor = () => {
		research.authors = [...research.authors, { name: '', affiliation: '' }];
	};

	const removeAuthor = (index: number) => {
		research.authors.splice(index, 1);
		research.authors = [...research.authors];
	};

	const addLink = () => {
		research.links = [...research.links, { title: '', href: '', icon: undefined }];
	};

	const removeLink = (index: number) => {
		research.links.splice(index, 1);
		research.links = [...research.links];
	};

	const addTag = () => {
		research.tags = [...research.tags, ''];
	};

	const removeTag = (index: number) => {
		research.tags.splice(index, 1);
		research.tags = [...research.tags];
	};
</script>

<div class="divide-y divide-gray-900/10 dark:divide-white/10">
	<!-- Paper Information -->
	<div class="grid grid-cols-1 gap-x-8 gap-y-8 py-10 lg:grid-cols-3">
		<div class="px-4 sm:px-0">
			<h2 class="text-base/7 font-semibold text-gray-900 dark:text-white">Paper</h2>
			<p class="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">Information about the paper.</p>
		</div>

		<BaseCard class="md:col-span-2">
			<div class="px-4 py-6 sm:p-8">
				<InputLine>
					<InputArea bind:value={research.title} label="Title" class="col-span-full" />
					<InputArea bind:value={research.abstract} label="Abstract" class="col-span-full" />
				</InputLine>
			</div>
		</BaseCard>
	</div>

	<!-- Publication Information -->
	<div class="grid grid-cols-1 gap-x-8 gap-y-8 py-10 lg:grid-cols-3">
		<div class="px-4 sm:px-0">
			<h2 class="text-base/7 font-semibold text-gray-900 dark:text-white">Publication</h2>
			<p class="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">Information about the publication.</p>
		</div>

		<BaseCard class="md:col-span-2">
			<div class="px-4 py-6 sm:p-8">
				<div class="grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-6">
					<InputArea bind:value={research.published} label="Date (yyyy-mm-dd)" class="col-span-full" />
					<InputArea bind:value={research.conference} label="Conference" class="col-span-full" />
					<InputArea bind:value={research.location} label="Location" class="col-span-full" />
				</div>
			</div>
		</BaseCard>
	</div>

	<!-- Author Information -->
	<div class="grid grid-cols-1 gap-x-8 gap-y-8 py-10 lg:grid-cols-3">
		<div class="px-4 sm:px-0">
			<h2 class="text-base/7 font-semibold text-gray-900 dark:text-white">Author Information</h2>
			<p class="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">Information about the authors.</p>
		</div>

		<BaseCard class="md:col-span-2">
			<div class="px-4 py-6 sm:p-8">
				{#each research.authors as author, i}
					<div class="relative mb-4 flex items-center overflow-auto pe-10">
						<div class="flex flex-1 flex-col gap-2 md:flex-row md:gap-4">
							<InputArea bind:value={author.name} label="Name" class="flex-1" input={{ placeholder: 'name' }} />
							<InputArea bind:value={author.affiliation} label="Affiliation" class="flex-1" input={{ placeholder: 'affiliation' }} />
						</div>
						<BaseButton class="absolute top-6.5 right-0" onclick={() => removeAuthor(i)}>
							<X class="size-6 text-red-600 hover:opacity-30" />
						</BaseButton>
					</div>
				{/each}
				<DividerAction onclick={() => addAuthor()} class="py-2" />
			</div>
		</BaseCard>
	</div>

	<!-- Links -->
	<div class="grid grid-cols-1 gap-x-8 gap-y-8 py-10 lg:grid-cols-3">
		<div class="px-4 sm:px-0">
			<h2 class="text-base/7 font-semibold text-gray-900 dark:text-white">Links</h2>
			<p class="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">Links to the paper and additional resources.</p>
		</div>

		<BaseCard class="md:col-span-2">
			<div class="px-4 py-6 sm:p-8">
				{#each research.links as link, i}
					<div class="relative mb-10 flex items-center overflow-auto pe-10">
						<div class="flex flex-1 flex-col flex-wrap gap-2 md:flex-row md:gap-x-4">
							<InputArea bind:value={link.title} label="Title" class="flex-1" input={{ placeholder: 'title' }} />
							<InputIcon bind:value={link.icon} label="Icon" class="flex-1" input={{ placeholder: 'icon' }} />
							<InputArea bind:value={link.href} label="URL" class="w-full" input={{ placeholder: 'https://example.com' }} />
						</div>
						<BaseButton class="absolute top-1/2 right-0 mt-3 -translate-y-1/2" onclick={() => removeLink(i)}>
							<X class="size-6 text-red-600 hover:opacity-30" />
						</BaseButton>
					</div>
				{/each}
				<DividerAction onclick={() => addLink()} />
			</div>
		</BaseCard>
	</div>

	<!-- Tags -->
	<div class="grid grid-cols-1 gap-x-8 gap-y-8 py-10 lg:grid-cols-3">
		<div class="px-4 sm:px-0">
			<h2 class="text-base/7 font-semibold text-gray-900 dark:text-white">Tags</h2>
			<p class="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">Relevant tags for the research.</p>
		</div>

		<BaseCard class="md:col-span-2">
			<div class="px-4 py-6 sm:p-8">
				{#each research.tags as tag, i}
					<div class="relative mb-4 flex items-center overflow-auto pe-10">
						<InputArea bind:value={research.tags[i]} label="" class="flex-1" input={{ placeholder: 'tag' }} />
						<BaseButton class="absolute top-1.5 right-0" onclick={() => removeTag(i)}>
							<X class="size-6 text-red-600 hover:opacity-30" />
						</BaseButton>
					</div>
				{/each}
				<DividerAction onclick={() => addTag()} class="py-2" />
			</div>
		</BaseCard>
	</div>
</div>
