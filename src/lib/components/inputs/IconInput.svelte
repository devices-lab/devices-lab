<script lang="ts">
	import InputContainer, { type InputContainerProps } from '$lib/components/inputs/utils/InputContainer.svelte';
	import { getIcon, type DefProps } from '$lib/utils/utils';

	type Props = DefProps & InputContainerProps;

	let { value = $bindable(), ...props }: Props = $props();

	// Update the icon when the value changes
	const selected = $derived({ icon: getIcon(value) });
	const sublabel = "See <a href='https://lucide.dev/icons' class='text-blue-300 hover:text-blue-400 underline' target='_blank'>lucide.dev/icons</a>";
</script>

{#snippet post()}
	{#if selected.icon}
		<selected.icon class="aspect-square size-full rounded-e-lg p-1.5 text-gray-600 dark:text-gray-50" />
	{/if}
{/snippet}

<InputContainer {sublabel} {...props} bind:value input="input" {post} />
