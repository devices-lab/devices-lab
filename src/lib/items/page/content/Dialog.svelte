<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import CloseButton from '$lib/components/interactive/CloseButton.svelte';
	import type { ResearchItem, Publication } from '$lib/data/research';
	import ResearchCard from '$lib/research/ResearchCard.svelte';
	import type { DefProps } from '$lib/utils/utils';

	type Props = DefProps & {
		publication: Publication | undefined;
		dialogId: string;
	};

	let { publication = $bindable(), dialogId, ...props }: Props = $props();

	function onDialogClose() {
		publication = undefined;
	}
</script>

<el-dialog>
	<dialog id={dialogId} onclose={onDialogClose} aria-labelledby="dialog-title" class="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent">
		<el-dialog-backdrop class="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-gray-900/50"></el-dialog-backdrop>

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
				<ClassBox {props} class="relative">
					<CloseButton command="close" commandfor={dialogId} class="absolute top-10 right-4 z-10" />
					{#if publication}
						<ResearchCard item={publication as ResearchItem} />
					{/if}
				</ClassBox>
			</el-dialog-panel>
		</div>
	</dialog>
</el-dialog>
