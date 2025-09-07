<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import { type DefProps } from '$lib/utils';

	export type TextType = string | null | undefined;

	export type TextProps = DefProps & {
		text: string | null | undefined;
	};

	const { text, ...props }: TextProps = $props();
</script>

{#if text}
	<ClassBox {props} tag="span">{text}</ClassBox>
{/if}
