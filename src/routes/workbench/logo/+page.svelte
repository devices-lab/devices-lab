<script lang="ts">
	import BaseCard from '$lib/components/BaseCard.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import BaseButton from '$lib/components/base/BaseButton.svelte';
	import IconTextButton from '$lib/components/base/IconTextButton.svelte';
	import SelectInput from '$lib/components/inputs/SelectInput.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import SVG_Icon from '$lib/workbench/logo/SVG_Icon.svelte';
	import SVG_Pill from '$lib/workbench/logo/SVG_Pill.svelte';
	import SVG_Stack from '$lib/workbench/logo/SVG_Stack.svelte';
	import SVG_StackPill from '$lib/workbench/logo/SVG_StackPill.svelte';
	import VectorCard from '$lib/workbench/logo/VectorCard.svelte';
	import { IconProps, LogoProps, ProjectProps, VersionProps, VersionPropsPill } from '$lib/workbench/logo/utils';
	import { X, Download } from '@lucide/svelte';
	import { untrack } from 'svelte';

	let projectName = $state('my-project');
	let projectId = $state('0026');
	let projectVersion = $state('v1.2');

	const sanitize = (input: string, trailingChar: string = '') => {
		return input
			.trim()
			.toLowerCase()
			.replace(/\s+/g, '-')
			.replace(/[^a-z0-9\-\.\/]/g, '')
			.replace(/^(?!\/)/, trailingChar);
	};

	$effect(() => {
		projectName = sanitize(projectName, '/');
	});
	$effect(() => {
		projectId = sanitize(projectId);
	});
	$effect(() => {
		projectVersion = sanitize(projectVersion);
	});

	type Category = 'project' | 'versionStack' | 'versionPill' | 'logo' | 'icon';

	let selectedCategory = $state<Category>('project');
</script>


<BaseCard class="mx-auto flex w-full max-w-3xl flex-col gap-3 py-6 shadow-md">
	<h1 class="my-2 mb-3 px-8 text-sm font-semibold text-primary-500">Specify your project information here:</h1>

	<div class="flex flex-col gap-3 px-8 sm:flex-row">
		<TextInput bind:value={projectName} label="Project Name" placeholder="my-project" class="flex-1" inputProps={{ class: 'font-ocr' }} />
		<TextInput bind:value={projectId} label="Project ID" placeholder="1226" class="flex-1" inputProps={{ class: 'font-ocr' }} />
		<TextInput bind:value={projectVersion} label="Project Version" placeholder="v1.2" class="flex-1" inputProps={{ class: 'font-ocr' }} />
	</div>
</BaseCard>

{#snippet CategoryButton(label: string, category: Category)}
	<button type="button" class="flex-1 grow cursor-pointer border-b-2 px-2 {selectedCategory === category ? ' border-primary-500 text-primary-600 dark:border-primary-400 dark:text-primary-400' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-white/20 dark:hover:text-gray-300'} px-1 py-4 text-center text-sm font-medium" onclick={() => (selectedCategory = category)}>
		{label}
	</button>
{/snippet}

<div class="my-6 border-b border-gray-200 dark:border-white/10">
	<nav aria-label="Tabs" class="-mb-px flex flex-col sm:flex-row">
		{@render CategoryButton('Project', 'project')}
		{@render CategoryButton('Version Stack', 'versionStack')}
		{@render CategoryButton('Version Pill', 'versionPill')}
		{@render CategoryButton('Logo', 'logo')}
		{@render CategoryButton('Icon', 'icon')}
	</nav>
</div>

<div class="relative">
	{#if selectedCategory === 'project'}
		<VectorCard uid={'dl-project'} title="Project" subtitle="Represents the overall project identity and its key attributes.">
			<SVG_Stack uid={'dl-project'} {...ProjectProps(projectName)} editable />
		</VectorCard>
	{:else if selectedCategory === 'versionStack'}
		<VectorCard uid={'dl-version-stack'} title="Version Stack" subtitle="Represents the project version in a stacked layout format.">
			<SVG_StackPill uid={'dl-version-stack'} {...VersionProps(projectId, projectVersion)} editable />
		</VectorCard>
	{:else if selectedCategory === 'versionPill'}
		<VectorCard uid={'dl-version-pill'} title="Version Pill" subtitle="Represents the project version in a pill-shaped layout format.">
			<SVG_Pill uid={'dl-version-pill'} {...VersionPropsPill(projectId, projectVersion)} editable />
		</VectorCard>
	{:else if selectedCategory === 'logo'}
		<VectorCard uid={'dl-name'} title="Logo" subtitle="Illustrates the main logo used to represent Devices Lab.">
			<SVG_Pill uid={'dl-name'} {...LogoProps()} editable />
		</VectorCard>
	{:else if selectedCategory === 'icon'}
		<VectorCard uid={'dl-icon'} title="Icon" subtitle="A generic icon design element that can be applied in various contexts.">
			<SVG_Icon uid={'dl-icon'} {...IconProps()} editable />
		</VectorCard>
	{/if}
</div>
