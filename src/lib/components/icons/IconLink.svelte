<script lang="ts">
	import IconText, { type IconTextProps } from '$lib/components/icons/IconText.svelte';
	import BaseLink, { type BaseLinkProps } from '$lib/components/interactive/BaseLink.svelte';
	import type { DefProps } from '$lib/utils/utils';

	type InlineIconText = {
		icon?: IconTextProps['icon'];
		text?: IconTextProps['text'];
		position?: IconTextProps['position'];
	};

	export type IconLinkProps = DefProps & BaseLinkProps & InlineIconText;

	const { icon, text, position, ...props }: IconLinkProps = $props();
</script>

<BaseLink {...props}>
	<IconText {icon} {text} {position} />
</BaseLink>
