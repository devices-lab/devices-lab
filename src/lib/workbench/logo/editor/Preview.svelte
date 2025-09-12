<script lang="ts">
	import Notification from '$lib/components/Notification.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import BaseButton from '$lib/components/base/BaseButton.svelte';
	import Checkbox from '$lib/components/base/Checkbox.svelte';
	import IconTextButton from '$lib/components/base/IconTextButton.svelte';
	import { devMode, devModeLocal, overrideDevMode } from '$lib/utils/utils';
	import { generateSvgForKiCad } from '$lib/workbench/logo/export/kicad';
	import { generateSvgTextFlat } from '$lib/workbench/logo/export/svg';
	import { GENERATOR_DELAY_MS } from '$lib/workbench/logo/utils';
	import { Download, RefreshCcw, Save, X } from '@lucide/svelte';
	import { onDestroy, onMount, type Snippet } from 'svelte';

	interface Props {
		uid: string;
		children: Snippet;
		config: Snippet;
		dataString: string;
		data: Record<string, any> | undefined;
		onreset: () => void;
	}

	let { uid, children, config, dataString, data = $bindable(), onreset }: Props = $props();

	//======================================================================================//

	let notification: Notification | undefined = $state();

	//======================================================================================//

	const devEnabled = $derived(($devMode || $overrideDevMode) && $devModeLocal);

	let showPreview = $state(true);
	let autoUpdate = $state(false);

	let svgFlat: Promise<SVGSVGElement | undefined> = $state(Promise.resolve(undefined));
	let svgKicad: Promise<SVGSVGElement | undefined> = $state(Promise.resolve(undefined));
	let timeout: NodeJS.Timeout;

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
		if (devEnabled) {
			localStorage.setItem(`logo-save-${uid}`, dataString);
			if (user) {
				notification?.show('success', 'Successfully saved!');
			}
		}
	}

	export function load(user: boolean = true) {
		const savedData = localStorage.getItem(`logo-save-${uid}`);
		if (savedData) {
			data = JSON.parse(savedData);
			if (user) {
				notification?.show('success', 'Successfully reloaded!');
			}
		}
	}

	export function reset() {
		//localStorage.removeItem(`logo-user-${uid}`);
		localStorage.removeItem(`logo-save-${uid}`);
		onreset();
		notification?.show('success', 'Successfully reset!');
	}

	// Load data on component mount
	onMount(() => {
		load(false);

		// Auto-save on component destroy
		onDestroy(() => {
			save(false);
		});
	});

	$effect(() => {
		showPreview;
		updatePreview();
	});
</script>

{#snippet SVGPreview(svg: Promise<SVGSVGElement | undefined>, title: string)}
	<div class="mt-8 flex min-h-30 flex-col">
		<h3 class="mt-6 mb-2 font-semibold md:mt-0">{title}:</h3>
		<div class="justify-middle flex size-full items-center justify-center *:max-h-50">
			{#await svg}
				<Spinner loading={true} class="size-10" />
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

<Notification bind:this={notification} />

{#if devEnabled}
	<div class="lg:flex">
		<div class="flex flex-col gap-y-5 p-6 lg:w-1/2">
			<div class="flex flex-col gap-y-2">
				<div class="flex items-center justify-between text-lg font-medium">
					Parameters
					<IconTextButton onclick={download} class="rounded-lg bg-sky-600/30 px-3 py-1" iconText={{ text: { text: 'Download', class: 'text-sm' }, icon: { icon: Download, class: 'size-5' } }} />
				</div>

				<div class="flex items-center justify-between">
					<span class="text-sm">Local storage:</span>
					<div class="flex gap-x-2">
						<IconTextButton onclick={reset} class="px-2 py-1 text-red-600" iconText={{ text: { text: 'Reset', class: 'text-sm' }, icon: { icon: X, class: 'size-5' } }} />
						<IconTextButton onclick={load} class="px-2 py-1 text-amber-600" iconText={{ text: { text: 'Reload', class: 'text-sm' }, icon: { icon: RefreshCcw, class: 'size-5' } }} />
						<IconTextButton onclick={save} class="px-2 py-1 text-green-600" iconText={{ text: { text: 'Save', class: 'text-sm' }, icon: { icon: Save, class: 'size-5' } }} />
					</div>
				</div>
			</div>

			{@render config()}
		</div>

		<div class="mx-0 shrink border-s-1 border-gray-200 dark:border-white/10"></div>

		<div class="relative p-6 lg:w-1/2">
			<div class="flex flex-col gap-y-6">
				<div class="flex gap-x-4">
					<div class="flex flex-col md:w-full">
						<h3 class="mb-2 font-semibold">Preview:</h3>
						<div class="md:max-h-50 md:min-h-40">
							{@render children()}
						</div>
					</div>
				</div>

				<div class="my-3 flex flex-col justify-center gap-2 rounded-lg">
					<BaseButton class="mx-auto rounded-full bg-sky-600/30 px-6 py-1 font-semibold" onclick={() => update(0)}>Generate</BaseButton>
					<Checkbox bind:checked={autoUpdate} text={{ text: 'Auto generate', class: 'text-sm font-semibold text-primary-500' }} class="gap-2" />
				</div>
				{#if showPreview}
					<div class="h-full gap-4">
						{@render SVGPreview(svgFlat, 'SVG (text as path)')}
						{@render SVGPreview(svgKicad, 'SVG (strokes as path)')}
					</div>
				{/if}
			</div>
		</div>
	</div>
{:else}
	<div class="m-4 *:max-h-50">
		{@render children()}
	</div>
{/if}
