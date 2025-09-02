<script lang="ts">
	import ColorField from '$lib/workbench/logo/inputs/ColorField.svelte';
	import Input from '$lib/workbench/logo/inputs/Input.svelte';
	import type { Label } from '$lib/workbench/logo/inputs/InputLabel.svelte';

	let { label, value = $bindable(), initial }: { label: Label; value: string; initial: string } = $props();
</script>

<Input {label} {initial} onreset={() => (value = initial)}>
	<ColorField bind:color={value} default={initial} />
</Input>
