<script lang="ts">
	import type { Snippet } from "svelte";
	import type { ClassValue } from "svelte/elements";

	let { checked = $bindable(), children, class: className = '' }: { checked: boolean; children?: Snippet; class?: ClassValue } = $props();
	const uid = $props.id();
</script>

<div class="flex items-center gap-2 {className}">
	<div class="group grid size-4 grid-cols-1 ">
		<input
			id={uid}
			type="checkbox"
			bind:checked
			class="
			col-start-1
			row-start-1
			cursor-pointer
			appearance-none
			rounded-sm
			border
			border-gray-300
			bg-white
			font-ocr
			checked:border-primary-600
			checked:bg-primary-600
			indeterminate:border-primary-600
			indeterminate:bg-primary-600
			focus-visible:outline-2
			focus-visible:outline-offset-2
			focus-visible:outline-primary-600
			disabled:border-gray-300
			disabled:bg-gray-100
			disabled:checked:bg-gray-100
			dark:border-white/10
			dark:bg-white/5
			dark:checked:border-primary-500
			dark:checked:bg-primary-500
			dark:indeterminate:border-primary-500
			dark:indeterminate:bg-primary-500
			dark:focus-visible:outline-primary-500
			dark:disabled:border-white/5
			dark:disabled:bg-white/10
			dark:disabled:checked:bg-white/10
			forced-colors:appearance-auto"
		/>
		<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25 dark:group-has-disabled:stroke-white/25">
			<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
			<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
		</svg>
	</div>

	<label for={uid} class="cursor-pointer">
		{@render children?.()}
	</label>
</div>
