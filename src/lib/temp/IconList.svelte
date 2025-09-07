<script lang="ts">
	import type { Icon } from '@lucide/svelte';
	import * as icons from '@lucide/svelte';

	const names = Object.keys(icons).filter((name) => name.endsWith('Icon') && name !== 'default');
</script>

<div class="flex flex-wrap gap-4">
	{#each names as name}
		{@const icon: {icon: typeof Icon} = {icon: (icons as any)[name] as typeof Icon}}
		<icon.icon class="size-6" />
	{/each}
</div>
