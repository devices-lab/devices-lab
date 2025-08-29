<script lang="ts">
	import type { ClassValue } from "svelte/elements";

	const { label, class: className = '', ...rest }: { label: string; class?: ClassValue; [key: string]: any } = $props();
</script>

<span class="inline-flex items-center gap-x-1.5 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-400/10 dark:text-gray-400">
	{label}
</span>