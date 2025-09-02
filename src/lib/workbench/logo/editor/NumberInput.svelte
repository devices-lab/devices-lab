<script lang="ts">
	import Reset from '$lib/workbench/logo/editor/Reset.svelte';
	import BaseInput from '$lib/components/BaseInput.svelte';
	import InputLabel, { type Label } from '$lib/workbench/logo/editor/InputLabel.svelte';


	let { label, value = $bindable<number>(), initial, min, max, step }: { label: Label; value: number; initial: number; min?: number; max?: number; step?: number } = $props();

</script>

<div class="flex flex-col">
	<InputLabel {label} {initial} />

	<div class="flex items-center justify-between gap-3 rounded-lg">
		<BaseInput type="number" bind:value class="h-[30px] min-w-1/3 appearance-none" {min} {max} {step} />
		<BaseInput type="range" bind:value class="h-[360x] w-full outline-none" {min} {max} {step} />
		<Reset onclick={() => (value = initial)} />
	</div>
</div>
