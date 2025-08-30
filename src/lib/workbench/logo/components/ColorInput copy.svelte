<script lang="ts">
	import { RotateCcw } from '@lucide/svelte';

	export interface ColorInput {
		label: string;
		foreground: {
			get: () => string;
			set: (value: string) => void;
		};
		background: {
			get: () => string;
			set: (value: string) => void;
		};
		defaultForeground: string;
		defaultBackground: string;
	}

	const { input }: { input: ColorInput } = $props();
	const uid = $props.id();


	let backgroundEnabled = $state(false);
</script>

<div>
	<label for={`input-${uid}-foreground`} class="block text-sm/6 font-medium text-gray-900 dark:text-white">
		{input.label}
	</label>
	<div class="mb-2 flex gap-2">
		<input
			id={`input-${uid}-foreground`}
			type="color"
			name="foreground"
			bind:value={() => input.foreground.get(), (v) => input.foreground.set(v)}
			placeholder={input.defaultForeground.toString()}
			aria-describedby={`input-${uid}-description`}
			class="block
				w-full
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
		/>

		<div class="mx-auto my-auto me-1 flex shrink-0">
					<div class="group grid size-4 grid-cols-1">
						<input id="comments" type="checkbox" name="comments" bind:checked={backgroundEnabled} aria-describedby="comments-description" class="font-ocr col-start-1 row-start-1 cursor-pointer appearance-none rounded-sm border border-gray-300 bg-white checked:border-primary-600 checked:bg-primary-600 indeterminate:border-primary-600 indeterminate:bg-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 dark:border-white/10 dark:bg-white/5 dark:checked:border-primary-500 dark:checked:bg-primary-500 dark:indeterminate:border-primary-500 dark:indeterminate:bg-primary-500 dark:focus-visible:outline-primary-500 dark:disabled:border-white/5 dark:disabled:bg-white/10 dark:disabled:checked:bg-white/10 forced-colors:appearance-auto" />
						<svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25 dark:group-has-disabled:stroke-white/25">
							<path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
							<path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
						</svg>
					</div>
				</div>

		<input
			id={`input-${uid}-background`}
			type="color"
			name="background"
			bind:value={() => input.background.get(), (v) => input.background.set(v)}
			aria-describedby={`input-${uid}-description`}
			class="block
				w-full
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
		/>

		<button
			type="button"
			onclick={() => {
				input.foreground.set(input.defaultForeground);
				input.background.set(input.defaultBackground);
			}}
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
