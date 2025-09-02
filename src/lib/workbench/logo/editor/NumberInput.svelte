<script lang="ts">
	import BaseInput from '$lib/components/BaseInput.svelte';
	import Input from '$lib/workbench/logo/editor/Input.svelte';
	import type { Label } from '$lib/workbench/logo/editor/InputLabel.svelte';

	let { label, value = $bindable<number>(), initial, min, max, step }: { label: Label; value: number; initial: number; min?: number; max?: number; step?: number } = $props();
</script>

<Input {label} {initial} onreset={() => (value = initial)}>
	<BaseInput type="number" bind:value class="h-[30px] min-w-1/3 appearance-none" {min} {max} {step} />
	<BaseInput type="range" bind:value class="h-[30px] w-full outline-none" {min} {max} {step} />
</Input>
