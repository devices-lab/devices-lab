<script lang="ts">
	import CloseButton from '$lib/components/interactive/CloseButton.svelte';
	import type { Publication } from '$lib/data/data';
	import type { ResearchItem } from '$lib/data/research';
	import ResearchCard from '$lib/research/ResearchCard.svelte';

	type Props = {
		publication: Publication | undefined;
		dialogId: string;
	};

	let { publication = $bindable(), dialogId }: Props = $props();

	function onDialogClose() {
		publication = undefined;
	}
</script>

<el-dialog>
	<dialog id={dialogId} onclose={onDialogClose} aria-labelledby="dialog-title" class="fixed inset-0 top-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent">
		<el-dialog-backdrop class="fixed inset-0 -z-1 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-gray-900/50"></el-dialog-backdrop>

		<div tabindex="-1" class="flex min-h-full items-end justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0">
			<el-dialog-panel
				class="relative
					transform
					overflow-hidden
					rounded-3xl
					bg-white
					text-left
					shadow-xl
					transition-all
					data-closed:translate-y-4
					data-closed:opacity-0
					data-enter:duration-300
					data-enter:ease-out
					data-leave:duration-200
					data-leave:ease-in
					sm:my-8
					sm:w-full
					sm:max-w-3xl
					data-closed:sm:translate-y-0
					data-closed:sm:scale-95
					dark:bg-gray-800"
			>
				<div class="relative">
					<CloseButton props={{ command: 'close', commandfor: dialogId }} class="absolute top-3 left-3 z-10" />
					{#if publication}
						<ResearchCard item={publication as ResearchItem} />
					{/if}
				</div>
			</el-dialog-panel>
		</div>
	</dialog>
</el-dialog>
