<script lang="ts">
	import { cn } from '$lib/cn';
	import ClassBox from '$lib/components/ClassBox.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { getIcon, type DefProps } from '$lib/utils';
	import type { Icon } from '@lucide/svelte';

	export type IconType = typeof Icon | string | null | undefined;

	export type IconProps = DefProps & {
		icon: IconType;
		tooltip?: string;
		fallback?: string;
	};

	const { icon, tooltip, fallback, ...props }: IconProps = $props();

	const resolvedIcon = $derived({ icon: typeof icon === 'string' ? getIcon(icon) : icon });
	const iconClass = $derived(cn("inline-flex items-center", props.class));
</script>

{#if icon}
	{#if tooltip}
		<Tooltip content={tooltip}>
			<resolvedIcon.icon {...props} class={iconClass} />
		</Tooltip>
	{:else}
		<resolvedIcon.icon {...props} class={iconClass} />
	{/if}
{:else if fallback}
	<ClassBox {props} tag="span" class="{iconClass} font-black font-ocr justify-center rounded-lg border border-current/50">{fallback.toUpperCase().charAt(0)}</ClassBox>
{/if}
