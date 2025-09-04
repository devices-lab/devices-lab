<script lang="ts">
	import BaseButton from '$lib/components/BaseButton.svelte';
	import type { DefProps } from '$lib/utils';
	import { X } from '@lucide/svelte';

	type Props = DefProps & {
		onclick: () => void;
	};

	const { onclick, ...props }: Props = $props();
</script>

<BaseButton {...props} class="absolute top-1/2 right-0 -translate-y-1/2 {props.class}" {onclick}>
	<X class="size-6 text-red-600 hover:opacity-30" />
</BaseButton>
