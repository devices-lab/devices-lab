<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import Batch from '$lib/components/batches/Batch.svelte';
	import IconText from '$lib/components/base/IconText.svelte';
	import type { Award } from '$lib/data/data';
	import type { DefProps } from '$lib/utils/utils';

	type Props = DefProps & {
		awards: Award[];
	};

	const { awards, ...props }: Props = $props();
</script>

{#if awards.length}
	<ClassBox {props} class="flex flex-wrap items-start gap-2">
		{#each awards as award}
			<Batch class="text-yellow-500! dark:text-yellow-400!">
				<IconText icon={{ icon: award.icon }} text={{ text: award.name, class: 'uppercase font-semibold' }} />
			</Batch>
		{/each}
	</ClassBox>
{/if}
