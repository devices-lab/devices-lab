<script lang="ts">
	import { type IconProps, type IconType } from '$lib/components/icons/IconItem.svelte';
	import IconText, { type TextAlign, type TextPosition } from '$lib/components/icons/IconText.svelte';
	import { type TextProps, type TextType } from '$lib/components/icons/TextItem.svelte';
	import BaseButton, { type ButtonProps, type ButtonType } from '$lib/components/interactive/BaseButton.svelte';
	import { normaliseOptional } from '$lib/utils/normalise';
	import type { DefProps } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';

	type IconButtonType = {
		onclick?: ButtonType | ButtonProps;
		icon?: IconType | IconProps;
		text?: TextType | TextProps;
		children?: Snippet;
		position?: TextPosition;
		align?: TextAlign;
	};

	export type IconButtonProps = DefProps & IconButtonType;


	const { onclick, icon, text, children, position, align, ...props }: IconButtonProps = $props();

	// Wrap props if needed
	const buttonProps: ButtonProps = $derived(normaliseOptional<ButtonProps, 'onclick'>(onclick, 'onclick') || {});
</script>

<BaseButton {...props} {...buttonProps}>
	<IconText {icon} {text} {position} {align} {children} />
</BaseButton>