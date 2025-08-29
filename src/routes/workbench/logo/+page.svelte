<script lang="ts">
	import SvgLogo from '$lib/workbench/logo/SVG_Logo.svelte';
	import SvgProject from '$lib/workbench/logo/SVG_Project.svelte';
	import SvgCircle from '$lib/workbench/logo/SVG_Circle.svelte';
	import SvgSquare from '$lib/workbench/logo/SVG_Square.svelte';
	import SvgVersion from '$lib/workbench/logo/SVG_Version.svelte';
	import SvgPill from '$lib/workbench/logo/SVG_Pill.svelte';

	import LogoCard from '$lib/workbench/logo/LogoCard.svelte';
	import { svgBackground } from '$lib/workbench/logo/utils';

	let projectName = $state('my-project');
	let projectId = $state('0037');
	let projectVersion = $state('v1.2');
	let backgroundColor = $state('#ffffff');
	let backgroundEnabled = $state(true);

	$effect(() => {
		svgBackground.set(backgroundEnabled ? backgroundColor : 'none');
	});
</script>

<div class="my-8 divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-100 shadow-sm dark:divide-white/10 dark:bg-gray-700 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
	<div class="flex flex-col gap-3 px-4 py-5 sm:p-6 md:flex-row">
		<div class="grow">
			<label for="project-name" class="block text-sm/6 font-medium text-gray-900 dark:text-white">Project Name</label>
			<div class="mt-2">
				<div class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary-600 dark:bg-white/5 dark:outline-white/10 dark:focus-within:outline-primary-500">
					<div class="shrink-0 text-base text-gray-500 select-none sm:text-sm/6 dark:text-gray-400 font-ocr">/</div>
					<input id="project-name" type="text" name="project-name" placeholder="my-project" bind:value={projectName} class="font-ocr block min-w-0 grow py-1.5 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 dark:text-white dark:placeholder:text-gray-500" />
				</div>
			</div>
		</div>
		<div class="grow">
			<label for="project-id" class="block text-sm/6 font-medium text-gray-900 dark:text-white">Project ID</label>
			<div class="mt-2">
				<input id="project-id" type="text" name="project-id" placeholder="0026" bind:value={projectId} class="font-ocr block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-primary-500" />
			</div>
		</div>
		<div class="grow">
			<label for="project-version" class="block text-sm/6 font-medium text-gray-900 dark:text-white">Project Version</label>
			<div class="mt-2">
				<input id="project-version" type="text" name="project-version" placeholder="v1.2" bind:value={projectVersion} class="font-ocr block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-primary-500" />
			</div>
		</div>
		<div class="">
			<label for="project-background" class="block text-sm/6 font-medium text-gray-900 dark:text-white">Background?</label>
			<div class="mt-2 flex flex-row">
				<div class="mx-auto my-auto me-1 flex shrink-0">
					<div class="group grid size-4 grid-cols-1">
						<input id="comments" type="checkbox" name="comments" bind:checked={backgroundEnabled} aria-describedby="comments-description" class="font-ocr col-start-1 row-start-1 cursor-pointer appearance-none rounded-sm border border-gray-300 bg-white checked:border-primary-600 checked:bg-primary-600 indeterminate:border-primary-600 indeterminate:bg-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 dark:border-white/10 dark:bg-white/5 dark:checked:border-primary-500 dark:checked:bg-primary-500 dark:indeterminate:border-primary-500 dark:indeterminate:bg-primary-500 dark:focus-visible:outline-primary-500 dark:disabled:border-white/5 dark:disabled:bg-white/10 dark:disabled:checked:bg-white/10 forced-colors:appearance-auto" />
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

<LogoCard uid={'dl-project'} title="Project" subtitle="Represents the overall project identity and its key attributes.">
	<SvgProject uid={'dl-project'} {projectName} />
</LogoCard>

<LogoCard uid={'dl-version-stack'} title="Version Stack" subtitle="Represents the project version in a stacked layout format.">
	<SvgVersion uid={'dl-version-stack'} {projectId} {projectVersion} />
</LogoCard>

<LogoCard uid={'dl-version-pill'} title="Version Pill" subtitle="Represents the project version in a pill-shaped layout format.">
	<SvgPill uid={'dl-version-pill'} {projectId} {projectVersion} />
</LogoCard>

<LogoCard uid={'dl-name'} title="Logo" subtitle="Illustrates the main logo used to represent Devices Lab.">
	<SvgLogo uid={'dl-name'} />
</LogoCard>

<LogoCard uid={'dl-circle'} title="Circle" subtitle="A circular-shaped design element that can be applied in branding or layout.">
	<SvgCircle uid={'dl-circle'} />
</LogoCard>

<LogoCard uid={'dl-square'} title="Square" subtitle="A square-shaped design element that can be applied in branding or layout.">
	<SvgSquare uid={'dl-square'} />
</LogoCard>
