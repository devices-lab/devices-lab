<script lang="ts">
	import SVG_Icon from '$lib/workbench/logo/SVG_Icon.svelte';
	import SVG_Pill from '$lib/workbench/logo/SVG_Pill.svelte';
	import SVG_Stack from '$lib/workbench/logo/SVG_Stack.svelte';
	import SVG_StackPill from '$lib/workbench/logo/SVG_StackPill.svelte';

	import VectorCard from '$lib/workbench/logo/VectorCard.svelte';
	import { IconProps, LogoProps, ProjectProps, VersionProps, VersionPropsPill } from '$lib/workbench/logo/utils';
	import BaseCheckbox from '$lib/components/BaseCheckbox.svelte';
	import BaseInput from '$lib/components/BaseInput.svelte';

	let projectName = $state('my-project');
	let projectId = $state('0037');
	let projectVersion = $state('v1.2');

	type Category = 'project' | 'versionStack' | 'versionPill' | 'logo' | 'icon';

	let selectedCategory = $state<Category>('project');
</script>

<div class="my-8 divide-y divide-gray-200 overflow-hidden rounded-lg bg-zinc-100 shadow-sm dark:divide-white/10 dark:bg-zinc-700 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
	<div class="flex flex-col gap-3 px-4 py-5 sm:p-6 md:flex-row">
		<div class="grow">
			<label for="project-name" class="block text-sm/6 font-medium text-gray-900 dark:text-white">Project Name</label>
			<div class="mt-2">
				<div class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary-600 dark:bg-white/5 dark:outline-white/10 dark:focus-within:outline-primary-500">
					<div class="shrink-0 font-ocr text-base text-gray-500 select-none sm:text-sm/6 dark:text-gray-400">/</div>
					<input id="project-name" type="text" name="project-name" placeholder="my-project" bind:value={projectName} class="block min-w-0 grow py-1.5 pr-3 font-ocr text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 dark:text-white dark:placeholder:text-gray-500" />
				</div>
			</div>
		</div>
		<div class="grow">
			<label for="project-id" class="block text-sm/6 font-medium text-gray-900 dark:text-white">Project ID</label>
			<div class="mt-2">
				<input id="project-id" type="text" name="project-id" placeholder="0026" bind:value={projectId} class="block w-full rounded-md bg-white px-3 py-1.5 font-ocr text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-primary-500" />
			</div>
		</div>
		<div class="grow">
			<label for="project-version" class="block text-sm/6 font-medium text-gray-900 dark:text-white">Project Version</label>
			<div class="mt-2">
				<input id="project-version" type="text" name="project-version" placeholder="v1.2" bind:value={projectVersion} class="block w-full rounded-md bg-white px-3 py-1.5 font-ocr text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-primary-500" />
			</div>
		</div>
	</div>
</div>

{#snippet CategoryButton(label: string, category: Category)}
	<button type="button" class="flex-1 grow cursor-pointer border-b-2 px-2 {selectedCategory === category ? ' border-primary-500 text-primary-600 dark:border-primary-400 dark:text-primary-400' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-white/20 dark:hover:text-gray-300'} px-1 py-4 text-center text-sm font-medium" onclick={() => (selectedCategory = category)}>
		{label}
	</button>
{/snippet}

<div class="border-b border-gray-200 dark:border-white/10">
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
