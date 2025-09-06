<script lang="ts">
	import TextField from '$lib/components/inputs/TextField.svelte';
	import type { Date } from '$lib/data/research';
	import { clamp, type DefProps } from '$lib/utils';
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	type Props = DefProps & {
		value: Date;
		label: string;
		input?: HTMLTextareaAttributes;
	};

	let { value = $bindable(), label, ...props }: Props = $props();

	// Normalize the input values
	function normalizeNumber(input: string, length: number, pad: number, min: number, max: number): string {
		// strip leading zeros but keep a single zero if the input was all zeros
		const hadChars = input.length > 0;
		let s = input.replace(/^0+/, '');
		if (hadChars && s.length === 0) s = '0';

		// hard cap length before parsing
		if (length > 0 && s.length > length) s = s.slice(0, length);

		// parse and clamp
		const n = Number.parseInt(s, 10);
		if (Number.isNaN(n)) return '';
		s = String(Math.min(Math.max(n, min), max));

		// left-pad (except for literal "0")
		if (s !== '0' && s.length < pad) s = s.padStart(pad, '0');

		// if result is exactly `length` zeros, return empty
		if (length > 0 && s.length === length && !/[1-9]/.test(s)) return '';

		return s;
	}

	// Convert the input values into a number
	const parseInput = (val: string, min: number, max: number, chars: number): number => {
		// Parse the input
		let num = parseInt(val);
		if (isNaN(num) || num === 0) return NaN;
		// Clamp the parsed value
		return clamp(num, min, max);
	};

	let year: string = $derived(normalizeNumber(value.year.toString(), 4, 0, 0, 9999));
	let month: string = $derived(normalizeNumber(value.month.toString(), 2, 2, 0, 12));
	let day: string = $derived(normalizeNumber(value.day.toString(), 2, 2, 0, 31));

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
		<TextField bind:value={year} label="Publication year" {...props} post={labelYear} class="w-full flex-1" />
		<TextField bind:value={month} label="Publication month" {...props} post={labelMonth} class="w-full flex-1" />
		<TextField bind:value={day} label="Publication day" {...props} post={labelDay} class="w-full flex-1" />
	</div>
</div>
