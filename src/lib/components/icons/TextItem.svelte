<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import { cn } from '$lib/utils/cn';
	import type { DefProps } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';

	// A plain text value the component can render
	export type TextType = string | null | undefined | Snippet;

	// Structured variant (may also include a class via DefProps)
	export type TextProps = DefProps & {
		text: TextType;
		subtext?: TextType;
		tag?: 'span' | 'div' | 'p' | 'label';
		html?: boolean;
	};

	// Component props: either `text` as a primitive OR a full `TextProps` object
	type Props = DefProps & {
		text: TextType | TextProps;
	};

	const { text, ...outer }: Props = $props();

	function isTextProps(v: unknown): v is TextProps {
		return !!v && typeof v === 'object' && 'text' in (v as any);
	}

	// Normalize to a single TextProps shape.
	// - Defaults: tag='span', html=false
	// - Class merging: outer.class overrides/extends inner.class
	const textProps: TextProps = $derived.by(() => {
		const base: Pick<TextProps, 'text' | 'tag' | 'html'> = {
			text: null,
			tag: 'span',
			html: false
		};

		if (isTextProps(text)) {
			// Merge classes with outer props; outer wins on conflicts
			const { class: innerClass, ...rest } = text;
			return {
				...rest,
				...base,
				text: text.text,
				class: cn(innerClass, outer.class)
			} as TextProps;
		}

		return { ...base, text } as TextProps;
	});
</script>

{#if textProps.text}
	<ClassBox {...outer} tag={textProps.tag} class={cn('flex flex-col', textProps.class)}>
		{#if typeof textProps.text === 'string'}
			{#if textProps.html}
				{@html textProps.text}
			{:else}
				{textProps.text}
			{/if}
		{:else}
			{@render textProps.text()}
		{/if}

		{#if textProps.subtext}
			<span class="text-sm font-normal text-gray-400">
				{textProps.subtext}
			</span>
		{/if}
	</ClassBox>
{/if}
