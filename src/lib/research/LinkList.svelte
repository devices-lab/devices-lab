<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import IconLink from '$lib/components/icons/IconLink.svelte';
	import type { DefProps, Link } from '$lib/utils/utils';

	type Props = DefProps & {
		links: Link[];
	};

	const { links, ...props }: Props = $props();
</script>

{#if links.length}
	<ClassBox {props} tag="ul" class="flex flex-wrap items-center justify-start gap-2 sm:gap-3" role="">
		{#each links as link}
			<li role="">
				<IconLink
					link={link.href}
					icon={{ icon: link.icon, class: 'size-5', fallback: 'Test' }}
					text={{ text: link.text }}
					class="
						button-sky
						group/link
						rounded-full
						px-2.5
						py-1!
						text-sm/6
						duration-150
						hover:-translate-y-0.5"
					aria-label={link.text}
				/>
			</li>
		{/each}
	</ClassBox>
{/if}
