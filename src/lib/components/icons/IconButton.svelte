<script lang="ts">
	import BaseButton from '$lib/components/BaseButton.svelte';
	import IconText from '$lib/components/icons/IconText.svelte';
	import { type DefProps } from '$lib/utils';
	import type { Icon } from '@lucide/svelte';

	type Props = DefProps & {
		onclick: () => void;
		text: string;
		icon: typeof Icon | string;
		textClass?: string;
		iconClass?: string;
		position?: 'left' | 'right';
	};

	const { text, icon, textClass, iconClass, position = 'left', ...props }: Props = $props();
</script>

<BaseButton {...props}>
	<IconText {text} {textClass} {icon} {iconClass} {position} />
</BaseButton>
