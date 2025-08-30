<script lang="ts">
	import { RotateCcw } from '@lucide/svelte';
	import { hexToRgbA } from '$lib/utils';

	export interface ColorInput {
		label: string;
		foreground: {
			get: () => string;
			set: (value: string) => void;
		};
		background: {
			get: () => string;
			set: (value: string) => void;
		};
		defaultForeground: string;
		defaultBackground: string;
	}

	const { input }: { input: ColorInput } = $props();
	const uid = $props.id();

	let enabled = $state(true);
	let color = $state('#ffffaa');
	let alpha = $state(255);
	let resultColor = $derived(hexToRgbA(color, alpha));

	$inspect(resultColor);
</script>

<div class="">
	<div class="flex items-center gap-x-3 flex-wrap">
		<div class="w-1/3 rounded-md bg-(--dynamic-color) outline outline-gray-300 dark:outline-white/10" style={`--dynamic-color: ${resultColor}`}>
			<input
				id={`input-${uid}-foreground`}
				type="color"
				name="foreground"
				bind:value={color}
				placeholder={input.defaultForeground.toString()}
				aria-describedby={`input-${uid}-description`}
				class={`block
				h-[36px]
					w-full
			
				opacity-0	
				focus:outline-primary-600
				disabled:border-gray-50
				disabled:bg-gray-50
				disabled:text-gray-500
				disabled:shadow-none
		
				dark:bg-white/5
				dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-primary-500 dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20
				`}
				disabled={!enabled}
			/>
		</div>

		<div class="flex-1 flex items-center gap-x-2">
			<label for="alpha" class="text-sm/6 font-medium text-gray-900 dark:text-white">Alpha:</label>
			<input id="alpha" class="" type="range" min="0" max="1" step="0.01" bind:value={alpha}  />
		</div>

	</div>
</div>
