<script lang="ts">
	import InputContainer, { type InputContainerProps } from '$lib/components/inputs/InputContainer.svelte';
	import { getIcon, type DefProps } from '$lib/utils';

	type Props = DefProps & InputContainerProps;

	let { value = $bindable(), ...props }: Props = $props();

	// Update the icon when the value changes
	const selected = $derived({icon: getIcon(value)});
</script>

{#snippet post()}
	{#if selected.icon}
		<selected.icon class="aspect-square size-full rounded-e-lg p-1.5 text-gray-600 dark:text-gray-50" />
	{/if}
{/snippet}

<InputContainer {...props} bind:value input="input" {post} />
