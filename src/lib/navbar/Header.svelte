<script lang="ts">
	import { page } from '$app/state';

	import Logo from '$lib/navbar/Logo.svelte';
	import Route from '$lib/navbar/Route.svelte';
	import LinkPop from '$lib/navbar/LinkPop.svelte';
	import MobileMenu from '$lib/navbar/Mobile.svelte';
	import FeaturedSet from '$lib/items/featured/FeaturedSet.svelte';
	import ThemeToggle from '$lib/theme/ThemeToggle.svelte';

	import { devMode } from '$lib/utils';
	import { onMount } from 'svelte';

	const uid = $props.id();
	const menuID = `mobile-menu-${uid}`;


	onMount(() => {
		devMode.set(localStorage.getItem('devMode') === 'true');
		
		devMode.subscribe((value) => {
			localStorage.setItem('devMode', String(value));
		});
	});
</script>

<!-- Mobile menu -->
<MobileMenu uid={menuID} />

<!-- NavBar -->
<header class="relative z-100">
	{#if $devMode}
		<div class=" bg-gray-200">
			<div class=" bg-gray-500/50 text-center text-sm text-gray-900 dark:bg-white/10">
				<div class="font-semibold">Dev!</div>
			</div>
		</div>
	{/if}

	<nav aria-label="Top" class="bg-white text-gray-700 shadow-xs dark:bg-gray-800 dark:text-gray-300">
		<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
			<!-- Logo (lg+) -->
			<div class="hidden lg:flex lg:flex-1 lg:items-center">
				<Logo height={'h-8'} />
			</div>

			<!-- Desktop menu (lg+) -->
			<div class="hidden h-full lg:flex">
				<!-- Flyout menus -->
				<el-popover-group class="group/popover-group inset-x-0 bottom-0 px-4">
					<!-- Presentational element to emulate a border that sits on top of the popover -->
					<div class="absolute inset-x-0 -bottom-px h-px w-full bg-white opacity-0 transition-opacity duration-200 ease-in group-has-open/popover-group:opacity-100 group-has-open/popover-group:duration-150 group-has-open/popover-group:ease-out">
						<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
							<div class="h-px w-full bg-gray-200"></div>
						</div>
					</div>
					<div class="flex h-full justify-center space-x-8">
						{#each page.data.menu as menu}
							{@const current = page.data.route.href === menu.route.href}
							{#if menu.menu && menu.menu.length > 0}
								<LinkPop title={menu.route.title} {current}>
									{#snippet content(id: string)}
										<FeaturedSet {id} route={menu.route} items={menu.menu} />
									{/snippet}
								</LinkPop>
							{:else}
								<Route route={menu.route} {current} />
							{/if}
						{/each}
					</div>
				</el-popover-group>
			</div>

			<!-- Mobile menu (lg-) -->
			<div class="flex flex-1 items-center lg:hidden">
				<button type="button" command="show-modal" commandfor={menuID} class="rounded-m -ml-2 p-2 text-gray-400 hover:text-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-gray-400 dark:hover:text-gray-300 dark:focus-visible:outline-indigo-500">
					<span class="sr-only">Open menu</span>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6">
						<path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</button>
			</div>

			<!-- Logo (lg-) -->
			<Logo height={'h-8'} class="lg:hidden" />

			<!-- Options -->
			<div class="flex flex-1 items-center justify-end">
				<el-dropdown>
					<button type="button" class="flex cursor-pointer items-center rounded-full text-gray-400 hover:text-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-gray-400 dark:hover:text-gray-300 dark:focus-visible:outline-indigo-500">
						<span class="sr-only">Open options</span>
						<svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5">
							<path d="M10 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM10 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM11.5 15.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
						</svg>
					</button>
					<el-menu anchor="bottom end" popover="auto" class="w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg outline-1 outline-black/5 transition transition-discrete [--anchor-gap:--spacing(2)] data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:divide-white/10 dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
						{#each page.data.sideMenu as route}
							<div class="py-1">
								<Route {route} />
							</div>
						{/each}

						<div class="">
							<ThemeToggle />
						</div>
					</el-menu>
				</el-dropdown>
			</div>
		</div>
	</nav>
</header>
