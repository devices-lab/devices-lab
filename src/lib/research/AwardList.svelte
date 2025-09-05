<script lang="ts">
	import Batch from '$lib/components/batches/Batch.svelte';
	import IconText from '$lib/components/icons/IconText.svelte';
	import type { Award } from '$lib/data/research';
	import type { DefProps } from '$lib/utils';
	
	

	type Props = DefProps & {
		awards: Award[];
	};

	const { awards, ...props }: Props = $props();
</script>

{#if awards.length}
	<div {...props} class="flex flex-wrap items-start gap-2 {props.class}">
		{#each awards as award}
			<Batch class="text-yellow-500! dark:text-yellow-400!">
				<IconText icon={award.icon} text={award.name} iconClass="" textClass="uppercase font-semibold" />
			</Batch>
		{/each}
	</div>
{/if}
