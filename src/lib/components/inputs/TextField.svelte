<script lang="ts">
	import InputContainer, { type InputContainerProps } from '$lib/components/inputs/utils/InputContainer.svelte';
	import type { DefProps } from '$lib/utils/utils';

	type Props = DefProps & InputContainerProps;

	let { value = $bindable(), ...props }: Props = $props();
</script>

<InputContainer {...props} bind:value input="textarea" />
