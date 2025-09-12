<script lang="ts">
	import BaseIcon, { type IconProps } from '$lib/components/base/BaseIcon.svelte';
	import BaseText, { type TextProps } from '$lib/components/base/BaseText.svelte';
	import Tooltip, { type TooltipProps } from '$lib/components/base/Tooltip.svelte';
	import { cn } from '$lib/utils/cn';
	import { type DefProps2 } from '$lib/utils/utils';

	export type TextPosition = 'iconFirst' | 'iconLast';
	export type IconTextProps = DefProps2 & {
		icon?: IconProps;
		text?: TextProps;
		position?: TextPosition;
		tooltip?: TooltipProps;
	};

	const { icon, text, position, tooltip, ...rest }: IconTextProps = $props();
</script>

{#snippet Content()}
	<div {...rest.props} class={cn('flex items-center gap-2', rest.class)}>
		{#if text && icon}
			{#if position === 'iconFirst'}
				<BaseIcon {...icon} />
				<BaseText {...text} />
			{:else}
				<BaseText {...text} />
				<BaseIcon {...icon} />
			{/if}
		{:else if icon}
			<BaseIcon {...icon} />
		{:else if text}
			<BaseText {...text} />
		{/if}
	</div>
{/snippet}

{#if tooltip}
	<Tooltip {tooltip}>
		{@render Content()}
	</Tooltip>
{:else}
	{@render Content()}
{/if}
