<script lang="ts">
	import type { ResearchType, Author, Link, Tag, Award } from '$lib/data/research';

	import InputSection from '$lib/workbench/bibtex/components/InputSection.svelte';
	import InputSectionList from '$lib/workbench/bibtex/components/InputSectionList.svelte';
	import Textarea from '$lib/workbench/bibtex/inputs/Textarea.svelte';
	import Iconarea from '$lib/workbench/bibtex/inputs/Iconarea.svelte';
	import Datearea from '$lib/workbench/bibtex/inputs/Datearea.svelte';

	let { research = $bindable() }: { research: ResearchType } = $props();

	$inspect(research.published)
</script>

<div class="divide-y divide-gray-900/10 dark:divide-white/10">
	<!-- Paper Information -->
	<InputSection title="Paper" subtitle="Information about the publication.">
		<Textarea bind:value={research.title} label="Title" class="col-span-full" />
		<Textarea bind:value={research.abstract} label="Abstract" class="col-span-full" />
	</InputSection>

	<!-- Publication Information -->
	<InputSection title="Publication" subtitle="Information about the publication.">
		<Datearea bind:value={research.published} label="Date" class="flex-1" />
		<Textarea bind:value={research.conference} label="Conference" class="" />
		<Textarea bind:value={research.location} label="Location" class="" />
	</InputSection>

	<!-- Author Information -->
	<InputSectionList bind:items={research.authors} title="Authors" subtitle="Information about the authors." resetClass="mt-3">
		{#snippet content(item: Author)}
			<Textarea bind:value={item.name} label="Name" class="flex-1" input={{ placeholder: 'name' }} />
			<Textarea bind:value={item.affiliation} label="Affiliation" class="flex-1" input={{ placeholder: 'affiliation' }} />
		{/snippet}
	</InputSectionList>

	<!-- Links -->
	<InputSectionList bind:items={research.links} title="Links" subtitle="Information about the links." resetClass="mt-3">
		{#snippet content(item: Link)}
			<Textarea bind:value={item.title} label="Title" class="flex-1" input={{ placeholder: 'title' }} />
			<Iconarea bind:value={item.icon} label="Icon" class="flex-1" input={{ placeholder: 'icon' }} />
			<Textarea bind:value={item.href} label="URL" class="w-full" input={{ placeholder: 'https://example.com' }} />
		{/snippet}
	</InputSectionList>

	<!-- Awards -->
	<InputSectionList bind:items={research.awards} title="Awards" subtitle="Awards received by the paper.">
		{#snippet content(item: Award)}
			<Textarea bind:value={item.name} label="" class="flex-1" input={{ placeholder: 'award' }} />
		{/snippet}
	</InputSectionList>

	<!-- Tags -->
	<InputSectionList bind:items={research.tags} title="Tags" subtitle="Relevant tags for the paper.">
		{#snippet content(item: Tag)}
			<Textarea bind:value={item.string} label="" class="flex-1" input={{ placeholder: 'tag' }} />
		{/snippet}
	</InputSectionList>
</div>
