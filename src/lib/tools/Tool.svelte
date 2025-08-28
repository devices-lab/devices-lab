<script lang="ts">
	import IconLink from '$lib/tools/IconLink.svelte';
	import IconArrow from '$lib/tools/IconArrow.svelte';
	import Label from '$lib/tools/Label.svelte';

	import type { Tool } from '$lib/_data/tools';

	const { tool }: { tool: Tool } = $props();
</script>

<a href={tool.href} target="{tool.external ? '_blank' : '_self'}" class="group flex justify-between rounded-full border border-gray-200 bg-white p-4 shadow-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
	<div class="flex items-center space-x-4">
		<!-- Label -->
		<Label label={tool.label} />

		<!-- Info -->
		<div>
			<h2 class="text-sm/6 font-semibold text-gray-900 dark:text-white">{tool.name}</h2>
			<p class="text-xs/5 font-normal text-gray-700 dark:text-gray-400">{tool.description}</p>
		</div>
	</div>

	<!-- Icon -->
	<div class="ms-autof mr-3 transition-all group-hover:mr-2 my-auto">
		{#if tool.external}
			<IconLink />
		{:else}
			<IconArrow />
		{/if}
	</div>
</a>
