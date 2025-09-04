<script lang="ts">
	import type { Snippet } from 'svelte';

	export type ThemeMode = 'auto' | 'light' | 'dark';

	let { children, mode = $bindable(), activeMode, uid }: { children: Snippet; mode: ThemeMode; activeMode: ThemeMode; uid: string } = $props();
</script>

<!--
<div class="relative rounded-full p-1.5 *:size-7 has-checked:bg-white has-checked:ring has-checked:inset-ring has-checked:ring-gray-950/10 has-checked:inset-ring-white/10 sm:p-0 dark:has-checked:bg-gray-600 dark:has-checked:text-white dark:has-checked:ring-transparent">
	<input type="radio" class="absolute inset-0 cursor-pointer appearance-none" name={`theme-toggle-${uid}`} aria-label="System theme" value="system" onchange={() => (mode = activeMode)} checked={mode === activeMode} />
	{@render children()}
</div>
-->

<label
	aria-label="Existing customers"
	class="group
		relative
		m-2
		flex
		size-10
		cursor-pointer
		rounded-lg
		bg-white
		p-1
		has-checked:outline-2
		has-checked:-outline-offset-2
		has-checked:outline-gray-300
		has-focus-visible:outline-3
		has-focus-visible:-outline-offset-1
		has-disabled:border-gray-400
		has-disabled:bg-gray-200
		has-disabled:opacity-25
		dark:border-white/10
		dark:bg-gray-800/50
		dark:has-checked:bg-primary-500/10
		dark:has-checked:outline-primary-500
		dark:has-disabled:border-white/10
		dark:has-disabled:bg-gray-800"
>
	<input type="radio" name={uid} value="existing-customers" class="absolute inset-0 cursor-pointer appearance-none focus:outline-none" onchange={() => (mode = activeMode)} checked={mode === activeMode} />
	{@render children()}
</label>
