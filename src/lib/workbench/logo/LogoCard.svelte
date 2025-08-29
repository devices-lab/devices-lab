<script lang="ts">
	import type { Snippet } from 'svelte';
	import { exportPng } from '$lib/workbench/logo/export/image';
	import { exportSvgForKiCad } from '$lib/workbench/logo/export/kicad';
	import { exportDxfForAltium } from '$lib/workbench/logo/export/altium';
	import { exportSvg, exportSvgFlat, exportSvgFont } from '$lib/workbench/logo/export/svg';

	import Button from './Button.svelte';
	import ButtonGroup from './ButtonGroup.svelte';

	import { Download, Loader } from '@lucide/svelte';
	//import { sleep } from '$lib/utils';

	interface Props {
		children: Snippet;
		uid: string;
		title: string;
		subtitle: string;
	}

	const { children, uid, title, subtitle }: Props = $props();

	let clickCounter = 0;
	async function handleClick(event: Event, onclick: () => Promise<void>) {
		const button = event.currentTarget as HTMLButtonElement;
		const loadingIndicator = document.getElementById(`loading-indicator-${uid}`);

		// start spinner on button
		button.disabled = true;
		clickCounter++;
		loadingIndicator?.classList.remove('hidden');

		await onclick();

		// stop spinner on button
		button.disabled = false;
		clickCounter--;
		if (clickCounter === 0) {
			loadingIndicator?.classList.add('hidden');
		}
	}
</script>

{#snippet DownloadButton(name: string, subname: string, onclick: () => Promise<void>)}
	<Button onclick={(event: MouseEvent) => handleClick(event, onclick)}>
		<Download class="size-4 me-2 text-gray-500"/>
		<span>{name}</span>
		{#if subname}
			<span class="font-normal text-gray-500 dark:text-gray-400">/ {subname}</span>
		{/if}
	</Button>
{/snippet}

<div class="my-8 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
	<div class="relative px-4 py-5 sm:px-6">
		<div class="-mt-4 -ml-4 flex flex-wrap items-center justify-between xl:flex-nowrap">
			<div class="mt-4 ml-4">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h2>
				<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
			</div>
		</div>
		<div role="status" class="absolute end-4 top-4 hidden" id={`loading-indicator-${uid}`}>
			<Loader class="size-10 animate-spin text-blue-500" />
		</div>
	</div>
	<div class="px-4 py-5 sm:p-6">
		{@render children()}
	</div>

	<div class="relative flex flex-wrap justify-center gap-x-6 gap-y-3 px-4 py-4 sm:px-6 xl:justify-end">
		<ButtonGroup>
			{@render DownloadButton('PNG', '', () => exportPng(uid, `${uid}`, { dpi: 1200, padding: 10, background: 'transparent', monochrome: false, invert: false, threshold: 200 }))}
			{@render DownloadButton('PNG', 'BW', () => exportPng(uid, `${uid}`, { dpi: 1200, padding: 10, background: 'white', monochrome: true, invert: false, threshold: 200 }))}
		</ButtonGroup>

		<ButtonGroup>
			{@render DownloadButton('SVG', '', () => exportSvg(uid, `${uid}`))}
			{@render DownloadButton('SVG', 'Font', () => exportSvgFont(uid, `${uid}-font`))}
			{@render DownloadButton('SVG', 'Flat', () => exportSvgFlat(uid, `${uid}-flat`))}
			{@render DownloadButton('SVG', 'KiCad', () => exportSvgForKiCad(uid, `${uid}-kicad`))}
		</ButtonGroup>

		<ButtonGroup>
			{@render DownloadButton('DFX', 'Altium', () => exportDxfForAltium(uid, `${uid}-altium`))}
			<!--{@render DownloadButton('Test', '', async () => {await sleep(2000)})}-->
		</ButtonGroup>
	</div>
</div>
