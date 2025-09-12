<script lang="ts">
	import Tooltip, { type TooltipProps } from '$lib/components/base/Tooltip.svelte';
	import { cn } from '$lib/utils/cn';
	import { getIcon, type DefProps2 } from '$lib/utils/utils';
	import type { Icon } from '@lucide/svelte';

	export type IconType = typeof Icon | string | null | undefined;

	export type IconProps = DefProps2 & {
		icon?: IconType;
		fallback?: string;
		tooltip?: TooltipProps;
	};

	const { ...icon }: IconProps = $props();

	// Resolve icon
	const resolvedIcon = $derived({ icon: typeof icon.icon === 'string' ? getIcon(icon.icon) : icon.icon });
</script>

{#snippet Content()}
	<resolvedIcon.icon {...icon.props} class={cn('inline-flex items-center', icon.class)} />
{/snippet}

{#if icon.icon}
	{#if icon.tooltip}
		<Tooltip tooltip={icon.tooltip}>
			{@render Content()}
		</Tooltip>
	{:else}
		{@render Content()}
	{/if}
{:else if icon.fallback}
	<!-- Fallback if icon is not available -->
	<span {...icon.props} class={cn('inline-flex items-center justify-center rounded-lg border border-current/50 font-ocr font-black', icon?.class)}>
		{icon.fallback.toUpperCase().charAt(0)}
	</span>
{/if}
