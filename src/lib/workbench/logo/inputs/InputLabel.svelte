<script lang="ts">
	import type { Icon } from '@lucide/svelte';
	import type { ClassValue } from 'svelte/elements';

	export type Label =
		| string
		| {
				label: string;
				pre?: typeof Icon;
				preClass?: ClassValue;
				post?: typeof Icon;
				postClass?: ClassValue;
		  };

	const { label, initial }: { label: Label; initial: string | number } = $props();
</script>

<span class="flex items-center text-sm/6 font-medium text-gray-900 dark:text-gray-200">
	<span class="mr-1 flex items-center">
		{#if typeof label === 'string'}
			{label}
		{:else}
			{#if label.pre}
				<label.pre class={label.preClass ?? 'mr-1 size-4'} />
			{/if}
			{label.label}
			{#if label.post}
				<label.post class={label.postClass ?? 'ml-1 size-4'} />
			{/if}
		{/if}
	</span>
	<span class="font-normal text-gray-500 italic dark:text-gray-400"> (reset: {initial})</span>
</span>
