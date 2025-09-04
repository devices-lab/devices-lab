<script lang="ts">
	import type { DefProps } from '$lib/utils';
	import BaseButton from '$lib/components/BaseButton.svelte';
	import { CirclePlus } from '@lucide/svelte';

	type Props = DefProps & {
		onclick: () => void;
	};

	const { onclick, ...props }: Props = $props();
</script>


<div {...props} class="flex items-center {props.class}">
	<div aria-hidden="true" class="w-full border-t border-gray-300 dark:border-white/15"></div>
	<div class="relative flex justify-center">
		<BaseButton class="flex items-center gap-2 text-sm" {onclick}>
			<CirclePlus class="size-6 text-lime-600 hover:opacity-30" />
		</BaseButton>
	</div>
	<div aria-hidden="true" class="w-full border-t border-gray-300 dark:border-white/15"></div>
</div>
