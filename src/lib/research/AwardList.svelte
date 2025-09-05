<script lang="ts">
	import type { Award } from '$lib/data/research';
	import type { DefProps } from '$lib/utils';
	import { AwardIcon } from '@lucide/svelte';

	type Props = DefProps & {
		awards: Award[];
	};

	const { awards, ...props }: Props = $props();
</script>

{#if awards.length}
	<div {...props} class="flex flex-wrap items-start gap-2 {props.class}">
		{#each awards as award}
			<div class="flex items-center rounded-xl bg-white p-1 ps-2 pe-3 text-sm text-yellow-500 shadow-xs outline outline-gray-200 dark:bg-gray-900 dark:text-yellow-600 dark:outline-gray-700">
				<AwardIcon class="size-5 grow-0" />
				<span class="flex-1 font-semibold text-nowrapp">{award.name}</span>
			</div>
		{/each}
	</div>
{/if}
