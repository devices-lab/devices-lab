<script lang="ts">
	import Reset from '$lib/workbench/logo/editor/Reset.svelte';
	import BaseInput from '$lib/components/BaseInput.svelte';
	import { pick } from '$lib/utils';

	export interface InputType {
		initial: number;
		min?: number;
		max?: number;
		step?: number;
		onchange?: () => void;
	}

	let { label, value = $bindable<number>(), initial, min, max, step }: { label: string; value: number; initial: number; min?: number; max?: number; step?: number } = $props();
</script>

<div class="flex flex-col">
	<span class="text-sm/6 font-medium text-gray-900 dark:text-white">
		{label}
		<span class="text-gray-500 dark:text-gray-400"> (default: {initial})</span>
	</span>

	<div class="flex items-center justify-between gap-3 rounded-lg">
		<BaseInput type="number" bind:value class="h-[36px] min-w-1/3 appearance-none" {min} {max} {step} />
		<BaseInput type="range" bind:value class="h-[36px] w-full outline-none" {min} {max} {step} />
		<Reset onclick={() => (value = initial)} />
	</div>
</div>
