<script lang="ts">
	import BaseCard from '$lib/components/BaseCard.svelte';
	import BaseCheckbox from '$lib/components/interactive/BaseCheckbox.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import { devMode, devModeLocal, overrideDevMode } from '$lib/utils/utils';
	import Button from '$lib/workbench/logo/editor/Button.svelte';
	import ButtonGroup from '$lib/workbench/logo/editor/ButtonGroup.svelte';
	import { exportDxfForAltium } from '$lib/workbench/logo/export/altium';
	import { exportPng } from '$lib/workbench/logo/export/image';
	import { exportSvgForKiCad } from '$lib/workbench/logo/export/kicad';
	import { exportSvg, exportSvgFont } from '$lib/workbench/logo/export/svg';
	import { Download } from '@lucide/svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		uid: string;
		title: string;
		subtitle: string;
	}

	let { children, uid, title, subtitle }: Props = $props();

	const devEnabled = $derived($devMode || $overrideDevMode);

	let loading = $state(false);

	let clickCounter = 0;
	async function handleClick(event: Event, onclick: () => Promise<void>) {
		const button = event.currentTarget as HTMLButtonElement;

		// start spinner on button
		button.disabled = true;
		clickCounter++;
		loading = true;

		await onclick();

		// stop spinner on button
		button.disabled = false;
		clickCounter--;
		if (clickCounter === 0) {
			loading = false;
		}
	}
</script>

{#snippet DownloadButton(name: string, subname: string, onclick: () => Promise<void>)}
	<Button onclick={(event: MouseEvent) => handleClick(event, onclick)}>
		<Download class="me-2 size-4 text-gray-500" />
		<span>{name}</span>
		{#if subname}
			<span class="font-normal text-gray-500 dark:text-gray-400">/ {subname}</span>
		{/if}
	</Button>
{/snippet}

<BaseCard class="divide-y divide-gray-100 p-0!">
	<div class="relative px-4 py-5 sm:px-6">
		<div class="-mt-4 -ml-4 flex flex-wrap items-center justify-between xl:flex-nowrap">
			<div class="mt-4 ml-4">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h2>
				<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
			</div>

			{#if devEnabled}
				<div class="m-4 sm:m-0">
					<BaseCheckbox bind:checked={$devModeLocal}>
						<span class="text-sm font-semibold text-primary-600 dark:text-primary-100">Dev Mode?</span>
					</BaseCheckbox>
				</div>
			{/if}
		</div>
		<Spinner {loading} class="absolute end-4 top-4" />
	</div>

	<div>
		{@render children()}
	</div>

	<div class="relative flex flex-wrap justify-center gap-x-6 gap-y-3 px-4 py-4 sm:px-6">
		<ButtonGroup>
			{@render DownloadButton('PNG', '', () => exportPng(uid, `${uid}`, { dpi: 1200, padding: 10, background: 'transparent', monochrome: false, invert: false, threshold: 200 }))}
			{@render DownloadButton('PNG', 'BW', () => exportPng(uid, `${uid}`, { dpi: 1200, padding: 10, background: 'white', monochrome: true, invert: false, threshold: 200 }))}
		</ButtonGroup>

		<ButtonGroup>
			{@render DownloadButton('SVG', '', () => exportSvg(uid, `${uid}`))}
			{@render DownloadButton('SVG', 'Font', () => exportSvgFont(uid, `${uid}-font`))}
			{@render DownloadButton('SVG', 'KiCad', () => exportSvgForKiCad(uid, `${uid}-kicad`))}
		</ButtonGroup>

		<ButtonGroup>
			{@render DownloadButton('DFX', 'Altium', () => exportDxfForAltium(uid, `${uid}-altium`))}
			<!--{@render DownloadButton('Test', '', async () => {await sleep(2000)})}-->
		</ButtonGroup>
	</div>
</BaseCard>
