<script lang="ts">
	import BaseCard from '$lib/components/BaseCard.svelte';
	import DynamicList from '$lib/components/DynamicList.svelte';
	import TextField from '$lib/components/inputs/TextField.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import BaseCheckbox from '$lib/components/interactive/BaseCheckbox.svelte';
	import type { Tag } from '$lib/data/data';
	import type { Entry } from '$lib/data/indexer';
	import ItemCard from '$lib/items/ItemCard.svelte';

	type Props = {
		entry: Entry;
		showFeedback?: boolean;
	};

	let { entry = $bindable(), showFeedback = false }: Props = $props();

	const validate = (value: string) => {
		if (!value && showFeedback) return false;
		return true;
	};
</script>

<div class="divide-y divide-gray-900/10 text-gray-800 dark:divide-white/10 dark:text-gray-100">
	<div class="py-10">
		<div class="my-4 flex-1 font-semibold text-gray-600 dark:text-gray-300">Preview:</div>

		<div class="mx-auto mt-6 max-w-80">
			<ItemCard {entry} />
		</div>
	</div>

	<div class="py-10">
		<BaseCard class="flex flex-col gap-y-2 px-4 py-6 sm:p-8">
			<TextInput bind:value={entry.item.name} label="Name" sublabel="Name of the item" class="flex-1" {validate} />
			<TextInput bind:value={entry.item.pathName} label="Path Name" sublabel="Name for the device / tool / media item that will be shown in paths" class="flex-1" {validate} />

			<TextField bind:value={entry.item.teaser} label="Teaser" sublabel="A very short teaser about the device / tool / media item" {validate} />

			<DynamicList bind:items={entry.item.tags} newItem={(): Tag => ({ name: '' })} title="Tags">
				{#snippet content(item: Tag)}
					<TextInput bind:value={item.name} label="" class="" inputProps={{ placeholder: 'tag' }} {validate} />
				{/snippet}
			</DynamicList>

			<BaseCheckbox bind:checked={entry.item.featured} label="Featured?" class="mt-6" />
		</BaseCard>
	</div>
</div>
