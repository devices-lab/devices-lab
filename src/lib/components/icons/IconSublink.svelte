<script lang="ts">
	import IconText, { type IconTextProps } from '$lib/components/icons/IconText.svelte';
	import BaseLink, { type BaseLinkProps } from '$lib/components/interactive/BaseLink.svelte';
	import { normaliseRequired } from '$lib/utils/normalise';
	import type { DefProps } from '$lib/utils/utils';
	import ClassBox from '../ClassBox.svelte';
	import IconItem, { type IconProps, type IconType } from './IconItem.svelte';
	import type { TextProps, TextType } from './TextItem.svelte';
	import TextItem from './TextItem.svelte';

	export type IconSublinkProps = DefProps & {
		link: BaseLinkProps;
		icon?: IconType | IconProps;
		text?: TextType | TextProps;
		subtext?: TextType | TextProps;
	};

	const { text, icon, link, subtext, ...props }: IconSublinkProps = $props();

	const textProps: TextProps = $derived(normaliseRequired<TextProps, 'text'>(text, 'text'));
	const subtextProps: TextProps = $derived(normaliseRequired<TextProps, 'text'>(subtext, 'text'));
</script>

<!--
<ClassBox {props} class="flex flex-row items-center">
	<IconItem {...iconProps} />

	<div class="flex flex-col">
		<TextItem {...textProps} />
		<BaseLink {...link}>
			<TextItem {...subtextProps} />
		</BaseLink>
	</div>
</ClassBox>
-->
<ClassBox {props}>
	<IconText {icon}>
		<div class="flex flex-col">
			<TextItem {...textProps} />
			<BaseLink {...link}>
				<TextItem {...subtextProps} />
			</BaseLink>
		</div>
	</IconText>
</ClassBox>
