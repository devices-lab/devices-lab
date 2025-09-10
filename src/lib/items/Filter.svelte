<script lang="ts">
	import BaseLink from '$lib/components/interactive/BaseLink.svelte';
	import { Routes } from '$lib/data/routes';
</script>

{#snippet filter(id: string, name: string, value: string, label: string)}
	<div class="flex gap-3">
		<div class="flex h-5 shrink-0 items-center">
			<div class="group grid size-4 grid-cols-1">
				<input {id} type="checkbox" {name} {value} class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-primary-600 checked:bg-primary-600 indeterminate:border-primary-600 indeterminate:bg-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
				<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
					<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
					<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
				</svg>
			</div>
		</div>
		<label for="filter-category-0" class="pr-6 text-sm font-medium whitespace-nowrap text-gray-900">{label}</label>
	</div>
{/snippet}

{#snippet filterMobile(id: string, name: string, value: string, label: string)}
	<div class="flex gap-3">
		<div class="flex h-5 shrink-0 items-center">
			<div class="group grid size-4 grid-cols-1">
				<input {id} type="checkbox" {name} {value} class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-primary-600 checked:bg-primary-600 indeterminate:border-primary-600 indeterminate:bg-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
				<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
					<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
					<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
				</svg>
			</div>
		</div>
		<label for="filter-mobile-category-1" class="ml-3 text-sm text-gray-500">{label}</label>
	</div>
{/snippet}

<el-dialog>
	<dialog id="mobile-filters" class="overflow-hidden backdrop:bg-transparent sm:hidden">
		<el-dialog-backdrop class="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"></el-dialog-backdrop>

		<div tabindex="-1" class="fixed inset-0 flex focus:outline-none">
			<el-dialog-panel class="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full">
				<div class="flex items-center justify-between px-4">
					<h2 class="text-lg font-medium text-gray-900">Filters</h2>
					<button type="button" command="close" commandfor="mobile-filters" class="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-primary-500 focus:outline-hidden">
						<span class="absolute -inset-0.5"></span>
						<span class="sr-only">Close menu</span>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6">
							<path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</button>
				</div>

				<!-- Filters -->
				<form class="mt-4">
					<div class="border-t border-gray-200 px-4 py-6">
						<h3 class="-mx-2 -my-3 flow-root">
							<button type="button" command="--toggle" commandfor="filter-section-category" class="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
								<span class="font-medium text-gray-900">Tags</span>
								<span class="ml-6 flex items-center">
									<svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5 transform not-in-aria-expanded:rotate-0 in-aria-expanded:-rotate-180">
										<path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
									</svg>
								</span>
							</button>
						</h3>
						<el-disclosure id="filter-section-category" hidden class="block pt-6">
							<div class="space-y-6">
								{@render filterMobile('filter-mobile-category-0', 'category[]', 'tees', 'micro:bit')}
								{@render filterMobile('filter-mobile-category-1', 'category[]', 'crewnecks', 'jacdac')}
								{@render filterMobile('filter-mobile-category-2', 'category[]', 'hats', 'pcb')}
								{@render filterMobile('filter-mobile-category-3', 'category[]', 'bundles', 'prototyping')}
								{@render filterMobile('filter-mobile-category-4', 'category[]', 'carry', 'toolkit')}
								{@render filterMobile('filter-mobile-category-5', 'category[]', 'objects', 'soldering')}
							</div>
						</el-disclosure>
					</div>
					<div class="border-t border-gray-200 px-4 py-6">
						<h3 class="-mx-2 -my-3 flow-root">
							<button type="button" command="--toggle" commandfor="filter-section-brand" class="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
								<span class="font-medium text-gray-900">Type</span>
								<span class="ml-6 flex items-center">
									<svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5 transform not-in-aria-expanded:rotate-0 in-aria-expanded:-rotate-180">
										<path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
									</svg>
								</span>
							</button>
						</h3>
						<el-disclosure id="filter-section-brand" hidden class="block pt-6">
							<div class="space-y-6">
								{@render filterMobile('filter-mobile-brand-0', 'brand[]', 'clothing-company', 'Items')}
								{@render filterMobile('filter-mobile-brand-1', 'brand[]', 'fashion-inc', 'Family')}
							</div>
						</el-disclosure>
					</div>
				</form>
			</el-dialog-panel>
		</div>
	</dialog>
</el-dialog>

<!-- Filters -->
<section aria-labelledby="filter-heading" class="px-4">
	<h2 id="filter-heading" class="sr-only">Product filters</h2>

	<div class="flex items-center justify-between">
		<el-dropdown class="relative inline-block text-left">
			<button class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
				Sort
				<svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500">
					<path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
				</svg>
			</button>

			<el-menu anchor="bottom start" popover="auto" class="w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition transition-discrete [--anchor-gap:--spacing(2)] focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
				<div class="py-1">
					<BaseLink link={Routes.home.id} class="block px-4 py-2 text-sm font-medium text-gray-900 focus:bg-gray-100 focus:outline-hidden">Name</BaseLink>
					<BaseLink link={Routes.home.id} class="block px-4 py-2 text-sm font-medium text-gray-900 focus:bg-gray-100 focus:outline-hidden">Newest</BaseLink>
				</div>
			</el-menu>
		</el-dropdown>

		<button type="button" command="show-modal" commandfor="mobile-filters" class="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden">Filters</button>

		<el-popover-group class="hidden sm:flex sm:items-baseline sm:space-x-8">
			<div class="relative inline-block text-left">
				<div>
					<button popovertarget="desktop-section-category" class="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
						<span>Tags</span>
						<span class="ml-1.5 rounded-sm bg-gray-200 px-1.5 py-0.5 text-xs font-semibold text-gray-700 tabular-nums">1</span>
						<svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500">
							<path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
						</svg>
					</button>
				</div>

				<el-popover id="desktop-section-category" anchor="bottom end" popover="auto" class="origin-top-right overflow-visible rounded-md bg-white p-4 shadow-2xl ring-1 ring-black/5 transition transition-discrete [--anchor-gap:--spacing(2)] backdrop:bg-transparent open:block focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
					<form class="space-y-4">
						{@render filter('filter-mobile-category-0', 'category[]', 'tees', 'micro:bit')}
						{@render filter('filter-mobile-category-1', 'category[]', 'crewnecks', 'jacdac')}
						{@render filter('filter-mobile-category-2', 'category[]', 'hats', 'pcb')}
						{@render filter('filter-mobile-category-3', 'category[]', 'bundles', 'prototyping')}
						{@render filter('filter-mobile-category-4', 'category[]', 'carry', 'toolkit')}
						{@render filter('filter-mobile-category-5', 'category[]', 'objects', 'soldering')}
					</form>
				</el-popover>
			</div>
			<div class="relative inline-block text-left">
				<div>
					<button popovertarget="desktop-section-brand" class="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
						<span>Type</span>
						<svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500">
							<path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
						</svg>
					</button>
				</div>

				<el-popover id="desktop-section-brand" anchor="bottom end" popover="auto" class="origin-top-right overflow-visible rounded-md bg-white p-4 shadow-2xl ring-1 ring-black/5 transition transition-discrete [--anchor-gap:--spacing(2)] backdrop:bg-transparent open:block focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
					<form class="space-y-4">
						{@render filter('filter-brand-0', 'brand[]', 'clothing-company', 'Item')}
						{@render filter('filter-brand-1', 'brand[]', 'fashion-inc', 'Family')}
					</form>
				</el-popover>
			</div>
		</el-popover-group>
	</div>
</section>
