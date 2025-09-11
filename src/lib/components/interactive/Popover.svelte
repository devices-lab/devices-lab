<script lang="ts">
	import type { DefProps } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';
	import ClassBox from '$lib/components/ClassBox.svelte';
	import { ChevronDown } from '@lucide/svelte';
	import type { TextType, TextProps } from '$lib/components/icons/TextItem.svelte';
	import IconButton from '$lib/components/interactive/IconButton.svelte';
	import OpenButton from '$lib/components/interactive/OpenButton.svelte';

	type Props = DefProps & {
		children: Snippet;
		label: TextType | TextProps;
	};

	const { children, label, ...props }: Props = $props();

	const uid = $props.id();
	const popoverId = $derived(`popover-${uid}`);
</script>

<ClassBox {props} class="">
	<OpenButton popovertarget={popoverId} text={label} />
	<el-popover id={popoverId} anchor="bottom end" popover="auto" class="origin-top-right overflow-visible rounded-md bg-white p-4 shadow-2xl ring-1 ring-black/5 transition transition-discrete [--anchor-gap:--spacing(2)] backdrop:bg-transparent open:block focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
		{@render children()}
	</el-popover>
</ClassBox>
