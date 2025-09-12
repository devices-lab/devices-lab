<script lang="ts">
	import type { ItemData } from '$lib/data/indexer';
	import BaseCollapse from '$lib/items/page/content/BaseCollapse.svelte';
	import type { ClassProp } from '$lib/utils/utils';
	import SVG_Stack from '$lib/workbench/logo/SVG_Stack.svelte';
	import SVG_StackPill from '$lib/workbench/logo/SVG_StackPill.svelte';
	import { ProjectProps, VersionProps } from '$lib/workbench/logo/utils';

	type Props = ClassProp & {
		item: ItemData;
	};

	const { item, ...props }: Props = $props();
</script>

{#if item.projectID || item.projectName || item.projectVersion}
	<BaseCollapse {...props} label="Project Identifiers">
		<div class="flex flex-wrap items-center justify-center gap-5">
			{#if item.projectID && item.projectVersion}
				<div class="self-justify-center max-w-fit fill-white opacity-80 *:max-h-15 dark:fill-gray-300">
					<SVG_StackPill uid={'dl-version-stack'} {...VersionProps(item.projectID, item.projectVersion)} />
				</div>
			{/if}
			{#if item.projectName}
				<div class="self-justify-center max-w-fit fill-white opacity-80 *:max-h-15 dark:fill-gray-300">
					<SVG_Stack uid={'dl-project'} {...ProjectProps(item.projectName)} />
				</div>
			{/if}
		</div>
	</BaseCollapse>
{/if}
