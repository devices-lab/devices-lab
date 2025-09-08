<script lang="ts">
	import IconItem, { type IconProps, type IconType } from '$lib/components/icons/IconItem.svelte';
	import TextItem, { type TextProps, type TextType } from '$lib/components/icons/TextItem.svelte';
	import { normaliseOptional, normaliseRequired } from '$lib/utils/normalise';
	import { type DefProps } from '$lib/utils/utils';
	import ClassBox from '$lib/components/ClassBox.svelte';

	export type IconTextProps = DefProps & {
		icon: IconType | IconProps;
		text?: TextType | TextProps;
		position?: 'iconFirst' | 'iconLast';
	};

	const { text, icon, position = 'iconFirst', ...props }: IconTextProps = $props();

	const iconProps: IconProps = $derived(normaliseRequired<IconProps, 'icon'>(icon, 'icon'));
	const textProps: TextProps | undefined = $derived(normaliseOptional<TextProps, 'text'>(text, 'text'));
</script>

<ClassBox {props} class="flex items-center justify-center gap-2">
	{#if textProps}
		{#if position === 'iconFirst'}
			<IconItem {...iconProps} />
			<TextItem {...textProps} />
		{:else}
			<TextItem {...textProps} />
			<IconItem {...iconProps} />
		{/if}
	{:else}
		<IconItem {...iconProps} />
	{/if}
</ClassBox>
