<script lang="ts">
	import ColorField from '$lib/workbench/logo/editor/ColorField.svelte';
	import Reset from '$lib/workbench/logo/editor/Reset.svelte';
	import InputLabel from '$lib/workbench/logo/editor/InputLabel.svelte';

	let { label, value = $bindable(), initial }: { label: string; value: string; initial: string } = $props();
</script>

<div>
	<InputLabel {label} {initial} />
	
	<div class="flex items-center gap-3 rounded-lg">
		<ColorField bind:color={value} default={initial} />
		<Reset onclick={() => (value = initial)} />
	</div>
</div>
