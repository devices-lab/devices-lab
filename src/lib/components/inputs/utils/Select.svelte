<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import type { DefProps } from '$lib/utils';
	import { Check, ChevronsUpDown } from '@lucide/svelte';
	import { onMount } from 'svelte';
	

	type Props = DefProps & {
		value: string;
		items: { value: string; label: string }[];
	};

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

{#snippet SelectItem(label: string, sublabel: string, value: string)}
	{@const optionProps = value === '' ? { disabled: true } : {}}
	<el-option {value} {...optionProps} class="group/option disabled relative block  cursor-default py-2 pr-9 pl-3 {value? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-400'} select-none focus:bg-primary-600 focus:text-white focus:outline-hidden disabled:text-red-300  dark:focus:bg-primary-500">
		<div class="flex">
			<span class="truncate font-normal group-aria-selected/option:font-semibold">{label}</span>
			{#if sublabel}
				<span class="ml-2 truncate text-gray-500 group-focus/option:text-primary-200 dark:text-gray-400 dark:group-focus/option:text-primary-100">[{sublabel}]</span>
			{/if}
		</div>
		<span class="absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600 group-not-aria-selected/option:hidden group-focus/option:text-white in-[el-selectedcontent]:hidden dark:text-primary-400">
			<Check class="size-5"/>
		</span>
	</el-option>
{/snippet}

<el-select {value} class="" bind:this={selectBox}>
	<ClassBox {props} tag="button" type="button" class="flex items-center justify-between w-full">
		<el-selectedcontent class="col-start-1 row-start-1 truncate pr-6">{items[0]?.label || ''}</el-selectedcontent>
		<ChevronsUpDown class="size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"/>
	</ClassBox>

	<el-options anchor="bottom start" popover="auto" class="max-h-60 w-(--button-width) overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline-1 outline-black/5 [--anchor-gap:--spacing(1)] data-leave:transition data-leave:transition-discrete data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
		{#each items as { value, label }}
			{@render SelectItem(label, value, value)}
		{/each}
	</el-options>
</el-select>
