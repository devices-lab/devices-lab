<script lang="ts">
	import BaseLink from '$lib/components/BaseLink.svelte';
	import { getIcon, type DefProps } from '$lib/utils';
	import type { Icon } from '@lucide/svelte';

	type Props = DefProps & {
		href: string;
		title: string;
		icon: typeof Icon | string;
	};

	const { title, icon, ...props }: Props = $props();

	const resolvedIcon = $derived({ icon: typeof icon === 'string' ? getIcon(icon) : icon });
</script>

<BaseLink {...props} class="flex items-center justify-center {props.class}">
	{#if resolvedIcon}
	<resolvedIcon.icon class="me-1 size-5 transition-transform duration-150 group-hover/link:-translate-y-0.5" />
	{/if}
	{title}
</BaseLink>
	