<script lang="ts">
	import Checkbox from '$lib/components/base/Checkbox.svelte';
	import Disclosure from '$lib/components/interactive/Disclosure.svelte';
	import type { FilterItem } from '$lib/data/data';
	import { X } from '@lucide/svelte';

	export type Filter = {
		id: string;
		name: string;
		value: string;
		label: string;
	};

	type Props = {
		id: string;
		tags: FilterItem[];
		types: FilterItem[];
	};

	let { id, tags, types }: Props = $props();
</script>

<el-dialog>
	<dialog {id} class="overflow-hidden backdrop:bg-transparent sm:hidden">
		<el-dialog-backdrop class="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"></el-dialog-backdrop>

		<div tabindex="-1" class="fixed inset-0 flex focus:outline-none">
			<el-dialog-panel class="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full">
				<div class="flex items-center justify-between px-4">
					<h2 class="text-lg font-medium text-gray-900">Filters</h2>
					<button type="button" command="close" commandfor={id} class="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-primary focus:outline-hidden">
						<span class="absolute -inset-0.5"></span>
						<span class="sr-only">Close menu</span>
						<X class="size-6" />
					</button>
				</div>

				<!-- Filters -->
				<div class="mt-4">
					<Disclosure class="border-t border-gray-200" label={{ text: 'Tags', class: 'font-medium text-md text-gray-900' }}>
						<div class="space-y-6">
							{#each tags as item}
								<Checkbox name="tags[]" text={{ text: item.label, class: 'ms-3 text-sm text-gray-500 first-letter:uppercase' }} bind:checked={item.checked} class="gap-3" />
							{/each}
						</div>
					</Disclosure>
					<Disclosure class="border-t border-gray-200" label={{ text: 'Type', class: 'font-medium text-gray-900' }}>
						<div class="space-y-6">
							{#each types as item}
								<Checkbox name="types[]" text={{ text: item.label, class: 'ms-3 text-sm text-gray-500 first-letter:uppercase' }} bind:checked={item.checked} class="gap-3" />
							{/each}
						</div>
					</Disclosure>
				</div>
			</el-dialog-panel>
		</div>
	</dialog>
</el-dialog>
