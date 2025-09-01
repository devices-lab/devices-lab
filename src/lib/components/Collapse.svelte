<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	export interface CollapseItem {
		label: string;
		children: Snippet;
		class?: ClassValue;
		buttonClass?: ClassValue;
		[key: string]: any;
	}

	const { label, children, class: className = '', buttonClass = '', ...restProps }: CollapseItem = $props();
	const uid = $props.id();
</script>

<div>
	<h3>
		<button type="button" command="--toggle" commandfor={uid} class="group relative flex w-full items-center justify-between py-6 text-left {buttonClass}">
			<span class="text-sm font-medium not-in-aria-expanded:text-gray-900 in-aria-expanded:text-primary-600 dark:not-in-aria-expanded:text-gray-300 dark:in-aria-expanded:text-primary-400 {className}">{label}</span>
			<span class="ml-6 flex cursor-pointer items-center">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 text-gray-400 group-hover:text-gray-500 in-aria-expanded:hidden">
					<path d="M12 4.5v15m7.5-7.5h-15" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 text-primary-400 not-in-aria-expanded:hidden group-hover:text-primary-500">
					<path d="M5 12h14" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</span>
		</button>
	</h3>
	<el-disclosure id={uid} class="contents" {...restProps}>
		{@render children()}
	</el-disclosure>
</div>
