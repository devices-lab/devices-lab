<script lang="ts">
	import type { ButtonProps } from '$lib/components/base/BaseButton.svelte';
	import type { TextProps } from '$lib/components/base/BaseText.svelte';
	import IconTextButton from '$lib/components/base/IconTextButton.svelte';
	import { cn } from '$lib/utils/cn';
	import { ChevronDown } from '@lucide/svelte';

	type Props = ButtonProps & {
		text?: TextProps;
	};

	const { text, ...button }: Props = $props();
</script>

<span class="sr-only">Open</span>
<IconTextButton {...button} class={cn('flex w-full items-center justify-between px-2 py-3', button.class)} iconText={{ text: text, icon: { icon: ChevronDown, class: 'size-5 not-in-aria-expanded:rotate-0 in-aria-expanded:-rotate-180 text-current/40' }, position: 'iconLast' }} />
