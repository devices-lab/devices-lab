<script lang="ts">
	import SvgLogo from '$lib/workbench/logo/SVG_Logo.svelte';
	import SvgProject from '$lib/workbench/logo/SVG_Project.svelte';
	import SvgCircle from '$lib/workbench/logo/SVG_Circle.svelte';
	import SvgSquare from '$lib/workbench/logo/SVG_Square.svelte';
	import SvgVersion from '$lib/workbench/logo/SVG_Version.svelte';
	import SvgPill from '$lib/workbench/logo/SVG_Pill.svelte';

	import LogoCard from '$lib/workbench/logo/LogoCard.svelte';
	import { svgBackground } from '$lib/workbench/logo/utils';
	import Checkbox from '$lib/workbench/logo/editor/Checkbox.svelte';

	import { devMode, devModeLocal } from '$lib/utils';

	let projectName = $state('my-project');
	let projectId = $state('0037');
	let projectVersion = $state('v1.2');
	let backgroundColor = $state('#ffffff');
	let backgroundEnabled = $state(true);

	$effect(() => {
		svgBackground.set(backgroundEnabled ? backgroundColor : 'none');
	});

	type Category = 'project' | 'versionStack' | 'versionPill' | 'logo' | 'circle' | 'square';

	let selectedCategory = $state<Category>('project');

	let generators: Record<Category, { save: () => void; load: () => void } | undefined> = $state({
		project: undefined,
		versionStack: undefined,
		versionPill: undefined,
		logo: undefined,
		circle: undefined,
		square: undefined
	});
</script>

<div class="my-8 divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-100 shadow-sm dark:divide-white/10 dark:bg-gray-700 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
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
		<div class="">
			<label for="project-background" class="block text-sm/6 font-medium text-gray-900 dark:text-white">Background?</label>
			<div class="mt-2 flex flex-row">
				<div class="mx-auto my-auto me-1 flex shrink-0">
					<div class="group grid size-4 grid-cols-1">
						<input id="comments" type="checkbox" name="comments" bind:checked={backgroundEnabled} aria-describedby="comments-description" class="col-start-1 row-start-1 cursor-pointer appearance-none rounded-sm border border-gray-300 bg-white font-ocr checked:border-primary-600 checked:bg-primary-600 indeterminate:border-primary-600 indeterminate:bg-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 dark:border-white/10 dark:bg-white/5 dark:checked:border-primary-500 dark:checked:bg-primary-500 dark:indeterminate:border-primary-500 dark:indeterminate:bg-primary-500 dark:focus-visible:outline-primary-500 dark:disabled:border-white/5 dark:disabled:bg-white/10 dark:disabled:checked:bg-white/10 forced-colors:appearance-auto" />
						<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25 dark:group-has-disabled:stroke-white/25">
							<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
							<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
						</svg>
					</div>
				</div>

				<input disabled={!backgroundEnabled} id="project-background" type="color" name="project-background" bind:value={backgroundColor} title="Choose your color" placeholder="#ffffff" class="block h-9 w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 not-disabled:cursor-pointer placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 disabled:border-gray-50 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-primary-500 dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20" />
			</div>
		</div>
	</div>
</div>

