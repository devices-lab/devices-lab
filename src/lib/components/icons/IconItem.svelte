<script lang="ts">
	import { getIcon, type DefProps } from '$lib/utils';
	import type { Icon } from '@lucide/svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import ClassBox from '../ClassBox.svelte';

	export type IconType = typeof Icon | string | null | undefined;

	export type IconProps = DefProps & {
		icon: IconType;
		tooltip?: string;
		fallback?: string;
	};

	const { icon, tooltip, fallback, ...props }: IconProps = $props();

	const resolvedIcon = $derived({ icon: typeof icon === 'string' ? getIcon(icon) : icon });
</script>

{#if icon}
	{#if tooltip}
		<Tooltip content={tooltip}>
			<resolvedIcon.icon {...props} />
		</Tooltip>
	{:else}
		<resolvedIcon.icon {...props} />
	{/if}
{:else if fallback}
	<ClassBox {props} class="flex flex-none items-center font-black font-ocr justify-center rounded-lg border border-current/50">{fallback.toUpperCase().charAt(0)}</ClassBox>
{/if}
