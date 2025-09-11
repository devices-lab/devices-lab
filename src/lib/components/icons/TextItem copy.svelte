<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import { cn } from '$lib/utils/cn';
	import { normaliseRequired } from '$lib/utils/normalise';
	import { type DefProps } from '$lib/utils/utils';

	export type TextType = string | null | undefined;

	export type TextProps = DefProps & {
		text: TextType;
		subtext?: TextType;
		tag?: 'span' | 'div' | 'p' | 'label';
		html?: boolean;
	};

	type Props = DefProps & {
		text: TextType | TextProps;
	};

	const {text, ...props}: Props = $props();

	const textProps: TextProps = $derived(normaliseRequired<TextProps, 'text'>(text, 'text'));
</script>

{#if textProps.text}
	<ClassBox {props} tag={textProps.tag || "span"} class={cn("flex flex-col", textProps.class)}>
		{#if textProps.html}
			{@html textProps.text}
		{:else}
			{textProps.text}
		{/if}
		{#if textProps.subtext}
			<span class="text-sm font-normal text-gray-400">{textProps.subtext}</span>
		{/if}
	</ClassBox>
{/if}
