<script lang="ts">
	import Collapse from '$lib/components/Collapse.svelte';
	import type { Snippet } from 'svelte';

	const { label, children, class: className = '', ...props }: { label: string; children: Snippet; class?: string; [key: string]: any } = $props();
</script>

<Collapse {label} class="underline underline-offset-2 {className}" {...props}>
	<div class="grid grid-cols-2 gap-x-4 gap-y-2">
		{@render children?.()}
	</div>
</Collapse>
