<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import { type DefProps } from '$lib/utils/utils';

	export type TextType = string | null | undefined;

	export type TextProps = DefProps & {
		text: TextType;
		subtext?: TextType;
	};

	const { text, subtext, ...props }: TextProps = $props();
</script>

{#if text}
	<ClassBox {props} tag="span" class="flex flex-col">
		{text}
		{#if subtext}
			<span class="text-sm font-normal text-gray-400">{subtext}</span>
		{/if}
	</ClassBox>
{/if}
