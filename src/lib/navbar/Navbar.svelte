<script lang="ts">
	import { page } from '$app/state';
	import BaseImg from '$lib/components/BaseImg.svelte';
	import BaseLink from '$lib/components/interactive/BaseLink.svelte';
	import IconLink from '$lib/components/interactive/IconLink.svelte';
	import { Routes, type Route } from '$lib/data/routes';
	import Logo from '$lib/navbar/Logo.svelte';
	import MobileMenu from '$lib/navbar/Mobile.svelte';
	import LancasterLogo from '$lib/navbar/Picture1.png';
	import MenuMain from '$lib/navbar/menu/MenuMain.svelte';
	import { devMode, devModeLocal } from '$lib/utils/utils';
	import { Menu } from '@lucide/svelte';
	import { onMount } from 'svelte';

	const uid = $props.id();
	const menuID = `mobile-menu-${uid}`;

	onMount(() => {
		devMode.set(localStorage.getItem('devMode') === 'true');
		devModeLocal.set(localStorage.getItem('devModeLocal') === 'true');

		devMode.subscribe((value) => {
			localStorage.setItem('devMode', String(value));
		});
		devModeLocal.subscribe((value) => {
			localStorage.setItem('devModeLocal', String(value));
		});
	});

	const floatingNavbar = ''; //'m-4 rounded-xl';

	const SideMenu: Route[] = $derived(page.data.SideMenu);
</script>

<!-- Mobile menu -->
<MobileMenu uid={menuID} />

<!-- NavBar -->
<header class="relative z-100">
	{#if $devMode}
		<div class=" bg-gray-200">
			<div class=" bg-primary-500/50 text-center text-sm text-gray-900 dark:bg-white/10">
				<div class="font-semibold">Dev!</div>
			</div>
		</div>
	{/if}

	<nav aria-label="Top" class="mb-4 bg-lu text-white shadow-xs {floatingNavbar}">
		<div class="relative mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
			<!-- Desktop menu (lg+) -->
			<div class="absolute inset-y-0 left-1/2 hidden h-full -translate-x-1/2 lg:flex">
				<!-- Flyout menus -->
				<el-popover-group class="group/popover-group inset-x-0 bottom-0 px-4">
					<!-- Presentational element to emulate a border that sits on top of the popover -->
					<div class="absolute inset-x-0 -bottom-px h-px w-full bg-white opacity-0 transition-opacity duration-200 ease-in group-has-open/popover-group:opacity-100 group-has-open/popover-group:duration-150 group-has-open/popover-group:ease-out">
						<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
							<div class="h-px w-full bg-gray-200"></div>
						</div>
					</div>

					<MenuMain showFeaturedItems class="flex h-full justify-center gap-x-8" />
				</el-popover-group>
			</div>

			<!-- Mobile menu (lg-) -->
			<div class="flex flex-1 items-center lg:hidden">
				<button type="button" command="show-modal" commandfor={menuID} class="rounded-m -ml-2 p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:focus-visible:outline-primary-500">
					<span class="sr-only">Open menu</span>
					<Menu class="size-6" />
				</button>
			</div>

			<!-- Logo -->
			<BaseLink link={Routes.home.id} class="absolute left-1/2 flex -translate-x-1/2 lg:relative lg:left-0 lg:order-first lg:translate-x-0">
				<Logo class="m-auto h-8" />
			</BaseLink>

			<div class="absolute top-20 right-5 flex gap-2 sm:gap-4">
				{#each SideMenu as route}
					<IconLink link={route.id} icon={{ icon: route.icon, class: 'size-4 sm:size-5', tooltip: route.title }} class="rounded-full border-1 sm:border-2 border-secondary-500 p-1.5 sm:p-2 text-secondary-500 shadow-sm" />
				{/each}
			</div>

			<!-- Logo -->
			<BaseLink link="https://www.lancaster.ac.uk/" class="lg:order-last">
				<BaseImg src={LancasterLogo} alt="Devices Lab" class="-mb-1 h-10" />
			</BaseLink>
		</div>
	</nav>
</header>
