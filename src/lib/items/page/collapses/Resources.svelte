<script lang="ts">
	import BaseList from '$lib/components/BaseList.svelte';
	import ClassBox from '$lib/components/ClassBox.svelte';
	import Collapse from '$lib/components/Collapse.svelte';
	import IconSublink from '$lib/components/icons/IconSublink.svelte';
	import type { ItemType } from '$lib/data/item';
	import type { DefProps } from '$lib/utils/utils';

	type Props = DefProps & {
		item: ItemType;
	};

	const { item, ...props }: Props = $props();
</script>

<ClassBox {props}>
	{#if item.resources && item.resources.length > 0}
		<Collapse label={'Resources'}>
			<BaseList bare class="flex flex-col items-start gap-y-3">
				{#each item.resources as resource}
					<IconSublink link={resource} icon={resource.icon} text={{ text: resource.text, class: 'font-semibold' }} subtext={{ text: resource.href, class: 'text-sm link-blue underline' }} />
				{/each}
			</BaseList>
		</Collapse>
	{/if}
</ClassBox>