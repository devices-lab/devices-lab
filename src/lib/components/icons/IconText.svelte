<script lang="ts">
	import IconItem from '$lib/components/icons/IconItem.svelte';
	import { type DefProps } from '$lib/utils';
	import type { Icon } from '@lucide/svelte';

	type Props = DefProps & {
		text: string;
		icon: typeof Icon | string;
		textClass?: string;
		iconClass?: string;
	};

	const { text, icon, textClass, iconClass, ...props }: Props = $props();
</script>

<div {...props} class="flex items-center justify-center gap-2 {props.class}">
	<IconItem {icon} class={iconClass} />
	<span class={textClass}>{text}</span>
</div>
