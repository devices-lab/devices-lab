<script lang="ts">
	import IconLink from '$lib/components/icons/IconLink.svelte';
	import type { Link } from '$lib/data/research';
	import { type DefProps } from '$lib/utils';

	type Props = DefProps & {
		links: Link[];
	};

	const { links, ...props }: Props = $props();
</script>

{#if links.length}
	<ul {...props} class="flex flex-wrap items-center justify-start gap-2 sm:gap-3 {props.class}" role="">
		{#each links as link}
			<li role="">
				<IconLink
					{...link}
					class="
						btn button-sky
						group/link
						rounded-full
						px-2.5
						py-1.5!
						text-sm/6
						duration-150
						hover:-translate-y-0.5
						focus-visible:outline-2
						focus-visible:outline-offset-2
						focus-visible:outline-primary-600"
					aria-label={link.text}
					target="_blank"
					rel="noopener noreferrer"
				/>
			</li>
		{/each}
	</ul>
{/if}
