<script lang="ts">
	import NumberInput, { type NumberInput as NumberInputType } from './NumberInput.svelte';
	import ColorInput, { type ColorInput as ColorInputType } from './ColorInput.svelte';

	// Extend types to include a type property for discrimination
	interface NumberInputWithType extends NumberInputType {
		type: 'number';
	}
	interface ColorInputWithType extends ColorInputType {
		type: 'color';
	}

	const { title, inputs }: { title: string; inputs: (NumberInputWithType | ColorInputWithType)[] } = $props();
	const uid = $props.id();
</script>

<div class="mb-8">
	<button type="button" command="--toggle" commandfor="toggle-{uid}" class="group relative mt-2 mb-1 flex w-full items-center justify-between text-left">
		<span class="text-sm font-medium underline underline-offset-2 not-in-aria-expanded:text-gray-900 in-aria-expanded:text-primary-600 dark:not-in-aria-expanded:text-gray-300 dark:in-aria-expanded:text-primary-400">{title}</span>
		<span class="ml-6 flex cursor-pointer items-center">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 text-gray-400 group-hover:text-gray-500 in-aria-expanded:hidden">
				<path d="M12 4.5v15m7.5-7.5h-15" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 text-primary-400 not-in-aria-expanded:hidden group-hover:text-primary-500">
				<path d="M5 12h14" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</span>
	</button>

	<el-disclosure id="toggle-{uid}" class=" transition duration-200 data-closed:opacity-0">
		<div class="grid gap-x-8 gap-y-2 md:grid-cols-2">
			{#each inputs as input}
				{#if input.type === 'number'}
					<NumberInput {input} />
				{:else if input.type === 'color'}
					<ColorInput {input} />
				{/if}
			{/each}
		</div>
	</el-disclosure>
</div>
