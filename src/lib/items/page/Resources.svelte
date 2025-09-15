<script lang="ts">
	import BaseText from '$lib/components/base/BaseText.svelte';
	import IconText from '$lib/components/base/IconText.svelte';
	import TextLink from '$lib/components/base/TextLink.svelte';
	import type { ItemData } from '$lib/data/data';
	import BaseCollapse from '$lib/items/page/BaseCollapse.svelte';
	import type { ClassProp } from '$lib/utils/utils';

	type Props = ClassProp & {
		item: ItemData;
	};

	const { item, ...props }: Props = $props();
</script>

{#if item.resources && item.resources.length > 0}
	<BaseCollapse {...props} label="Relevant Links">
		{#each item.resources as resource}
			{#snippet Content()}
				<div class="flex flex-col">
					<BaseText text={resource.text} class="font-semibold" />
					<TextLink text={{ text: resource.href, class: 'underline break-all decoration-current/40 text-sm' }} href={resource.href} class="text-start text-focus" />
				</div>
			{/snippet}
			<IconText icon={{ icon: resource.icon, class: 'size-5 min-w-5' }} text={{ text: Content }} position="iconFirst" />
		{/each}
	</BaseCollapse>
{/if}
