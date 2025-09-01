<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Loader } from '@lucide/svelte';

	import { GENERATOR_DELAY_MS } from './utils';
	import { generateSvgTextFlat } from './export/svg';
	import { generateSvgForKiCad } from './export/kicad';

	import Checkbox from './editor/Checkbox.svelte';

	interface Props {
		uid: string;
		children: Snippet;
		config: Snippet;
	}

	const { uid, children, config }: Props = $props();

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

	let showPreview = $state(true);
	let autoUpdate = $state(false);
</script>

<div class="gap-x-8 md:flex">
	<div class="flex-1/5 rounded-lg border-2 border-primary-500 bg-white p-4 shadow-sm sm:p-6 dark:border-primary-700 dark:bg-gray-800">
		<div class="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">Parameters</div>

		{@render config()}
	</div>

	<div class="flex-1">
		<div class="flex gap-x-4">
			<div class="flex flex-col md:w-full">
				<h3 class="mb-2 font-semibold text-gray-900 dark:text-gray-100">Preview:</h3>
				{@render children()}
			</div>
		</div>

		<div class="my-6 flex justify-between rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
			<button onclick={() => update(0)} type="button" class="rounded-full bg-primary-600 px-3 py-0 text-sm font-semibold text-white shadow-xs hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:bg-primary-500 dark:shadow-none dark:hover:bg-primary-400 dark:focus-visible:outline-primary-500">Generate</button>

			<Checkbox bind:checked={autoUpdate} class="rounded-lg p-2">
				<span class="text-sm font-medium text-primary-600 dark:text-primary-100">Auto update?</span>
			</Checkbox>
		</div>

		{#snippet SVGPreview(svg: Promise<SVGSVGElement | undefined>, title: string)}
			<div class="mt-4 flex min-h-30 flex-col">
				<h3 class="mt-6 mb-2 font-semibold text-gray-900 md:mt-0 dark:text-gray-100">{title}:</h3>
				<div class="justify-middle flex size-full items-center justify-center">
					{#await svg}
						<Loader class="size-10 animate-spin text-blue-500" />
					{:then value}
						{#if value}
							{@html value.outerHTML}
						{:else}
							<p class="text-sm text-gray-500 italic">No SVG generated</p>
						{/if}
					{:catch error}
						<p class="text-red-500 italic">Something went wrong: {error.message}</p>
					{/await}
				</div>
			</div>
		{/snippet}

		{#if showPreview}
			<div class="h-full gap-4">
				{@render SVGPreview(svgFlat, 'SVG (flat)')}
				{@render SVGPreview(svgKicad, 'SVG (KiCad)')}
			</div>
		{/if}
	</div>
</div>
