<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import IconButton from '$lib/components/icons/IconButton.svelte';
	import type { DefProps } from '$lib/utils';
	import { Trash2 } from '@lucide/svelte';

	type Props = DefProps & {
		onclick: () => void;
	};

	const { onclick, ...props }: Props = $props();
</script>

<IconButton {...props} {onclick} class="link-red text-sm opacity-50 {props.class}" icon={{ icon: Trash2, class: 'size-5 ms-2' }} />
