<script lang="ts">
	import BaseText from '$lib/components/base/BaseText.svelte';
	import IconText from '$lib/components/base/IconText.svelte';
	import TextButton from '$lib/components/base/TextButton.svelte';
	import type { Publication } from '$lib/data/data';
	import type { ItemData } from '$lib/data/indexer';
	import BaseCollapse from '$lib/items/page/content/BaseCollapse.svelte';
	import Dialog from '$lib/items/page/content/Dialog.svelte';
	import type { ClassProp } from '$lib/utils/utils';
	import { ScrollText } from '@lucide/svelte';

	type Props = ClassProp & {
		item: ItemData;
	};

	const { item, ...props }: Props = $props();
	const uid = $props.id();

	let selectedPublication: Publication | undefined = $state();
	function openPublication(publication: Publication) {
		selectedPublication = publication;
	}
</script>

{#if item.publications && item.publications.length > 0}
	<div>
		<!-- Publication Dialog -->
		<Dialog bind:publication={selectedPublication} dialogId={`dialog-${uid}`} />

		<!-- Publications List -->
		<BaseCollapse {...props} label="Publications">
			{#each item.publications as publication}
				{#snippet Content()}
					<div class="flex flex-col">
						<BaseText text={publication.type} class="font-semibold" />
						<TextButton text={{ text: publication.title, class: 'underline decoration-current/40' }} onclick={() => openPublication(publication)} props={{ command: 'show-modal', commandfor: `dialog-${uid}` }} class="text-start text-current/70" />
					</div>
				{/snippet}
				<IconText icon={{ icon: ScrollText, class: 'size-5 min-w-5' }} text={{ text: Content }} position="iconFirst" class="" />
			{/each}
		</BaseCollapse>
	</div>
{/if}
