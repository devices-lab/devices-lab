<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import Collapse from '$lib/components/Collapse.svelte';
	import type { ItemData } from '$lib/data/indexer';
	import type { DefProps } from '$lib/utils/utils';
	import SVG_Stack from '$lib/workbench/logo/SVG_Stack.svelte';
	import SVG_StackPill from '$lib/workbench/logo/SVG_StackPill.svelte';
	import { ProjectProps, VersionProps } from '$lib/workbench/logo/utils';

	type Props = DefProps & {
		item: ItemData;
	};

	const { item, ...props }: Props = $props();
</script>

{#if item.projectID || item.projectName || item.projectVersion}
	<ClassBox {props}>
		<Collapse label={'Identifiers'}>
			<div class="flex justify-center gap-3">
				{#if item.projectID && item.projectVersion}
					<div class="max-w-fit fill-white opacity-80 *:max-h-15 dark:fill-gray-300">
						<SVG_StackPill uid={'dl-version-stack'} {...VersionProps(item.projectID, item.projectVersion)} />
					</div>
				{/if}
				{#if item.projectName}
					<div class="max-w-fit fill-white opacity-80 *:max-h-15 dark:fill-gray-300">
						<SVG_Stack uid={'dl-project'} {...ProjectProps(item.projectName)} />
					</div>
				{/if}
			</div>
		</Collapse>
	</ClassBox>
{/if}
