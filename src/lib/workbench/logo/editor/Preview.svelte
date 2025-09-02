<script lang="ts">
	import { onDestroy, onMount, type Snippet } from 'svelte';
	import { Download, Loader, Save, TestTube, Upload } from '@lucide/svelte';

	import { GENERATOR_DELAY_MS } from '../utils';
	import { generateSvgTextFlat } from '../export/svg';
	import { generateSvgForKiCad } from '../export/kicad';

	import { devMode } from '$lib/utils';

	import BaseButton from '$lib/components/BaseButton.svelte';
	import Checkbox from '$lib/workbench/logo/editor/Checkbox.svelte';
	import Notification from '$lib/components/Notification.svelte';

	interface Props {
		uid: string;
		children: Snippet;
		config: Snippet;
		dataString: string;
		data: Record<string, any> | undefined;
	}

	let { uid, children, config, dataString, data = $bindable() }: Props = $props();

	//======================================================================================//

	let notification: Notification | undefined = $state();
	let localDev: boolean = $state(true);

	//======================================================================================//

	let showPreview = $state(true);
	let autoUpdate = $state(false);

	let svgFlat: Promise<SVGSVGElement | undefined> = $state(Promise.resolve(undefined));
	let svgKicad: Promise<SVGSVGElement | undefined> = $state(Promise.resolve(undefined));
	let timeout: number;

	export const updatePreview = () => {
		if (autoUpdate) {
			update();
		}
	};

	function update(timeoutDuration = GENERATOR_DELAY_MS) {
		// make promise pending
		svgFlat = new Promise(() => {});
		svgKicad = new Promise(() => {});

		clearTimeout(timeout);
		timeout = setTimeout(() => {
			svgFlat = generateSvgTextFlat(uid);
			svgKicad = generateSvgForKiCad(uid);
		}, timeoutDuration);
	}

	//======================================================================================//

	function download() {
		const link = document.createElement('a');
		link.href = URL.createObjectURL(new Blob([dataString], { type: 'text/plain' }));
		link.download = `${uid}.txt`;
		link.click();
		notification?.show('success', 'Download ready!');
	}

	export function save(user: boolean = true) {
		localStorage.setItem(`logo-${user ? 'user' : 'auto'}-${uid}`, dataString);
		if (user) {
			notification?.show('success', 'Successfully saved!');
		}
	}

	export function load(user: boolean = true) {
		const savedData = localStorage.getItem(`logo-${user ? 'user' : 'auto'}-${uid}`);
		if (savedData) {
			data = JSON.parse(savedData);
			if (user) {
				notification?.show('success', 'Successfully loaded!');
			}
		}
	}

	// Load data on component mount
	onMount(() => {
		load(false);

		// Auto-save on component destroy
		onDestroy(() => {
			save(false);
		});
	});
</script>

<Notification bind:this={notification} />

<div class="absolute top-0 right-0 z-10 overflow-hidden">
	<Checkbox bind:checked={localDev} onchange={() => updatePreview()} class="rounded-lg p-2">
		<span class="text-sm font-semibold text-primary-600 dark:text-primary-100">Dev Mode?</span>
	</Checkbox>
</div>

{#if $devMode && localDev}
	<div class="lg:flex">
		<div class="flex flex-col gap-y-6 p-6 lg:w-1/2">
			<div class="flex flex-col gap-y-2">
				<div class="flex items-center justify-between text-lg font-medium text-gray-900 dark:text-gray-100">
					Parameters
					<BaseButton onclick={download} class="flex items-center py-1 text-sm">
						<Download class="mr-2 size-4" />
						Download
					</BaseButton>
				</div>

				<div class="flex items-center justify-between text-gray-900 dark:text-gray-100">
					<span class="text-sm">Local storage:</span>

					<div class="flex gap-x-2">
						<BaseButton theme="link-secondary" onclick={load} class="flex items-center py-1 text-sm">
							<Upload class="mr-2 size-4" />
							Load
						</BaseButton>
						<BaseButton theme="link-secondary" onclick={save} class="flex items-center py-1 text-sm">
							<Save class="mr-2 size-4" />
							Save
						</BaseButton>
					</div>
				</div>
			</div>

			{@render config()}
		</div>

		<div class="mx-0 shrink border-s-1 border-gray-200"></div>

		<div class="flex flex-col gap-y-6 p-6 lg:w-1/2">
			<div class="flex gap-x-4">
				<div class="flex flex-col md:w-full">
					<h3 class="mb-2 font-semibold text-gray-900 dark:text-gray-100">Preview:</h3>
					
						{@render children()}
				
				</div>
			</div>

			<div class="mt-15 mb-6 flex flex-col justify-center rounded-lg">
				<BaseButton onclick={() => update(0)} type="button">Generate</BaseButton>
				<Checkbox bind:checked={autoUpdate} onchange={() => updatePreview()} class="rounded-lg p-2">
					<span class="text-sm font-medium text-primary-600 dark:text-primary-100">Auto generate?</span>
				</Checkbox>
			</div>

			{#snippet SVGPreview(svg: Promise<SVGSVGElement | undefined>, title: string)}
				<div class="mt-8 flex min-h-30 flex-col">
					<h3 class="mt-6 mb-2 font-semibold text-gray-900 md:mt-0 dark:text-gray-100">{title}:</h3>
					<div class="justify-middle flex size-full items-center justify-center">
						{#await svg}
							<Loader class="size-10 animate-spin text-blue-500" />
						{:then value}
							{#if value}
								{@html value.outerHTML}
							{:else}
								<p class="my-10 text-sm text-gray-500 italic">No SVG generated</p>
							{/if}
						{:catch error}
							<p class="text-red-500 italic">Something went wrong: {error.message}</p>
						{/await}
					</div>
				</div>
			{/snippet}

			{#if showPreview}
				<div class="h-full gap-4">
					{@render SVGPreview(svgFlat, 'SVG (text as path)')}
					{@render SVGPreview(svgKicad, 'SVG (strokes as path)')}
				</div>
			{/if}
		</div>
	</div>
{:else}
	<div class="m-4 md:h-50">
		{@render children()}
	</div>
{/if}
