<script lang="ts">
	import { getIcon, type DefProps } from '$lib/utils';
	import type { Icon } from '@lucide/svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';

	export type IconType = typeof Icon | string | null | undefined;

	export type IconProps = DefProps & {
		icon: IconType;
		tooltip?: string;
	};

	const { icon, tooltip, ...props }: IconProps = $props();

	const resolvedIcon = $derived({ icon: typeof icon === 'string' ? getIcon(icon) : icon });
</script>

{#if tooltip}
	<Tooltip content={tooltip}>
		<resolvedIcon.icon {...props} />
	</Tooltip>
{:else}
	<resolvedIcon.icon {...props} />
{/if}
