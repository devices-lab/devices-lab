<script lang="ts">
	import IconText, { type IconTextProps } from '$lib/components/icons/IconText.svelte';
	import BaseButton, { type BaseButtonProps } from '$lib/components/interactive/BaseButton.svelte';
	import type { DefProps } from '$lib/utils';

	type InlineIconText = {
		icon: IconTextProps['icon'];
		text?: IconTextProps['text'];
		position?: IconTextProps['position'];
	};

	export type IconLinkProps = DefProps & BaseButtonProps & InlineIconText;

	const { icon, text, position, ...props }: IconLinkProps = $props();
</script>

<BaseButton {...props}>
	<IconText {icon} {text} {position} />
</BaseButton>