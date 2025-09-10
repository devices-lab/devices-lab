<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import IconItem, { type IconProps, type IconType } from '$lib/components/icons/IconItem.svelte';
	import TextItem, { type TextProps, type TextType } from '$lib/components/icons/TextItem.svelte';
	import { normaliseRequired } from '$lib/utils/normalise';
	import { type DefProps } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';

	export type TextPosition = 'iconFirst' | 'iconLast';
	export type TextAlign = 'justify-start' | 'justify-center' | 'justify-end';

	export type IconTextProps = DefProps & {
		icon?: IconType | IconProps;
		text?: TextType | TextProps;
		children?: Snippet;
		position?: TextPosition;
		align?: TextAlign;
	};

	const { text, icon, children, position = 'iconFirst', align = 'justify-center', ...props }: IconTextProps = $props();

	// Wrap props if needed
	const iconProps: IconProps = $derived(normaliseRequired<IconProps, 'icon'>(icon, 'icon'));
	const textProps: TextProps = $derived(normaliseRequired<TextProps, 'text'>(text, 'text'));
</script>

<ClassBox {props} class="flex items-center {align} gap-2">
	{#if text}
		{#if position === 'iconFirst'}
			<IconItem {...iconProps} />
			<TextItem {...textProps} />
		{:else}
			<TextItem {...textProps} />
			<IconItem {...iconProps} />
		{/if}
	{:else if children}
		{#if position === 'iconFirst'}
			<IconItem {...iconProps} />
			<div class="flex-1">
				{@render children?.()}
			</div>
		{:else}
			<div class="flex-1">
				{@render children?.()}
			</div>
			<IconItem {...iconProps} />
		{/if}
	{:else}
		<IconItem {...iconProps} />
	{/if}
</ClassBox>
