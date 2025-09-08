<script lang="ts">
	import IconButton from '$lib/components/icons/IconButton.svelte';
	import { cn } from '$lib/utils/cn';
	import type { DefProps } from '$lib/utils/utils';
	import { X } from '@lucide/svelte';

	type Props = DefProps & {
		onclick?: () => void;
	};

	const { onclick, ...props }: Props = $props();
	const iconClass = $derived(cn("link-gray text-sm opacity-50", props.class));
</script>

<span class="sr-only">Close</span>
<IconButton {...props} {onclick} class={iconClass} icon={{ icon: X, class: 'size-8', tooltip: 'Close' }} />
