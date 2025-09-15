<script lang="ts">
	import Menu from '$lib/navbar/menu/Menu.svelte';

	const { uid }: { uid: string } = $props();
</script>

<el-dialog>
	<dialog id={uid} class="backdrop:bg-transparent lg:hidden">
		<el-dialog-backdrop class="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"></el-dialog-backdrop>
		<div tabindex="-1" class="fixed inset-0 flex focus:outline-none">
			<el-dialog-panel class="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full dark:bg-gray-900">
				<div class="flex px-4 pt-5 pb-2">
					<button type="button" command="close" commandfor={uid} class="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400">
						<span class="absolute -inset-0.5"></span>
						<span class="sr-only">Close menu</span>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6">
							<path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</button>
				</div>

				<div class="space-y-1 border-t border-gray-200 px-4 py-6">
					<Menu class="-mx-2 block p-2 font-medium text-gray-900 dark:text-gray-200" />
				</div>
			</el-dialog-panel>
		</div>
	</dialog>
</el-dialog>
