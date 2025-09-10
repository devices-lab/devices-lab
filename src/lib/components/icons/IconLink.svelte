<script lang="ts">
	import { type IconProps, type IconType } from '$lib/components/icons/IconItem.svelte';
	import IconText, { type TextAlign, type TextPosition } from '$lib/components/icons/IconText.svelte';
	import { type TextProps, type TextType } from '$lib/components/icons/TextItem.svelte';
	import BaseLink, { type LinkProps, type LinkType } from '$lib/components/interactive/BaseLink.svelte';
	import { normaliseRequired } from '$lib/utils/normalise';
	import type { DefProps } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';

	export type IconLinkType = {
		link: LinkType | LinkProps;
		icon?: IconType | IconProps;
		text?: TextType | TextProps;
		children?: Snippet;
		position?: TextPosition;
		align?: TextAlign;
	};

	export type IconLinkProps = DefProps & IconLinkType;

	const { link, icon, text, children, position, align, ...props }: IconLinkProps = $props();

	// Wrap props if needed
	const linkProps: LinkProps = $derived(normaliseRequired<LinkProps, 'link'>(link, 'link'));
</script>

<BaseLink {...props} {...linkProps}>
	<IconText {icon} {text} {position} {align} {children} />
</BaseLink>
