<script lang="ts">
	import BaseButton, { type ButtonProps } from '$lib/components/base/BaseButton.svelte';
	import BaseText, { type TextProps } from '$lib/components/base/BaseText.svelte';

	export type IconLinkProps = ButtonProps & {
		text: TextProps;
	};

	const { text, ...button }: IconLinkProps = $props();
</script>

<BaseButton {...button}>
	<BaseText {...text} />
</BaseButton>