{#snippet CategoryButton(label: string, category: Category)}
	<button type="button" class="grow cursor-pointer border-b-2 {selectedCategory === category ? ' border-primary-500 text-primary-600 dark:border-primary-400 dark:text-primary-400' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-white/20 dark:hover:text-gray-300'} px-1 py-4 text-center text-sm font-medium" onclick={() => (selectedCategory = category)}>
		{label}
	</button>
{/snippet}

<div>
	<!--<div class="grid grid-cols-1 sm:hidden">
		<select aria-label="Select a tab" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-gray-100 dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-indigo-500">
			<option>My Account</option>
			<option>Company</option>
			<option selected>Team Members</option>
			<option>Billing</option>
		</select>
		<svg viewBox="0 0 16 16" fill="currentColor" data-slot="icon" aria-hidden="true" class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500 dark:fill-gray-400">
			<path d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
		</svg>
	</div>-->
	<div class=" sm:block">
		<div class="border-b border-gray-200 dark:border-white/10">
			<nav aria-label="Tabs" class="-mb-px flex">
				{@render CategoryButton('Project', 'project')}
				{@render CategoryButton('Version Stack', 'versionStack')}
				{@render CategoryButton('Version Pill', 'versionPill')}
				{@render CategoryButton('Logo', 'logo')}
				{@render CategoryButton('Circle', 'circle')}
				{@render CategoryButton('Square', 'square')}
			</nav>
		</div>
	</div>
</div>

<!--
<LogoCard uid={'dl-project'} title="Project" subtitle="Represents the overall project identity and its key attributes." selected={selectedCategory === 'project'}>
	<SvgProject bind:this={generators.project} uid={'dl-project'} {projectName}/>
</LogoCard>

<LogoCard uid={'dl-version-stack'} title="Version Stack" subtitle="Represents the project version in a stacked layout format." selected={selectedCategory === 'versionStack'}>
	<SvgVersion bind:this={generators.versionStack} uid={'dl-version-stack'} {projectId} {projectVersion} class="md:h-50" />
</LogoCard>

<LogoCard uid={'dl-version-pill'} title="Version Pill" subtitle="Represents the project version in a pill-shaped layout format." selected={selectedCategory === 'versionPill'}>
	<SvgPill bind:this={generators.versionPill} uid={'dl-version-pill'} {projectId} {projectVersion} class="md:h-50" />
</LogoCard>

<LogoCard uid={'dl-name'} title="Logo" subtitle="Illustrates the main logo used to represent Devices Lab." selected={selectedCategory === 'logo'}>
	<SvgLogo bind:this={generators.logo} uid={'dl-name'} />
</LogoCard>

<LogoCard uid={'dl-circle'} title="Circle" subtitle="A circular-shaped design element that can be applied in branding or layout." selected={selectedCategory === 'circle'}>
	<SvgCircle bind:this={generators.circle} uid={'dl-circle'} />
</LogoCard>

<LogoCard uid={'dl-square'} title="Square" subtitle="A square-shaped design element that can be applied in branding or layout." selected={selectedCategory === 'square'}>
	<SvgSquare bind:this={generators.square} uid={'dl-square'}  />
</LogoCard>
-->
<div class="relative">
	{#if selectedCategory === 'project'}
		<LogoCard uid={'dl-project'} title="Project" subtitle="Represents the overall project identity and its key attributes.">
			<SvgProject bind:this={generators.project} uid={'dl-project'} {projectName} />
		</LogoCard>
	{:else if selectedCategory === 'versionStack'}
		<LogoCard uid={'dl-version-stack'} title="Version Stack" subtitle="Represents the project version in a stacked layout format.">
			<SvgVersion bind:this={generators.versionStack} uid={'dl-version-stack'} {projectId} {projectVersion} />
		</LogoCard>
	{:else if selectedCategory === 'versionPill'}
		<LogoCard uid={'dl-version-pill'} title="Version Pill" subtitle="Represents the project version in a pill-shaped layout format.">
			<SvgPill bind:this={generators.versionPill} uid={'dl-version-pill'} {projectId} {projectVersion} />
		</LogoCard>
	{:else if selectedCategory === 'logo'}
		<LogoCard uid={'dl-name'} title="Logo" subtitle="Illustrates the main logo used to represent Devices Lab.">
			<SvgLogo bind:this={generators.logo} uid={'dl-name'} />
		</LogoCard>
	{:else if selectedCategory === 'circle'}
		<LogoCard uid={'dl-circle'} title="Circle" subtitle="A circular-shaped design element that can be applied in branding or layout.">
			<SvgCircle bind:this={generators.circle} uid={'dl-circle'} />
		</LogoCard>
	{:else if selectedCategory === 'square'}
		<LogoCard uid={'dl-square'} title="Square" subtitle="A square-shaped design element that can be applied in branding or layout.">
			<SvgSquare bind:this={generators.square} uid={'dl-square'} />
		</LogoCard>
	{/if}

	{#if $devMode}
		<div class="absolute top-0 right-0 z-10 translate-y-[80%] overflow-hidden">
			<Checkbox bind:checked={$devModeLocal} class="rounded-lg p-2">
				<span class="text-sm font-semibold text-primary-600 dark:text-primary-100">Dev Mode?</span>
			</Checkbox>
		</div>
	{/if}
</div>
