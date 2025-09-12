<script lang="ts">
	import { ChevronDown } from '@lucide/svelte';
	import type { Snippet } from 'svelte';

	const { label: labelText, children }: { label: string; children: Snippet } = $props();
	const uid = $props.id();
</script>

<div class="rounded-lg px-0">
	<button type="button" command="--toggle" commandfor={uid} class="group relative mb-2 flex cursor-pointer items-center justify-between text-left">
		<span class="flex w-full items-center border-b-0 border-gray-200 font-semibold not-in-aria-expanded:text-gray-900 in-aria-expanded:text-primary-500 dark:border-gray-700 dark:not-in-aria-expanded:text-gray-300 dark:in-aria-expanded:text-primary-400">
			{labelText}
			<ChevronDown class="ml-2 size-4 transition duration-300 not-in-aria-expanded:-rotate-180" />
		</span>
	</button>

	<el-disclosure id={uid}>
		{@render children()}
	</el-disclosure>
</div>
