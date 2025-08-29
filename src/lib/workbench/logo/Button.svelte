<script lang="ts">
	const props = $props();
</script>

<!--
<button
	type="button"
	class="
		inline-flex
		items-center
		gap-x-1.5
		rounded-full
		bg-gray-50
		px-3
		py-2
		text-sm
		font-semibold
		shadow-sm
		text-gray-900
		inset-ring
		inset-ring-gray-200
		not-disabled:cursor-pointer
		not-disabled:hover:bg-gray-100
		disabled:opacity-50
		dark:bg-gray-800
		dark:text-white
		dark:inset-ring-gray-600
		dark:hover:bg-white/20
		dark:not-disabled:hover:bg-gray-700
		"
>
	{@render props.children?.()}
</button>
-->

<button
	type="button"
	class={`
			relative
			inline-flex
			cursor-pointer
			items-center
			bg-white
			px-4
			py-2
			text-sm
			font-semibold
			text-gray-900
			inset-ring-1
			inset-ring-gray-200
			hover:bg-gray-50
			focus:z-10
			dark:bg-white/10
			dark:text-white
			dark:inset-ring-gray-700
			dark:hover:bg-white/20
		`}
	{...props}
>
	{@render props.children?.()}
</button>
