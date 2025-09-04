<script lang="ts">
	import BaseCard from '$lib/components/BaseCard.svelte';
	import type { ResearchLibrary, ResearchType } from '$lib/data/research';
	import ResearchInput from '$lib/workbench/bibtex/ResearchInput.svelte';
	import { Cross, Paperclip, X } from '@lucide/svelte';

	import LogicGlue from '$lib/assets/img/research/logicglue.png';
	import BaseButton from '$lib/components/BaseButton.svelte';
	import ResearchItem from '$lib/research/ItemCard.svelte';
	import BaseInput from '$lib/components/BaseInput.svelte';
	import Textarea from '$lib/workbench/bibtex/inputs/Textarea.svelte';
	import Selectarea from '$lib/workbench/bibtex/inputs/Selectarea.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	$inspect(data.research);
	const emptyResearchData: ResearchType = {
		name: '',
		title: '',
		abstract: '',
		picture: '',
		authors: [],
		published: {
			year: 0,
			month: 0,
			day: 0
		},
		conference: '',
		location: '',
		links: [],
		tags: [],
		awards: []
	};

	const clearData = () => {
		researchData = { ...emptyResearchData };
		doi = '';
		selected = '';
	};
	const loadData = () => {
		if (selected && data.researchLibrary[selected]) {
			researchData = data.researchLibrary[selected];
		}
	};
	const downloadData = () => {};

	
	let researchData: ResearchType = $state({ ...emptyResearchData });



	const researchSelect = $derived([
		{ key: '', title: 'undefined' },
		...Object.entries(data.researchLibrary).map(([key, item]) => ({
			key,
			title: item.name
		}))
	]);

	$inspect(researchSelect)

	let doi = $state('');
	let selected = $state('');
</script>

<BaseCard class="flex flex-col items-center justify-between gap-3 bg-slate-200/50! sm:flex-row dark:bg-slate-800!">
	<div class="flex flex-1 items-center gap-3">
		<Textarea bind:value={doi} label="Enter DOI:" placeholder="Enter DOI" class="flex-1" />
		<BaseButton theme="primary" class="mt-6 rounded-lg" onclick={downloadData}>Load</BaseButton>
	</div>

	<div class="mx-4 text-xl font-light">or</div>

	<div class="flex flex-1 items-center gap-3">
		<Selectarea bind:value={selected} items={researchSelect} label="Select an existing research item:" class="flex-1" />
		<BaseButton theme="primary" class="mt-6 rounded-lg" onclick={loadData}>Load</BaseButton>
	</div>

	<div class="mx-4 text-xl font-light">or</div>

	<BaseButton theme="link-danger" class="ms-auto flex items-center gap-1 text-sm" onclick={clearData}>
		<X />
		Clear
	</BaseButton>
</BaseCard>

<ResearchInput bind:research={researchData} />
