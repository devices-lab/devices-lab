<script lang="ts">
	import type { ClassValue } from 'svelte/elements';

	const { class: className }: { class: ClassValue } = $props();
</script>

<div class="max-w-fit motion-safe:animate-[wiggle_2s_ease-in-out_infinite] {className}">
	<span class="inline-flex -rotate-45 items-center rounded-full bg-primary/80 px-2 py-1 text-xs font-semibold text-white dark:bg-yellow-100 dark:text-yellow-800">New!</span>
</div>
