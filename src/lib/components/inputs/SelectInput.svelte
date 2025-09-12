<script lang="ts">
	import InputContainer, { type InputContainerProps } from '$lib/components/inputs/utils/InputContainer.svelte';

	type Props = InputContainerProps & {
			items: { value: string; label: string }[];
		};

	let { value = $bindable(), items, ...props }: Props = $props();
</script>

<InputContainer {...props} bind:value input="select2" inputProps={{ items }} />
