<script lang="ts">
	import { RotateCcw } from '@lucide/svelte';

	const { onclick, class: className = '' }: { onclick: () => void, class?: string } = $props();
</script>

<button
	type="button"
	{onclick}
	class="cursor-pointer
		rounded-md
		px-0
		py-0
		text-sm
		font-medium
		text-gray-400
		transition
		duration-300
		hover:-rotate-45
		hover:text-gray-600
		focus:outline-2
		focus:outline-none
		dark:text-gray-300
		dark:hover:text-gray-500 
		{className}"
>
	<RotateCcw class="size-5" />
</button>
