<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import BadgeLight from '$lib/components/badges/BadgeLight.svelte';
	import IconText from '$lib/components/base/IconText.svelte';
	import type { Award } from '$lib/data/data';
	import type { ClassProp } from '$lib/utils/utils';

	type Props = ClassProp & {
		awards: Award[];
	};

	const { awards, ...props }: Props = $props();
</script>

{#if awards.length}
	<ClassBox {props} class="flex flex-wrap items-start gap-2">
		{#each awards as award}
			<BadgeLight class="text-yellow-500! dark:text-yellow-400!">
				<IconText icon={{ icon: award.icon, class: 'size-5' }} text={{ text: award.name, class: 'uppercase text-xs font-semibold' }} position="iconFirst" />
			</BadgeLight>
		{/each}
	</ClassBox>
{/if}
