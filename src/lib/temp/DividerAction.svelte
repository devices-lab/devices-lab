<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import IconButton from '$lib/components/icons/IconButton.svelte';
	import type { DefProps } from '$lib/utils/utils';
	import { CirclePlus } from '@lucide/svelte';

	type Props = DefProps & {
		onclick: () => void;
	};

	const { onclick, ...props }: Props = $props();
</script>

<ClassBox {props} class="flex items-center">
	<div aria-hidden="true" class="w-full border-t border-gray-300 dark:border-white/15"></div>
	<div class="relative flex justify-center">
		<IconButton {onclick} class="link-blue" icon={{ icon: CirclePlus, class: 'size-6' }} />
	</div>
	<div aria-hidden="true" class="w-full border-t border-gray-300 dark:border-white/15"></div>
</ClassBox>
