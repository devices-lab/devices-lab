<script lang="ts">
	import { RotateCcw } from '@lucide/svelte';

	export interface NumberInput {
		label: string;
		value: {
			get: () => number;
			set: (value: number) => void;
		};
		defaultValue: number;
		min: number;
		max: number;
		step: number;
	}

	const { input }: { input: NumberInput } = $props();
	const uid = $props.id();
</script>

<div>
	<label for={`input-${uid}`} class="block text-sm/6 font-medium text-gray-900 dark:text-white">
		{input.label}
		<span class="text-gray-500 dark:text-gray-400"> (default: {input.defaultValue})</span>
	</label>
	<div class="mb-2 flex gap-2">
		<input
			id={`input-${uid}`}
			type="number"
			name="value"
			bind:value={() => input.value.get(), (v) => input.value.set(v)}
			placeholder={input.defaultValue.toString()}
			aria-describedby={`input-${uid}-description`}
			class="block
				w-1/3
				rounded-md
				bg-white
				px-3
				py-1.5
				text-base
				text-gray-900
				outline-1
				-outline-offset-1
				outline-gray-300
				placeholder:text-gray-400
				focus:outline-2
				focus:-outline-offset-2
				focus:outline-primary-600
				sm:text-sm/6
				dark:bg-white/5
				dark:text-white
				dark:outline-white/10
				dark:placeholder:text-gray-500
				dark:focus:outline-primary-500"
			min={input.min}
			max={input.max}
			step={input.step}
		/>

		<input
			id={`input-${uid}-range`}
			type="range"
			name="value"
			bind:value={() => input.value.get(), (v) => input.value.set(v)}
			aria-describedby={`input-${uid}-description`}
			class="block
				w-full
				rounded-md
				bg-white
				px-3
				py-1.5
				text-base
				text-gray-900
				placeholder:text-gray-400
				sm:text-sm/6
				dark:bg-white/5
				dark:text-white
				dark:placeholder:text-gray-500"
			min={input.min}
			max={input.max}
			step={input.step}
		/>

		<button
			type="button"
			onclick={() => input.value.set(input.defaultValue)}
			class="cursor-pointer
				rounded-md
				px-3
				py-1.5
				text-sm
				font-medium
				text-gray-700
				transition
				duration-300
				hover:-rotate-45
				focus:outline-2
				focus:outline-none
				dark:bg-gray-700
				dark:text-gray-300
				dark:hover:bg-gray-600"
		>
			<RotateCcw />
		</button>
	</div>
</div>
