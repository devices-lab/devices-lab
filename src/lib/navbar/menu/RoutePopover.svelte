<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import IconTextLink from '$lib/components/base/IconTextLink.svelte';
	import type { Entry } from '$lib/data/indexer';
	import type { Route as RouteType } from '$lib/data/routes';
	import RouteLink from '$lib/navbar/menu/RouteLink.svelte';
	import type { DefProps } from '$lib/utils/utils';
	import { ChevronRight } from '@lucide/svelte';
	import type { Snippet } from 'svelte';

	type Props = DefProps & {
		children: Snippet;
		route: RouteType;
		items: Entry[];
	};

	const { children, route, items, ...props }: Props = $props();

	const uid = $props.id();
	const popoverID = `popover-${uid}`;
</script>

<ClassBox {props} class="group/popover inline-flex">
	<RouteLink {route} button={{ props: { popovertarget: popoverID }, class: 'overlay-test group-has-open/popover:border-b-3  group-has-open/popover:bg-current/10 group-has-open/popover:font-bold' }} />
	<!-- Popover content -->
	<el-popover id={popoverID} anchor="bottom" popover="manual" class="w-full overflow-hidden bg-current text-sm transition [--anchor-gap:1px] backdrop:bg-black/10 open:block data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in">
		<!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow -->
		<div aria-hidden="true" class="absolute inset-0 top-1/2 bg-white shadow-lg ring-1 ring-gray-900/5 dark:bg-gray-900 dark:shadow-none dark:ring-white/10"></div>
		<div class="relative flex flex-col gap-8 bg-white p-8 dark:bg-gray-900">
			<div class="mx-auto flex max-w-3xl justify-start sm:px-6 lg:max-w-7xl lg:px-8">
				{@render children()}
			</div>

			<IconTextLink href={route.id} class="mx-auto rounded-full bg-primary px-4  py-1 font-semibold text-nowrap shadow hover:scale-102 hover:bg-primary-hover" iconText={{ text: { text: 'See all items', class: 'ms-3' }, icon: { icon: ChevronRight, class: 'size-7' }, position: 'iconLast' }} />
		</div>
	</el-popover>
</ClassBox>
