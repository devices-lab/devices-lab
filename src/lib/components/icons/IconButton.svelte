<script lang="ts">
	import BaseLink from '$lib/components/BaseLink.svelte';
	import IconText from '$lib/components/icons/IconText.svelte';
	import { type DefProps } from '$lib/utils';
	import type { Icon } from '@lucide/svelte';
	import BaseButton from '../BaseButton.svelte';

	type Props = DefProps & {
		onclick: () => void;
		text: string;
		icon: typeof Icon | string;
		textClass?: string;
		iconClass?: string;
	};

	const { text, icon, textClass, iconClass, ...props }: Props = $props();
</script>

<BaseButton {...props} class={props.class}>
	<IconText {text} {icon} {iconClass} {textClass} />
</BaseButton>
