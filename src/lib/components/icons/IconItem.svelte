<script lang="ts">
	import { getIcon, type DefProps } from '$lib/utils';
	import type { Icon } from '@lucide/svelte';

	type Props = DefProps & {
		icon: typeof Icon | string | null | undefined;
	};

	const { icon, ...props }: Props = $props();

	const resolvedIcon = $derived({ icon: typeof icon === 'string' ? getIcon(icon) : icon });
</script>

{#if resolvedIcon.icon}
	<resolvedIcon.icon {...props} />
{/if}
