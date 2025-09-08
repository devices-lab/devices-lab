<script lang="ts">
	import InputContainer, { type InputContainerProps } from '$lib/components/inputs/utils/InputContainer.svelte';
	import type { DefProps } from '$lib/utils/utils';

	type Props = DefProps &
		InputContainerProps & {
			items: string[];
		};

	let { value = $bindable(), items, ...props }: Props = $props();
</script>

<InputContainer {...props} bind:value input="selectType" inputProps={{ items }} />
