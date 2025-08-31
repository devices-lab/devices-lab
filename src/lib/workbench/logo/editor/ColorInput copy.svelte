<script lang="ts">
	import ColorField from '$lib/workbench/logo/editor/ColorField.svelte';
	import Reset from './Reset.svelte';

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
		border: {
			get: () => string;
			set: (value: string) => void;
		};
		defaultForeground: string;
		defaultBackground: string;
		defaultBorder: string;
	}

	const { input }: { input: ColorInput } = $props();
</script>

<div class="flex justify-between gap-x-3">
	<div class="flex grow flex-col gap-3 sm:flex-row">
		<ColorField bind:color={() => input.foreground.get(), (v) => input.foreground.set(v)} label="Foreground" />
		<ColorField bind:color={() => input.background.get(), (v) => input.background.set(v)} label="Background" />
		<ColorField bind:color={() => input.border.get(), (v) => input.border.set(v)} label="Border" />
	</div>

	<Reset
		onclick={() => {
			input.foreground.set(input.defaultForeground);
			input.background.set(input.defaultBackground);
			input.border.set(input.defaultBorder);
		}}
	/>
</div>

