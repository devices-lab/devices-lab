<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import { type IconProps, type IconType } from '$lib/components/icons/IconItem.svelte';
	import IconText from '$lib/components/icons/IconText.svelte';
	import type { TextProps, TextType } from '$lib/components/icons/TextItem.svelte';
	import TextItem from '$lib/components/icons/TextItem.svelte';
	import BaseLink, { type LinkProps } from '$lib/components/interactive/BaseLink.svelte';
	import type { Href, Link } from '$lib/data/routes';
	import { normaliseRequired } from '$lib/utils/normalise';
	import type { DefProps } from '$lib/utils/utils';

	export type IconSublinkProps = DefProps & {
		link: Href | Link | LinkProps;
		icon?: IconType | IconProps;
		text?: TextType | TextProps;
		subtext?: TextType | TextProps;
	};

	const { text, icon, link, subtext, ...props }: IconSublinkProps = $props();

	const linkProps: LinkProps = $derived(normaliseRequired<LinkProps, 'link'>(link, 'link'));
</script>

<ClassBox {props}>
	<IconText {icon}>
		<div class="flex flex-col">
			<TextItem {text} />
			<BaseLink {...linkProps}>
				<TextItem text={subtext} />
			</BaseLink>
		</div>
	</IconText>
</ClassBox>
