<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	const { title, children, class: className, current = false }: { title: string; children: Snippet; class?: ClassValue; current?: boolean } = $props();

	const uid = $props.id();
	const popoverID = `popover-${uid}`;
</script>

<div class="group/popover flex">
	<div class="relative flex">
		<button
			aria-current={current ? 'page' : undefined}
			popovertarget={popoverID}
			class={`
				relative
				flex
				cursor-pointer
				items-center
				justify-center
				px-4
				py-2
				text-sm font-medium
				transition-colors
				duration-200
				ease-out
				group-not-has-open/popover:text-gray-700
				group-has-open/popover:text-indigo-600
				group-not-has-open/popover:hover:not-aria-[current]:text-gray-400
				aria-[current]:bg-gray-200/50
				dark:group-not-has-open/popover:text-gray-300
				dark:group-has-open/popover:text-indigo-300
				dark:group-not-has-open/popover:hover:not-aria-[current]:text-gray-400 
				dark:aria-[current]:bg-gray-600/50
				${className}
			`}
		>
			{title}
			<span aria-hidden="true" class="absolute inset-x-0 -bottom-px z-30 h-0.5 bg-transparent duration-200 ease-in group-has-open/popover:bg-indigo-600 group-has-open/popover-group:duration-150 group-has-open/popover-group:ease-out"></span>
		</button>
	</div>

	<!-- Popover content -->
	<el-popover id={popoverID} anchor="bottom" popover="auto" class="w-full overflow-visible bg-white text-sm text-gray-500 transition transition-discrete [--anchor-gap:1px] backdrop:bg-transparent open:block data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in dark:bg-gray-800">
		{@render children()}
	</el-popover>
</div>



