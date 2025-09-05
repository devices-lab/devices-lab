<script lang="ts">
	import { onMount } from 'svelte';
	import type { HTMLSelectAttributes } from 'svelte/elements';

	interface Props extends HTMLSelectAttributes {
		value: string;
		items: { key: string; title: string }[];
	}

	let { value = $bindable(), items, ...props }: Props = $props();

	let selectBox = $state() as HTMLSelectElement;
	const handleChange = (event: Event) => {
		value = (event.target as HTMLSelectElement).value;
	};

	onMount(() => {
		selectBox.addEventListener('change', handleChange);
		return () => {
			selectBox.removeEventListener('change', handleChange);
		};
	});
</script>

<!--
<div class="mb-1 grid grid-cols-1">
	<select {...props} bind:value class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus-visible:outline-primary-500 {props.class} ">
		{#each items as { key, title }}
			<option value={key}>{title}</option>
		{/each}
	</select>
	<svg viewBox="0 0 16 16" fill="currentColor" data-slot="icon" aria-hidden="true" class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400">
		<path d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
	</svg>
</div>
-->

{#snippet SelectItem(label: string, sublabel: string, value: string)}
	{@const optionProps = (value === '' ? { disabled: true } : {})}
	<el-option {value} class="group/option disabled h-[36px] relative block cursor-default py-2 pr-9 pl-3 text-gray-900 select-none focus:bg-primary-600 focus:text-white focus:outline-hidden dark:text-white dark:focus:bg-primary-500 disabled:text-red-300">
		<div class="flex">
			<span class="truncate font-normal group-aria-selected/option:font-semibold">{label}</span>
			{#if sublabel}
				<span class="ml-2 truncate text-gray-500 group-focus/option:text-primary-200 dark:text-gray-400 dark:group-focus/option:text-primary-100">[{sublabel}]</span>
			{/if}
		</div>
		<span class="absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600 group-not-aria-selected/option:hidden group-focus/option:text-white in-[el-selectedcontent]:hidden dark:text-primary-400">
			<svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5">
				<path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
			</svg>
		</span>
	</el-option>
{/snippet}

<el-select {value} class="mt-2 block" {...props} bind:this={selectBox}>
	<button type="button" class="grid w-full cursor-default grid-cols-1 h-[42px] rounded-md bg-white py-2 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:focus-visible:outline-primary-500">
		<el-selectedcontent class="col-start-1 row-start-1 truncate pr-6">todo</el-selectedcontent>
		<svg viewBox="0 0 16 16" fill="currentColor" data-slot="icon" aria-hidden="true" class="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400">
			<path d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
		</svg>
	</button>

	<el-options anchor="bottom start" popover="auto" class="max-h-60 w-(--button-width) overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline-1 outline-black/5 [--anchor-gap:--spacing(1)] data-leave:transition data-leave:transition-discrete data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
		{#each items as { key, title }}
			{@render SelectItem(title, key, key)}
		{/each}
	</el-options>
</el-select>
