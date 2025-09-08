<script lang="ts">
	import BaseList from '$lib/components/BaseList.svelte';
	import ClassBox from '$lib/components/ClassBox.svelte';
	import Collapse from '$lib/components/Collapse.svelte';
	import IconButton from '$lib/components/icons/IconButton.svelte';
	import IconText from '$lib/components/icons/IconText.svelte';
	import type { ItemType } from '$lib/data/item';
	import type { ResearchType } from '$lib/data/research';
	import Dialog from '$lib/items/page/content/Dialog.svelte';
	import type { DefProps } from '$lib/utils/utils';
	import { ScrollText, Search } from '@lucide/svelte';

	type Props = DefProps & {
		item: ItemType;
	};

	const { item, ...props }: Props = $props();
	const uid = $props.id();
	const dialogId = $derived(`dialog-${uid}`);

	let selectedPublication: ResearchType | undefined = $state();

	function openPublication(publication: ResearchType) {
		selectedPublication = publication;
	}
</script>

{#if item.publications && item.publications.length > 0}
	<!-- Publication Dialog -->
	<Dialog bind:publication={selectedPublication} {dialogId} />
	<!-- Publications List -->
	<ClassBox {props}>
		<Collapse label={'Publications'}>
			<BaseList bare class="flex flex-col items-start gap-y-5">
				{#each item.publications as publication}
					<div class="flex w-full items-center justify-between gap-4 pe-4">
						<IconText text={{ text: publication.title, class: 'flex-1', subtext: publication.type }} icon={{ icon: ScrollText, class: 'size-6' }} class="text-sm/5 font-semibold" />
						<IconButton onclick={() => openPublication(publication)} class="flex-0 rounded-lg border border-gray-100 p-0.5 text-start text-gray-400 shadow hover:border-primary-200 hover:text-primary-400 hover:shadow-none dark:border-gray-700 dark:shadow-none dark:hover:border-primary-500" icon={{ icon: Search, class: 'size-6', tooltip: 'View publication' }} command="show-modal" commandfor={dialogId} />
					</div>
				{/each}
			</BaseList>
		</Collapse>
	</ClassBox>
{/if}
