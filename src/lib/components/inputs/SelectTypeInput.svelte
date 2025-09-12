<script lang="ts">
	import InputContainer, { type InputContainerProps } from '$lib/components/inputs/utils/InputContainer.svelte';

	type Props = InputContainerProps & {
		items: string[];
	};

	let { value = $bindable(), items, ...props }: Props = $props();
</script>

<InputContainer {...props} bind:value input="selectType" inputProps={{ items }} />
