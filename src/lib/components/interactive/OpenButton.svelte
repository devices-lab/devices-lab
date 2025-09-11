<script lang="ts">
	import type { TextProps, TextType } from '$lib/components/icons/TextItem.svelte';
	import IconButton from '$lib/components/interactive/IconButton.svelte';
	import { cn } from '$lib/utils/cn';
	import type { DefProps } from '$lib/utils/utils';
	import { ChevronDown } from '@lucide/svelte';

	type Props = DefProps & {
		text: TextType | TextProps;
	};

	const { text, class: _class, ...props }: Props = $props();
</script>

<IconButton 
	{...props}
	class={cn("flex w-full items-center justify-between px-2 py-3 ", _class)}
	text={text} 
	icon={{ icon: ChevronDown, class: 'size-5 not-in-aria-expanded:rotate-0 in-aria-expanded:-rotate-180 text-current/40' }} 
	align="justify-between w-full" 
	position="iconLast" 
/>

