<script lang="ts">
	import IconText, { type IconTextProps } from '$lib/components/icons/IconText.svelte';
	import BaseLink, { type LinkProps, type LinkType } from '$lib/components/interactive/BaseLink.svelte';
	import { normaliseRequired } from '$lib/utils/normalise';
	import type { DefProps } from '$lib/utils/utils';

	type InlineIconText = {
		link: LinkType | LinkProps;
		icon?: IconTextProps['icon'];
		text?: IconTextProps['text'];
		position?: IconTextProps['position'];
	};

	export type IconLinkProps = DefProps & InlineIconText;

	const { link, icon, text, position, ...props }: IconLinkProps = $props();
	
	const linkProps: LinkProps = $derived(normaliseRequired<LinkProps, 'link'>(link, 'link'));
</script>

<BaseLink {...props} {...linkProps}>
	<IconText {icon} {text} {position} />
</BaseLink>
