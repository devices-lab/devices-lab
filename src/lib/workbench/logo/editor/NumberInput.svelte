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

	let { label, value = $bindable<number>(), params }: { label: string; value: number; params: InputType } = $props();

	// Build a small bag of only the props you want to spread
	type Rangeable = Pick<InputType, 'min' | 'max' | 'step'>;

	const shared: Rangeable = $derived(pick(params, ['min', 'max', 'step']));
</script>

<div class="flex flex-col">
	<span class="text-sm/6 font-medium text-gray-900 dark:text-white">
		{label}
		<span class="text-gray-500 dark:text-gray-400"> (default: {params.initial})</span>
	</span>

	<div class="flex items-center justify-between gap-3 rounded-lg">
		<BaseInput type="number" bind:value class="h-[36px] min-w-1/3 appearance-none" {...shared} />
		<BaseInput type="range" bind:value class="h-[36px] w-full outline-none" {...shared} />
		<Reset onclick={() => (value = params.initial)} />
	</div>
</div>
