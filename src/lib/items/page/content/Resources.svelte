<script lang="ts">
	import BaseText from '$lib/components/base/BaseText.svelte';
	import IconText from '$lib/components/base/IconText.svelte';
	import TextLink from '$lib/components/base/TextLink.svelte';
	import BaseList from '$lib/components/BaseList.svelte';
	import ClassBox from '$lib/components/ClassBox.svelte';
	import Collapse from '$lib/components/Collapse.svelte';
	import type { ItemData } from '$lib/data/indexer';
	import type { DefProps } from '$lib/utils/utils';

	type Props = DefProps & {
		item: ItemData;
	};

	const { item, ...props }: Props = $props();
</script>

{#if item.resources && item.resources.length > 0}
	<ClassBox {props}>
		<Collapse label={'Resources'}>
			<BaseList bare class="flex flex-col items-start gap-y-3">
				{#each item.resources as resource}
					{#snippet Content()}
						<div class="flex flex-col">
							<BaseText text={resource.text} class="font-semibold" />
							<TextLink text={{ text: resource.href, class: 'text-sm link-blue underline break-all' }} href={resource.href} />
						</div>
					{/snippet}
					<IconText icon={{ icon: resource.icon, class: 'size-6' }} text={{ text: Content }} position="iconFirst" />
				{/each}
			</BaseList>
		</Collapse>
	</ClassBox>
{/if}
