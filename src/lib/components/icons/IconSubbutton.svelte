<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import { type IconProps, type IconType } from '$lib/components/icons/IconItem.svelte';
	import IconText from '$lib/components/icons/IconText.svelte';
	import type { TextProps, TextType } from '$lib/components/icons/TextItem.svelte';
	import TextItem from '$lib/components/icons/TextItem.svelte';
	import BaseButton, { type ButtonProps, type ButtonType } from '$lib/components/interactive/BaseButton.svelte';
	import { normaliseRequired } from '$lib/utils/normalise';
	import type { DefProps } from '$lib/utils/utils';

	export type IconSubbuttonProps = DefProps & {
		onclick: ButtonType | ButtonProps;
		icon?: IconType | IconProps;
		text?: TextType | TextProps;
		subtext?: TextType | TextProps;
	};

	const { onclick, text, icon, subtext, ...props }: IconSubbuttonProps = $props();

	const buttonProps: ButtonProps = $derived(normaliseRequired<ButtonProps, 'onclick'>(onclick, 'onclick'));
</script>

<ClassBox {props} class="">
	<IconText {icon}>
		<div class="flex flex-col">
			<TextItem {text} />
			<BaseButton {...buttonProps}>
				<TextItem text={subtext} />
			</BaseButton>
		</div>
	</IconText>
</ClassBox>
