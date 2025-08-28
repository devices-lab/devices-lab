<script lang="ts">
	import type { ItemType } from '$lib/items/item';
	import ItemCard from '$lib/items/Card.svelte';

	import { Routes } from '$lib/routes';

	const { items }: { items: ItemType[] } = $props();
</script>

<!-- Mobile filter dialog -->
{#if false}
	<el-dialog>
		<dialog id="mobile-filters" class="overflow-hidden backdrop:bg-transparent sm:hidden">
			<el-dialog-backdrop class="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"></el-dialog-backdrop>

			<div tabindex="-1" class="fixed inset-0 flex focus:outline-none">
				<el-dialog-panel class="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full">
					<div class="flex items-center justify-between px-4">
						<h2 class="text-lg font-medium text-gray-900">Filters</h2>
						<button type="button" command="close" commandfor="mobile-filters" class="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden">
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
									<span class="font-medium text-gray-900">Category</span>
									<span class="ml-6 flex items-center">
										<svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5 transform not-in-aria-expanded:rotate-0 in-aria-expanded:-rotate-180">
											<path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
										</svg>
									</span>
								</button>
							</h3>
							<el-disclosure id="filter-section-category" hidden class="block pt-6">
								<div class="space-y-6">
									<div class="flex gap-3">
										<div class="flex h-5 shrink-0 items-center">
											<div class="group grid size-4 grid-cols-1">
												<input id="filter-mobile-category-0" type="checkbox" name="category[]" value="tees" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
												<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
													<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
													<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
												</svg>
											</div>
										</div>
										<label for="filter-mobile-category-0" class="ml-3 text-sm text-gray-500">Tees</label>
									</div>
									<div class="flex gap-3">
										<div class="flex h-5 shrink-0 items-center">
											<div class="group grid size-4 grid-cols-1">
												<input id="filter-mobile-category-1" type="checkbox" name="category[]" value="crewnecks" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
												<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
													<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
													<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
												</svg>
											</div>
										</div>
										<label for="filter-mobile-category-1" class="ml-3 text-sm text-gray-500">Crewnecks</label>
									</div>
									<div class="flex gap-3">
										<div class="flex h-5 shrink-0 items-center">
											<div class="group grid size-4 grid-cols-1">
												<input id="filter-mobile-category-2" type="checkbox" name="category[]" value="hats" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
												<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
													<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
													<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
												</svg>
											</div>
										</div>
										<label for="filter-mobile-category-2" class="ml-3 text-sm text-gray-500">Hats</label>
									</div>
									<div class="flex gap-3">
										<div class="flex h-5 shrink-0 items-center">
											<div class="group grid size-4 grid-cols-1">
												<input id="filter-mobile-category-3" type="checkbox" name="category[]" value="bundles" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
												<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
													<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
													<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
												</svg>
											</div>
										</div>
										<label for="filter-mobile-category-3" class="ml-3 text-sm text-gray-500">Bundles</label>
									</div>
									<div class="flex gap-3">
										<div class="flex h-5 shrink-0 items-center">
											<div class="group grid size-4 grid-cols-1">
												<input id="filter-mobile-category-4" type="checkbox" name="category[]" value="carry" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
												<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
													<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
													<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
												</svg>
											</div>
										</div>
										<label for="filter-mobile-category-4" class="ml-3 text-sm text-gray-500">Carry</label>
									</div>
									<div class="flex gap-3">
										<div class="flex h-5 shrink-0 items-center">
											<div class="group grid size-4 grid-cols-1">
												<input id="filter-mobile-category-5" type="checkbox" name="category[]" value="objects" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
												<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
													<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
													<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
												</svg>
											</div>
										</div>
										<label for="filter-mobile-category-5" class="ml-3 text-sm text-gray-500">Objects</label>
									</div>
								</div>
							</el-disclosure>
						</div>
						<div class="border-t border-gray-200 px-4 py-6">
							<h3 class="-mx-2 -my-3 flow-root">
								<button type="button" command="--toggle" commandfor="filter-section-brand" class="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
									<span class="font-medium text-gray-900">Brand</span>
									<span class="ml-6 flex items-center">
										<svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5 transform not-in-aria-expanded:rotate-0 in-aria-expanded:-rotate-180">
											<path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
										</svg>
									</span>
								</button>
							</h3>
							<el-disclosure id="filter-section-brand" hidden class="block pt-6">
								<div class="space-y-6">
									<div class="flex gap-3">
										<div class="flex h-5 shrink-0 items-center">
											<div class="group grid size-4 grid-cols-1">
												<input id="filter-mobile-brand-0" type="checkbox" name="brand[]" value="clothing-company" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
												<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
													<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
													<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
												</svg>
											</div>
										</div>
										<label for="filter-mobile-brand-0" class="ml-3 text-sm text-gray-500">Clothing Company</label>
									</div>
									<div class="flex gap-3">
										<div class="flex h-5 shrink-0 items-center">
											<div class="group grid size-4 grid-cols-1">
												<input id="filter-mobile-brand-1" type="checkbox" name="brand[]" value="fashion-inc" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
												<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
													<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
													<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
												</svg>
											</div>
										</div>
										<label for="filter-mobile-brand-1" class="ml-3 text-sm text-gray-500">Fashion Inc.</label>
									</div>
									<div class="flex gap-3">
										<div class="flex h-5 shrink-0 items-center">
											<div class="group grid size-4 grid-cols-1">
												<input id="filter-mobile-brand-2" type="checkbox" name="brand[]" value="shoes-n-more" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
												<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
													<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
													<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
												</svg>
											</div>
										</div>
										<label for="filter-mobile-brand-2" class="ml-3 text-sm text-gray-500">Shoes &#039;n More</label>
									</div>
									<div class="flex gap-3">
										<div class="flex h-5 shrink-0 items-center">
											<div class="group grid size-4 grid-cols-1">
												<input id="filter-mobile-brand-3" type="checkbox" name="brand[]" value="supplies-n-stuff" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
												<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
													<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
													<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
												</svg>
											</div>
										</div>
										<label for="filter-mobile-brand-3" class="ml-3 text-sm text-gray-500">Supplies &#039;n Stuff</label>
									</div>
								</div>
							</el-disclosure>
						</div>
						<div class="border-t border-gray-200 px-4 py-6">
							<h3 class="-mx-2 -my-3 flow-root">
								<button type="button" command="--toggle" commandfor="filter-section-color" class="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
									<span class="font-medium text-gray-900">Color</span>
									<span class="ml-6 flex items-center">
										<svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5 transform not-in-aria-expanded:rotate-0 in-aria-expanded:-rotate-180">
											<path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
										</svg>
									</span>
								</button>
							</h3>
							<el-disclosure id="filter-section-color" hidden class="block pt-6">
								<div class="space-y-6">
									<div class="flex gap-3">
										<div class="flex h-5 shrink-0 items-center">
											<div class="group grid size-4 grid-cols-1">
												<input id="filter-mobile-color-0" type="checkbox" name="color[]" value="white" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
												<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
													<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
													<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
												</svg>
											</div>
										</div>
										<label for="filter-mobile-color-0" class="ml-3 text-sm text-gray-500">White</label>
									</div>
									<div class="flex gap-3">
										<div class="flex h-5 shrink-0 items-center">
											<div class="group grid size-4 grid-cols-1">
												<input id="filter-mobile-color-1" type="checkbox" name="color[]" value="black" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
												<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
													<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
													<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
												</svg>
											</div>
										</div>
										<label for="filter-mobile-color-1" class="ml-3 text-sm text-gray-500">Black</label>
									</div>
									<div class="flex gap-3">
										<div class="flex h-5 shrink-0 items-center">
											<div class="group grid size-4 grid-cols-1">
												<input id="filter-mobile-color-2" type="checkbox" name="color[]" value="grey" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
												<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
													<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
													<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
												</svg>
											</div>
										</div>
										<label for="filter-mobile-color-2" class="ml-3 text-sm text-gray-500">Grey</label>
									</div>
									<div class="flex gap-3">
										<div class="flex h-5 shrink-0 items-center">
											<div class="group grid size-4 grid-cols-1">
												<input id="filter-mobile-color-3" type="checkbox" name="color[]" value="blue" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
												<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
													<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
													<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
												</svg>
											</div>
										</div>
										<label for="filter-mobile-color-3" class="ml-3 text-sm text-gray-500">Blue</label>
									</div>
									<div class="flex gap-3">
										<div class="flex h-5 shrink-0 items-center">
											<div class="group grid size-4 grid-cols-1">
												<input id="filter-mobile-color-4" type="checkbox" name="color[]" value="olive" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
												<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
													<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
													<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
												</svg>
											</div>
										</div>
										<label for="filter-mobile-color-4" class="ml-3 text-sm text-gray-500">Olive</label>
									</div>
									<div class="flex gap-3">
										<div class="flex h-5 shrink-0 items-center">
											<div class="group grid size-4 grid-cols-1">
												<input id="filter-mobile-color-5" type="checkbox" name="color[]" value="tan" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
												<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
													<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
													<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
												</svg>
											</div>
										</div>
										<label for="filter-mobile-color-5" class="ml-3 text-sm text-gray-500">Tan</label>
									</div>
								</div>
							</el-disclosure>
						</div>
						<div class="border-t border-gray-200 px-4 py-6">
							<h3 class="-mx-2 -my-3 flow-root">
								<button type="button" command="--toggle" commandfor="filter-section-sizes" class="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
									<span class="font-medium text-gray-900">Sizes</span>
									<span class="ml-6 flex items-center">
										<svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5 transform not-in-aria-expanded:rotate-0 in-aria-expanded:-rotate-180">
											<path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
										</svg>
									</span>
								</button>
							</h3>
							<el-disclosure id="filter-section-sizes" hidden class="block pt-6">
								<div class="space-y-6">
									<div class="flex gap-3">
										<div class="flex h-5 shrink-0 items-center">
											<div class="group grid size-4 grid-cols-1">
												<input id="filter-mobile-sizes-0" type="checkbox" name="sizes[]" value="xs" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
												<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
													<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
													<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
												</svg>
											</div>
										</div>
										<label for="filter-mobile-sizes-0" class="ml-3 text-sm text-gray-500">XS</label>
									</div>
									<div class="flex gap-3">
										<div class="flex h-5 shrink-0 items-center">
											<div class="group grid size-4 grid-cols-1">
												<input id="filter-mobile-sizes-1" type="checkbox" name="sizes[]" value="s" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
												<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
													<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
													<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
												</svg>
											</div>
										</div>
										<label for="filter-mobile-sizes-1" class="ml-3 text-sm text-gray-500">S</label>
									</div>
									<div class="flex gap-3">
										<div class="flex h-5 shrink-0 items-center">
											<div class="group grid size-4 grid-cols-1">
												<input id="filter-mobile-sizes-2" type="checkbox" name="sizes[]" value="m" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
												<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
													<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
													<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
												</svg>
											</div>
										</div>
										<label for="filter-mobile-sizes-2" class="ml-3 text-sm text-gray-500">M</label>
									</div>
									<div class="flex gap-3">
										<div class="flex h-5 shrink-0 items-center">
											<div class="group grid size-4 grid-cols-1">
												<input id="filter-mobile-sizes-3" type="checkbox" name="sizes[]" value="l" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
												<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
													<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
													<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
												</svg>
											</div>
										</div>
										<label for="filter-mobile-sizes-3" class="ml-3 text-sm text-gray-500">L</label>
									</div>
									<div class="flex gap-3">
										<div class="flex h-5 shrink-0 items-center">
											<div class="group grid size-4 grid-cols-1">
												<input id="filter-mobile-sizes-4" type="checkbox" name="sizes[]" value="xl" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
												<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
													<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
													<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
												</svg>
											</div>
										</div>
										<label for="filter-mobile-sizes-4" class="ml-3 text-sm text-gray-500">XL</label>
									</div>
									<div class="flex gap-3">
										<div class="flex h-5 shrink-0 items-center">
											<div class="group grid size-4 grid-cols-1">
												<input id="filter-mobile-sizes-5" type="checkbox" name="sizes[]" value="2xl" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
												<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
													<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
													<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
												</svg>
											</div>
										</div>
										<label for="filter-mobile-sizes-5" class="ml-3 text-sm text-gray-500">2XL</label>
									</div>
								</div>
							</el-disclosure>
						</div>
					</form>
				</el-dialog-panel>
			</div>
		</dialog>
	</el-dialog>

	<!-- Filters -->
	<section aria-labelledby="filter-heading">
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
						<a href={Routes.home.href} class="block px-4 py-2 text-sm font-medium text-gray-900 focus:bg-gray-100 focus:outline-hidden">Most Popular</a>
						<a href={Routes.home.href} class="block px-4 py-2 text-sm font-medium text-gray-900 focus:bg-gray-100 focus:outline-hidden">Best Rating</a>
						<a href={Routes.home.href} class="block px-4 py-2 text-sm font-medium text-gray-900 focus:bg-gray-100 focus:outline-hidden">Newest</a>
						<a href={Routes.home.href} class="block px-4 py-2 text-sm font-medium text-gray-900 focus:bg-gray-100 focus:outline-hidden">Price: Low to High</a>
						<a href={Routes.home.href} class="block px-4 py-2 text-sm font-medium text-gray-900 focus:bg-gray-100 focus:outline-hidden">Price: High to Low</a>
					</div>
				</el-menu>
			</el-dropdown>

			<button type="button" command="show-modal" commandfor="mobile-filters" class="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden">Filters</button>

			<el-popover-group class="hidden sm:flex sm:items-baseline sm:space-x-8">
				<div class="relative inline-block text-left">
					<div>
						<button popovertarget="desktop-section-category" class="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
							<span>Category</span>
							<span class="ml-1.5 rounded-sm bg-gray-200 px-1.5 py-0.5 text-xs font-semibold text-gray-700 tabular-nums">1</span>
							<svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500">
								<path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
							</svg>
						</button>
					</div>

					<el-popover id="desktop-section-category" anchor="bottom end" popover="auto" class="origin-top-right overflow-visible rounded-md bg-white p-4 shadow-2xl ring-1 ring-black/5 transition transition-discrete [--anchor-gap:--spacing(2)] backdrop:bg-transparent open:block focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
						<form class="space-y-4">
							<div class="flex gap-3">
								<div class="flex h-5 shrink-0 items-center">
									<div class="group grid size-4 grid-cols-1">
										<input id="filter-category-0" type="checkbox" name="category[]" value="tees" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
										<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
											<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
											<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
										</svg>
									</div>
								</div>
								<label for="filter-category-0" class="pr-6 text-sm font-medium whitespace-nowrap text-gray-900">Tees</label>
							</div>
							<div class="flex gap-3">
								<div class="flex h-5 shrink-0 items-center">
									<div class="group grid size-4 grid-cols-1">
										<input id="filter-category-1" type="checkbox" name="category[]" value="crewnecks" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
										<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
											<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
											<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
										</svg>
									</div>
								</div>
								<label for="filter-category-1" class="pr-6 text-sm font-medium whitespace-nowrap text-gray-900">Crewnecks</label>
							</div>
							<div class="flex gap-3">
								<div class="flex h-5 shrink-0 items-center">
									<div class="group grid size-4 grid-cols-1">
										<input id="filter-category-2" type="checkbox" name="category[]" value="hats" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
										<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
											<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
											<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
										</svg>
									</div>
								</div>
								<label for="filter-category-2" class="pr-6 text-sm font-medium whitespace-nowrap text-gray-900">Hats</label>
							</div>
							<div class="flex gap-3">
								<div class="flex h-5 shrink-0 items-center">
									<div class="group grid size-4 grid-cols-1">
										<input id="filter-category-3" type="checkbox" name="category[]" value="bundles" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
										<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
											<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
											<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
										</svg>
									</div>
								</div>
								<label for="filter-category-3" class="pr-6 text-sm font-medium whitespace-nowrap text-gray-900">Bundles</label>
							</div>
							<div class="flex gap-3">
								<div class="flex h-5 shrink-0 items-center">
									<div class="group grid size-4 grid-cols-1">
										<input id="filter-category-4" type="checkbox" name="category[]" value="carry" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
										<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
											<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
											<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
										</svg>
									</div>
								</div>
								<label for="filter-category-4" class="pr-6 text-sm font-medium whitespace-nowrap text-gray-900">Carry</label>
							</div>
							<div class="flex gap-3">
								<div class="flex h-5 shrink-0 items-center">
									<div class="group grid size-4 grid-cols-1">
										<input id="filter-category-5" type="checkbox" name="category[]" value="objects" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
										<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
											<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
											<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
										</svg>
									</div>
								</div>
								<label for="filter-category-5" class="pr-6 text-sm font-medium whitespace-nowrap text-gray-900">Objects</label>
							</div>
						</form>
					</el-popover>
				</div>
				<div class="relative inline-block text-left">
					<div>
						<button popovertarget="desktop-section-brand" class="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
							<span>Brand</span>
							<svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500">
								<path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
							</svg>
						</button>
					</div>

					<el-popover id="desktop-section-brand" anchor="bottom end" popover="auto" class="origin-top-right overflow-visible rounded-md bg-white p-4 shadow-2xl ring-1 ring-black/5 transition transition-discrete [--anchor-gap:--spacing(2)] backdrop:bg-transparent open:block focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
						<form class="space-y-4">
							<div class="flex gap-3">
								<div class="flex h-5 shrink-0 items-center">
									<div class="group grid size-4 grid-cols-1">
										<input id="filter-brand-0" type="checkbox" name="brand[]" value="clothing-company" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
										<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
											<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
											<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
										</svg>
									</div>
								</div>
								<label for="filter-brand-0" class="pr-6 text-sm font-medium whitespace-nowrap text-gray-900">Clothing Company</label>
							</div>
							<div class="flex gap-3">
								<div class="flex h-5 shrink-0 items-center">
									<div class="group grid size-4 grid-cols-1">
										<input id="filter-brand-1" type="checkbox" name="brand[]" value="fashion-inc" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
										<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
											<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
											<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
										</svg>
									</div>
								</div>
								<label for="filter-brand-1" class="pr-6 text-sm font-medium whitespace-nowrap text-gray-900">Fashion Inc.</label>
							</div>
							<div class="flex gap-3">
								<div class="flex h-5 shrink-0 items-center">
									<div class="group grid size-4 grid-cols-1">
										<input id="filter-brand-2" type="checkbox" name="brand[]" value="shoes-n-more" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
										<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
											<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
											<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
										</svg>
									</div>
								</div>
								<label for="filter-brand-2" class="pr-6 text-sm font-medium whitespace-nowrap text-gray-900">Shoes &#039;n More</label>
							</div>
							<div class="flex gap-3">
								<div class="flex h-5 shrink-0 items-center">
									<div class="group grid size-4 grid-cols-1">
										<input id="filter-brand-3" type="checkbox" name="brand[]" value="supplies-n-stuff" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
										<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
											<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
											<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
										</svg>
									</div>
								</div>
								<label for="filter-brand-3" class="pr-6 text-sm font-medium whitespace-nowrap text-gray-900">Supplies &#039;n Stuff</label>
							</div>
						</form>
					</el-popover>
				</div>
				<div class="relative inline-block text-left">
					<div>
						<button popovertarget="desktop-section-color" class="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
							<span>Color</span>
							<svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500">
								<path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
							</svg>
						</button>
					</div>

					<el-popover id="desktop-section-color" anchor="bottom end" popover="auto" class="origin-top-right overflow-visible rounded-md bg-white p-4 shadow-2xl ring-1 ring-black/5 transition transition-discrete [--anchor-gap:--spacing(2)] backdrop:bg-transparent open:block focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
						<form class="space-y-4">
							<div class="flex gap-3">
								<div class="flex h-5 shrink-0 items-center">
									<div class="group grid size-4 grid-cols-1">
										<input id="filter-color-0" type="checkbox" name="color[]" value="white" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
										<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
											<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
											<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
										</svg>
									</div>
								</div>
								<label for="filter-color-0" class="pr-6 text-sm font-medium whitespace-nowrap text-gray-900">White</label>
							</div>
							<div class="flex gap-3">
								<div class="flex h-5 shrink-0 items-center">
									<div class="group grid size-4 grid-cols-1">
										<input id="filter-color-1" type="checkbox" name="color[]" value="black" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
										<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
											<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
											<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
										</svg>
									</div>
								</div>
								<label for="filter-color-1" class="pr-6 text-sm font-medium whitespace-nowrap text-gray-900">Black</label>
							</div>
							<div class="flex gap-3">
								<div class="flex h-5 shrink-0 items-center">
									<div class="group grid size-4 grid-cols-1">
										<input id="filter-color-2" type="checkbox" name="color[]" value="grey" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
										<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
											<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
											<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
										</svg>
									</div>
								</div>
								<label for="filter-color-2" class="pr-6 text-sm font-medium whitespace-nowrap text-gray-900">Grey</label>
							</div>
							<div class="flex gap-3">
								<div class="flex h-5 shrink-0 items-center">
									<div class="group grid size-4 grid-cols-1">
										<input id="filter-color-3" type="checkbox" name="color[]" value="blue" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
										<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
											<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
											<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
										</svg>
									</div>
								</div>
								<label for="filter-color-3" class="pr-6 text-sm font-medium whitespace-nowrap text-gray-900">Blue</label>
							</div>
							<div class="flex gap-3">
								<div class="flex h-5 shrink-0 items-center">
									<div class="group grid size-4 grid-cols-1">
										<input id="filter-color-4" type="checkbox" name="color[]" value="olive" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
										<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
											<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
											<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
										</svg>
									</div>
								</div>
								<label for="filter-color-4" class="pr-6 text-sm font-medium whitespace-nowrap text-gray-900">Olive</label>
							</div>
							<div class="flex gap-3">
								<div class="flex h-5 shrink-0 items-center">
									<div class="group grid size-4 grid-cols-1">
										<input id="filter-color-5" type="checkbox" name="color[]" value="tan" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
										<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
											<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
											<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
										</svg>
									</div>
								</div>
								<label for="filter-color-5" class="pr-6 text-sm font-medium whitespace-nowrap text-gray-900">Tan</label>
							</div>
						</form>
					</el-popover>
				</div>
				<div class="relative inline-block text-left">
					<div>
						<button popovertarget="desktop-section-sizes" class="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
							<span>Sizes</span>
							<svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500">
								<path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
							</svg>
						</button>
					</div>

					<el-popover id="desktop-section-sizes" anchor="bottom end" popover="auto" class="origin-top-right overflow-visible rounded-md bg-white p-4 shadow-2xl ring-1 ring-black/5 transition transition-discrete [--anchor-gap:--spacing(2)] backdrop:bg-transparent open:block focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
						<form class="space-y-4">
							<div class="flex gap-3">
								<div class="flex h-5 shrink-0 items-center">
									<div class="group grid size-4 grid-cols-1">
										<input id="filter-sizes-0" type="checkbox" name="sizes[]" value="xs" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
										<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
											<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
											<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
										</svg>
									</div>
								</div>
								<label for="filter-sizes-0" class="pr-6 text-sm font-medium whitespace-nowrap text-gray-900">XS</label>
							</div>
							<div class="flex gap-3">
								<div class="flex h-5 shrink-0 items-center">
									<div class="group grid size-4 grid-cols-1">
										<input id="filter-sizes-1" type="checkbox" name="sizes[]" value="s" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
										<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
											<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
											<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
										</svg>
									</div>
								</div>
								<label for="filter-sizes-1" class="pr-6 text-sm font-medium whitespace-nowrap text-gray-900">S</label>
							</div>
							<div class="flex gap-3">
								<div class="flex h-5 shrink-0 items-center">
									<div class="group grid size-4 grid-cols-1">
										<input id="filter-sizes-2" type="checkbox" name="sizes[]" value="m" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
										<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
											<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
											<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
										</svg>
									</div>
								</div>
								<label for="filter-sizes-2" class="pr-6 text-sm font-medium whitespace-nowrap text-gray-900">M</label>
							</div>
							<div class="flex gap-3">
								<div class="flex h-5 shrink-0 items-center">
									<div class="group grid size-4 grid-cols-1">
										<input id="filter-sizes-3" type="checkbox" name="sizes[]" value="l" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
										<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
											<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
											<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
										</svg>
									</div>
								</div>
								<label for="filter-sizes-3" class="pr-6 text-sm font-medium whitespace-nowrap text-gray-900">L</label>
							</div>
							<div class="flex gap-3">
								<div class="flex h-5 shrink-0 items-center">
									<div class="group grid size-4 grid-cols-1">
										<input id="filter-sizes-4" type="checkbox" name="sizes[]" value="xl" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
										<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
											<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
											<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
										</svg>
									</div>
								</div>
								<label for="filter-sizes-4" class="pr-6 text-sm font-medium whitespace-nowrap text-gray-900">XL</label>
							</div>
							<div class="flex gap-3">
								<div class="flex h-5 shrink-0 items-center">
									<div class="group grid size-4 grid-cols-1">
										<input id="filter-sizes-5" type="checkbox" name="sizes[]" value="2xl" class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
										<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
											<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
											<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
										</svg>
									</div>
								</div>
								<label for="filter-sizes-5" class="pr-6 text-sm font-medium whitespace-nowrap text-gray-900">2XL</label>
							</div>
						</form>
					</el-popover>
				</div>
			</el-popover-group>
		</div>
	</section>
{/if}

{#if items.length}
	<section aria-labelledby="items-heading" class="mt-8">
		<h2 id="items-heading" class="sr-only">Items</h2>

		<div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-10">
			{#each items as item}
				<ItemCard {item} />
			{/each}
		</div>
	</section>
{:else}
	<p class="text-center text-sm text-gray-500 italic">No items found.</p>
{/if}
