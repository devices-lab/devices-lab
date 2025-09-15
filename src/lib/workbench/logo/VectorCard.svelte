<script lang="ts">
	import Checkbox from '$lib/components/base/Checkbox.svelte';
	import IconTextButton from '$lib/components/base/IconTextButton.svelte';
	import BaseCard from '$lib/components/BaseCard.svelte';
	import Notification from '$lib/components/Notification.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import { devMode, devModeLocal, overrideDevMode } from '$lib/utils/utils';
	import ButtonGroup from '$lib/workbench/logo/editor/ButtonGroup.svelte';
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

	let notification: Notification | undefined = $state();
</script>

{#snippet DownloadButton(name: string, subname: string, onclick: () => Promise<void>)}
	{#snippet label()}
		<span>{name}</span>
		{#if subname}
			<span class="font-normal text-current/40">/ {subname}</span>
		{/if}
	{/snippet}
	<IconTextButton class="border-1 border-focus px-4 py-2 shadow-sm bg-white hover:text-current/70" onclick={(event: MouseEvent) => handleClick(event, onclick)} iconText={{ text: { text: label, class: '' }, icon: { icon: Download, class: 'size-4 text-gray-500' } }} />
{/snippet}

<Notification bind:this={notification} />

<BaseCard class="divide-y divide-gray-100 p-4 ">
	<div class="relative px-4 py-5 sm:px-6">
		<div class="-mt-4 -ml-4 flex flex-wrap items-center justify-between xl:flex-nowrap">
			<div class="mt-4 ml-4">
				<h2 class="text-2xl font-semibold">{title}</h2>
				<p class="mt-1 text-sm text-current/60">{subtitle}</p>
			</div>

			{#if devEnabled}
				<div class="m-4 sm:m-0">
					<Checkbox bind:checked={$devModeLocal} text={{ text: 'Dev Mode', class: 'text-sm font-semibold text-primary' }} class="gap-2" />
				</div>
			{/if}
		</div>
		<Spinner {loading} class="absolute end-4 top-4" />
	</div>

	<div class="relative flex flex-wrap justify-center gap-x-6 gap-y-3 p-4 sm:p-4 bg-gray-50 text-sm">
		<ButtonGroup>
			{@render DownloadButton('PNG', '', () => exportPng(uid, `${uid}`, { dpi: 1200, padding: 10, background: 'transparent', monochrome: false, invert: false, threshold: 200 }))}
			{@render DownloadButton('PNG', 'BW', () => exportPng(uid, `${uid}`, { dpi: 1200, padding: 10, background: 'white', monochrome: true, invert: false, threshold: 200 }))}
		</ButtonGroup>

		<ButtonGroup>
			{@render DownloadButton('SVG', '', () => exportSvg(uid, `${uid}`))}
			{@render DownloadButton('SVG', 'Font', () => exportSvgFont(uid, `${uid}-font`))}
			{@render DownloadButton('SVG', 'KiCad', () => exportSvgForKiCad(uid, `${uid}-kicad`))}
		</ButtonGroup>

		<!--<ButtonGroup>
				{@render DownloadButton('DFX', 'Altium', () => exportDxfForAltium(uid, `${uid}-altium`))}
				{@render DownloadButton('Test', '', async () => {await sleep(2000)})}
			</ButtonGroup>-->
	</div>

	{@render children()}
</BaseCard>
