<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import IconItem, { type IconProps, type IconType } from '$lib/components/icons/IconItem.svelte';
	import TextItem, { type TextProps, type TextType } from '$lib/components/icons/TextItem.svelte';
	import { cn } from '$lib/utils/cn';
	import { normaliseRequired } from '$lib/utils/normalise';
	import { type DefProps } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';

	export type TextPosition = 'iconFirst' | 'iconLast';
	export type TextAlign = 'justify-start' | 'justify-center' | 'justify-end' | 'justify-between' | 'justify-around' | 'justify-evenly' | string;

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
</script>

<ClassBox {props} class={cn("flex items-center gap-2", align)}>
	{#if text}
		{#if position === 'iconFirst'}
			<IconItem {...iconProps} />
			<TextItem {text} />
		{:else}
			<TextItem {text} />
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
