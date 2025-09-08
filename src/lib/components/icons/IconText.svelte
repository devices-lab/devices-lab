<script lang="ts">
	import IconItem, { type IconProps, type IconType } from '$lib/components/icons/IconItem.svelte';
	import TextItem, { type TextProps, type TextType } from '$lib/components/icons/TextItem.svelte';
	import { normaliseOptional, normaliseRequired } from '$lib/utils/normalise';
	import { type DefProps } from '$lib/utils/utils';
	import ClassBox from '$lib/components/ClassBox.svelte';
	import type { Snippet } from 'svelte';

	export type IconTextProps = DefProps & {
		icon?: IconType | IconProps;
		text?: TextType | TextProps;
		children?: Snippet;
		position?: 'iconFirst' | 'iconLast';
	};

	const { text, icon, children, position = 'iconFirst', ...props }: IconTextProps = $props();

	const iconProps: IconProps = $derived(normaliseRequired<IconProps, 'icon'>(icon, 'icon'));
	const textProps: TextProps = $derived(normaliseRequired<TextProps, 'text'>(text, 'text'));
</script>

<ClassBox {props} class="flex items-center justify-center gap-2">
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
			{@render children?.()}
		{:else}
			{@render children?.()}
			<IconItem {...iconProps} />
		{/if}
	{:else}
		<IconItem {...iconProps} />
	{/if}
</ClassBox>
