<script lang="ts">
	import IconButton from '$lib/components/icons/IconButton.svelte';
	import type { DefProps } from '$lib/utils';
	import { CirclePlus } from '@lucide/svelte';

	type Props = DefProps & {
		onclick: () => void;
	};

	const { onclick, ...props }: Props = $props();
</script>

<div {...props} class="flex items-center {props.class}">
	<div aria-hidden="true" class="w-full border-t border-gray-300 dark:border-white/15"></div>
	<div class="relative flex justify-center">
		<IconButton {onclick} class="link-blue" text="" icon={CirclePlus} iconClass="size-6" />
	</div>
	<div aria-hidden="true" class="w-full border-t border-gray-300 dark:border-white/15"></div>
</div>
ß