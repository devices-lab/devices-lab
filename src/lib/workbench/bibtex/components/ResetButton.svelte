<script lang="ts">
	import IconButton from '$lib/components/icons/IconButton.svelte';
	import type { DefProps } from '$lib/utils';
	import { X } from '@lucide/svelte';

	type Props = DefProps & {
		onclick: () => void;
	};

	const { onclick, ...props }: Props = $props();
</script>

<IconButton {onclick} class="link-red text-sm" text="" icon={X} iconClass="size-6" />
