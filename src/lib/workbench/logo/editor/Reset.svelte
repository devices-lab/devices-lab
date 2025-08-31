<script lang="ts">
	import { RotateCcw } from '@lucide/svelte';

	const { onclick }: { onclick: () => void } = $props();
</script>

<button
	type="button"
	{onclick}
	class="cursor-pointer
		rounded-md
		px-3
		py-1.5
		text-sm
		font-medium
		text-gray-700
		transition
		duration-300
		hover:-rotate-45
		hover:text-gray-400
		focus:outline-2
		focus:outline-none
		dark:text-gray-300
		dark:hover:text-gray-500"
>
	<RotateCcw />
</button>
