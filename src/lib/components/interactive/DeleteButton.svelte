<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import IconButton from '$lib/components/interactive/IconButton.svelte';
	import type { DefProps } from '$lib/utils/utils';
	import { Trash2 } from '@lucide/svelte';

	type Props = DefProps & {
		onclick: () => void;
	};

	const { onclick, ...props }: Props = $props();
	const iconClass = $derived(cn("link-red text-sm opacity-50", props.class));
</script>

<IconButton {...props} {onclick} class={iconClass} icon={{ icon: Trash2, class: 'size-5 ms-2', tooltip: 'Delete' }} />
