<script lang="ts">
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';
	import type { Route as RouteType } from '$lib/data/routes';

	import Route from '$lib/navbar/menu/Route.svelte';

	const { route, popover, class: className }: { route: RouteType; popover: Snippet<[string]>; class?: ClassValue } = $props();

	const uid = $props.id();
	const popoverID = `popover-${uid}`;

	// Derive if we are the current (active) route
	const current = $derived(page.data.route.href === route.href);
</script>

<div class="group/popover flex">
	<div class="relative flex">
		<button
			aria-current={current ? 'page' : undefined}
			popovertarget={popoverID}
			class={`
				relative
				flex
				cursor-pointer
				items-center
				justify-center
				px-4
				py-2
				text-sm font-medium
				transition-colors
				duration-200
				ease-out
				group-not-has-open/popover:text-gray-700
				group-has-open/popover:text-primary-600
				group-not-has-open/popover:hover:not-aria-[current]:text-gray-400
				aria-[current]:bg-gray-200/50
				dark:group-not-has-open/popover:text-gray-300
				dark:group-has-open/popover:text-primary-300
				dark:group-not-has-open/popover:hover:not-aria-[current]:text-gray-400 
				dark:aria-[current]:bg-gray-600/50
				${className}
			`}
		>
			<Route {route}/>
			<span aria-hidden="true" class="absolute inset-x-0 -bottom-px z-30 h-0.5 bg-transparent duration-200 ease-in group-has-open/popover:bg-primary-600 group-has-open/popover-group:duration-150 group-has-open/popover-group:ease-out"></span>
		</button>
	</div>

	<!-- Popover content -->
	{@render popover(popoverID)}
</div>



