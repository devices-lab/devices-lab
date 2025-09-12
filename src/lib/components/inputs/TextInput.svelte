<script lang="ts">
	import InputContainer, { type InputContainerProps } from '$lib/components/inputs/utils/InputContainer.svelte';

	let { value = $bindable(), ...props }: InputContainerProps = $props();
</script>

<InputContainer {...props} bind:value input="input" />
