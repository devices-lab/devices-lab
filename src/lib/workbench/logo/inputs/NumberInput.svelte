<script lang="ts">
	import BaseInput from '$lib/workbench/logo/inputs/BaseInput.svelte';
	import BaseRange from '$lib/workbench/logo/inputs/BaseRange.svelte';
	import Input from '$lib/workbench/logo/inputs/Input.svelte';
	import type { Label } from '$lib/workbench/logo/inputs/InputLabel.svelte';

	let { label, value = $bindable<number>(), initial, min, max, step }: { label: Label; value: number; initial: number; min?: number; max?: number; step?: number } = $props();
</script>

<Input {label} {initial} onreset={() => (value = initial)}>
	<BaseInput type="number" bind:value class="h-[30px] min-w-1/3 appearance-none px-3 py-1.5" {min} {max} {step} />
	<BaseRange bind:value class="h-[30px] w-full accent-primary-500" {min} {max} {step} />
</Input>
