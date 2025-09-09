<script lang="ts">
	import IconText, { type IconTextProps } from '$lib/components/icons/IconText.svelte';
	import BaseLink from '$lib/components/interactive/BaseLink.svelte';
	import type { Href, Link } from '$lib/data/routes';
	import { normaliseRequired } from '$lib/utils/normalise';
	import type { DefProps } from '$lib/utils/utils';

	export type IconLinkType = {
		link: Href | Link;
		icon?: IconTextProps['icon'];
		text?: IconTextProps['text'];
		position?: IconTextProps['position'];
	};

	export type IconLinkProps = DefProps & IconLinkType;

	const { link, icon, text, position, ...props }: IconLinkProps = $props();
</script>

<BaseLink {...props} {link}>
	<IconText {icon} {text} {position} />
</BaseLink>
