<script lang="ts">
	import type { TextProps } from '$lib/components/base/BaseText.svelte';
	import ClassBox from '$lib/components/ClassBox.svelte';
	import OpenButton from '$lib/components/interactive/OpenButton.svelte';
	import type { DefProps } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';

	type Props = DefProps & {
		children: Snippet;
		label: TextProps;
	};

	const { children, label, ...props }: Props = $props();

	const uid = $props.id();
	const menuId = $derived(`menu-${uid}`);
</script>

<ClassBox {props} class="">
	<el-dropdown>
		<OpenButton text={label} props={{ popovertarget: menuId }} />
		<el-menu id={menuId} anchor="bottom" popover="auto" class="origin-top-right overflow-visible rounded-md p-4 shadow-2xl ring-1 ring-black/5 transition transition-discrete [--anchor-gap:--spacing(2)] backdrop:bg-transparent open:block focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
			{@render children()}
		</el-menu>
	</el-dropdown>
</ClassBox>
