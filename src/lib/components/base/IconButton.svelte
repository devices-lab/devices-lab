<script lang="ts">
	import BaseButton, { type ButtonProps } from '$lib/components/base/BaseButton.svelte';
	import BaseIcon, { type IconProps } from './BaseIcon.svelte';

	export type IconButtonProps = ButtonProps & {
		icon: IconProps;
	};

	const { icon, ...button }: IconButtonProps = $props();
</script>

<BaseButton {...button}>
	<BaseIcon {...icon} />
</BaseButton>
