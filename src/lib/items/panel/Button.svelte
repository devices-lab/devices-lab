<script lang="ts">
	import type { ClassValue } from 'svelte/elements';
	import { ChevronRight } from '@lucide/svelte';

	const { href, label, class: className = '' }: { href: string; label: string; class?: ClassValue } = $props();
</script>

<a
	{href}
	class="group
		inline-flex
		items-center
		gap-x-2.5
		rounded-full
		bg-indigo-200
		px-4
		py-2
		font-semibold
		text-indigo-600
		transition-all
		duration-300
		hover:bg-indigo-600
		hover:text-white
		focus-visible:outline-2
		focus-visible:outline-offset-2
		focus-visible:outline-indigo-600
		dark:text-indigo-400
		dark:hover:bg-indigo-400
		dark:hover:text-indigo-900
		dark:focus-visible:outline-indigo-500
		{className}"
>
	{label}
	<ChevronRight class="size-7 transition-all duration-300 group-hover:translate-x-1"/>
</a>
