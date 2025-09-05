<script lang="ts">
	import { clamp, type DefProps } from '$lib/utils';
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	import Textarea from './Textarea.svelte';
	import type { Date } from '$lib/data/research';

	type Props = DefProps & {
		value: Date;
		label: string;
		input?: HTMLTextareaAttributes;
	};

	let { value = $bindable(), label, ...props }: Props = $props();


	const parse = (val: number): string => {
		if (isNaN(val)) return '';
		return val.toString();
	}

	const parseInput = (val: string, min: number, max: number, chars: number): number => {
		// Trim leading zeros
		val = val.replace(/^0+/, '');
		// Clamp the length of the input
		val = val.slice(0, chars);

		// Parse the input
		const parsed = parseInt(val);
		if (isNaN(parsed)) return NaN;

		// Clamp the parsed value
		return clamp(parsed, min, max);
	}

	let year: string = $derived(parse(value.year).toString());
	let month: string = $derived(parse(value.month).toString());
	let day: string = $derived(parse(value.day).toString());

	$effect(() => {
		value = { year: parseInput(year, 1, 9999, 4), month: parseInput(month, 1, 12, 2), day: parseInput(day, 1, 31, 2) };
	});
</script>

{#snippet baseLabel(label: string)}
	<span class="mx-auto text-xs font-semibold text-gray-500 dark:text-gray-400">{label}</span>
{/snippet}
{#snippet labelYear()}
	{@render baseLabel('YYYY')}
{/snippet}
{#snippet labelMonth()}
	{@render baseLabel('MM')}
{/snippet}
{#snippet labelDay()}
	{@render baseLabel('DD')}
{/snippet}

<div class=" ">
	<div class="flex flex-col items-center gap-4 sm:flex-row">
		<Textarea bind:value={year} label="Publication year" {...props} post={labelYear} class="w-full flex-1" />
		<Textarea bind:value={month} label="Publication month" {...props} post={labelMonth} class="w-full flex-1" />
		<Textarea bind:value={day} label="Publication day" {...props} post={labelDay} class="w-full flex-1" />
	</div>
</div>
