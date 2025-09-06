<script lang="ts">
	import BaseLink from '$lib/components/BaseLink.svelte';
	import IconText from '$lib/components/icons/IconText.svelte';
	import { type DefProps } from '$lib/utils';
	import type { Icon } from '@lucide/svelte';

	type Props = DefProps & {
		href: string;
		text: string;
		icon: typeof Icon | string;
		textClass?: string;
		iconClass?: string;
		position?: 'left' | 'right';
	};

	const { text, icon, textClass, iconClass, position = 'left', ...props }: Props = $props();
</script>

<BaseLink {...props}>
	<IconText {text} {textClass} {icon} {iconClass} {position} />
</BaseLink>
