<script lang="ts">
	import BaseButton, { type ButtonProps } from '$lib/components/base/BaseButton.svelte';
	import IconText, { type IconTextProps } from '$lib/components/base/IconText.svelte';

	export type IconTextButtonProps = ButtonProps & {
		iconText?: IconTextProps;
	};

	const { iconText, ...button }: IconTextButtonProps = $props();
</script>

<BaseButton {...button}>
	<IconText {...iconText} />
</BaseButton>
