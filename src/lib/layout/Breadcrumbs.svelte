<script lang="ts">
	import { page } from '$app/state';
	import ClassBox from '$lib/components/ClassBox.svelte';
	import IconLink from '$lib/components/icons/IconLink.svelte';
	import { Routes } from '$lib/data/routes';
	import type { DefProps } from '$lib/utils/utils';
	import { ChevronRight, House } from '@lucide/svelte';

	type Props = DefProps;

	const props: Props = $props();
	const breadcrumbs = $derived(page.data.breadcrumbs || []);

	const style = 'flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 aria-[current]:text-gray-900 dark:aria-[current]:text-white';
</script>

{#if breadcrumbs.length > 0}
	<nav aria-label="Breadcrumb">
		<ClassBox {props} tag="ol" role="list" class="my-6 flex flex-wrap items-center gap-x-1 px-4 py-2 sm:gap-x-3">
			<IconLink link={Routes.home.id} icon={{ icon: House, class: 'size-5' }} class={style} />
			{#each breadcrumbs as crumb, i}
				{@const current = i === breadcrumbs.length - 1 ? 'page' : undefined}
				<ChevronRight class="size-5 shrink-0 text-gray-300 dark:text-gray-600" aria-hidden="true" />
				{#key crumb}
					<IconLink link={crumb.href} text={crumb.title} class={style} aria-current={current} />
				{/key}
			{/each}
		</ClassBox>
	</nav>
{/if}
